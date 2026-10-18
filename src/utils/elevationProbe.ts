import elevationGridData from '../data/astu_elevation_grid.json';

interface GridData {
  lats: number[];
  lons: number[];
  elevations: number[];
  min_elev: number;
  max_elev: number;
  mean_elev: number;
}

const grid = elevationGridData as GridData;

/**
 * Bilinear interpolation of SRTM elevation at given latitude and longitude
 */
export function getElevationAt(lat: number, lon: number): { elevation: number; slopePercent: number } {
  const { lats, lons, elevations, min_elev, max_elev } = grid;
  const nLats = lats.length;
  const nLons = lons.length;

  // Check bounds
  const minLat = lats[0];
  const maxLat = lats[nLats - 1];
  const minLon = lons[0];
  const maxLon = lons[nLons - 1];

  if (lat < minLat || lat > maxLat || lon < minLon || lon > maxLon) {
    // Outside detailed grid: extrapolate based on regional MER gradient
    // ASTU is ~1676m sloping down towards SE
    const distToCenter = Math.hypot(lat - 8.5633, lon - 39.2904);
    const approx = 1676.0 + (lat - 8.5633) * 3500.0 - (lon - 39.2904) * 2200.0;
    return {
      elevation: Math.round(approx * 10) / 10,
      slopePercent: 2.3
    };
  }

  // Find cell index
  let i = 0;
  while (i < nLats - 1 && lats[i + 1] <= lat) {
    i++;
  }
  let j = 0;
  while (j < nLons - 1 && lons[j + 1] <= lon) {
    j++;
  }

  const lat0 = lats[i];
  const lat1 = lats[i + 1];
  const lon0 = lons[j];
  const lon1 = lons[j + 1];

  const tLat = (lat - lat0) / (lat1 - lat0 || 1);
  const tLon = (lon - lon0) / (lon1 - lon0 || 1);

  const v00 = elevations[i * nLons + j];
  const v01 = elevations[i * nLons + (j + 1)];
  const v10 = elevations[(i + 1) * nLons + j];
  const v11 = elevations[(i + 1) * nLons + (j + 1)];

  // Bilinear interpolation
  const elev = (1 - tLat) * ((1 - tLon) * v00 + tLon * v01) +
               tLat * ((1 - tLon) * v10 + tLon * v11);

  // Gradient calculation
  const dElevDlat = (v10 - v00) / ((lat1 - lat0) * 111000); // meters per meter
  const dElevDlon = (v01 - v00) / ((lon1 - lon0) * 110000);
  const slope = Math.hypot(dElevDlat, dElevDlon) * 100;

  return {
    elevation: Math.round(elev * 10) / 10,
    slopePercent: Math.round(slope * 10) / 10
  };
}

/**
 * Generate topographic elevation profile along a transect between two points
 */
export function generateTransectProfile(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
  samples: number = 30
): Array<{ distanceMeters: number; elevation: number; lat: number; lon: number }> {
  const profile = [];
  const totalDist = calculateDistanceMeters(startLat, startLon, endLat, endLon);

  for (let s = 0; s <= samples; s++) {
    const fraction = s / samples;
    const curLat = startLat + fraction * (endLat - startLat);
    const curLon = startLon + fraction * (endLon - startLon);
    const { elevation } = getElevationAt(curLat, curLon);
    profile.push({
      distanceMeters: Math.round(fraction * totalDist),
      elevation,
      lat: curLat,
      lon: curLon
    });
  }

  return profile;
}

export function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
