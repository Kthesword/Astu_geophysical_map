import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ActiveTab, BasemapType } from '../types';
import {
  boundaryData,
  buildingsData,
  roadsData,
  geologyData,
  faultsData,
  contoursData,
  stationsData,
  gravityContoursData,
  magneticContoursData,
  ASTU_LANDMARKS
} from '../data';
import { getElevationAt } from '../utils/elevationProbe';

interface LeafletMapProps {
  activeTab: ActiveTab;
  basemap: BasemapType;
  layers: {
    boundary: boolean;
    buildings: boolean;
    roads: boolean;
    landmarks: boolean;
    geology: boolean;
    faults: boolean;
    gravity: boolean;
    magnetic: boolean;
    stations: boolean;
    contours: boolean;
    demTint: boolean;
  };
  geologyOpacity: number;
  searchQuery: string;
  buildingCategory: string;
  onSelectFeature: (feature: any) => void;
  onCursorUpdate: (pos: { lat: number; lon: number; elevation: number; slope: number } | null) => void;
  transectLine: Array<[number, number]> | null;
  resetViewTrigger: number;
}

const ASTU_CENTER: [number, number] = [8.5633, 39.2904];

export const LeafletMap: React.FC<LeafletMapProps> = ({
  activeTab,
  basemap,
  layers,
  geologyOpacity,
  searchQuery,
  buildingCategory,
  onSelectFeature,
  onCursorUpdate,
  transectLine,
  resetViewTrigger
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Layer groups refs
  const baseTileRef = useRef<L.TileLayer | null>(null);
  const boundaryLayerRef = useRef<L.GeoJSON | null>(null);
  const buildingsLayerRef = useRef<L.GeoJSON | null>(null);
  const roadsLayerRef = useRef<L.GeoJSON | null>(null);
  const landmarksLayerRef = useRef<L.LayerGroup | null>(null);
  const geologyLayerRef = useRef<L.GeoJSON | null>(null);
  const faultsLayerRef = useRef<L.GeoJSON | null>(null);
  const gravityLayerRef = useRef<L.GeoJSON | null>(null);
  const magneticLayerRef = useRef<L.GeoJSON | null>(null);
  const stationsLayerRef = useRef<L.LayerGroup | null>(null);
  const contoursLayerRef = useRef<L.GeoJSON | null>(null);
  const transectLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: ASTU_CENTER,
      zoom: 15,
      minZoom: 11,
      maxZoom: 19,
      zoomControl: false
    });

    // Custom positioned zoom controls
    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    mapRef.current = map;

    // Mousemove probe
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const { elevation, slopePercent } = getElevationAt(lat, lng);
      onCursorUpdate({
        lat,
        lon: lng,
        elevation,
        slope: slopePercent
      });
    });

    map.on('mouseout', () => {
      onCursorUpdate(null);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Recenter
  useEffect(() => {
    if (mapRef.current && resetViewTrigger > 0) {
      mapRef.current.flyTo(ASTU_CENTER, 15, { duration: 1 });
    }
  }, [resetViewTrigger]);

  // Adjust View when changing tabs
  useEffect(() => {
    if (!mapRef.current) return;
    if (activeTab === 'geophysical') {
      mapRef.current.flyTo([8.560, 39.285], 13.5, { duration: 0.8 });
    } else {
      mapRef.current.flyTo(ASTU_CENTER, 15, { duration: 0.8 });
    }
  }, [activeTab]);

  // Update Basemap Tiles
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (baseTileRef.current) {
      map.removeLayer(baseTileRef.current);
    }

    let url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    let attribution = '&copy; <a href="https://carto.com/">CARTO</a>';

    if (basemap === 'osm') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>';
    } else if (basemap === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    const tile = L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
    baseTileRef.current = tile;
  }, [basemap]);

  // 1. ASTU Campus Boundary Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (boundaryLayerRef.current) {
      map.removeLayer(boundaryLayerRef.current);
      boundaryLayerRef.current = null;
    }

    if (layers.boundary) {
      const geo = L.geoJSON(boundaryData as any, {
        style: {
          color: '#1d4ed8',
          weight: 3,
          fillColor: '#3b82f6',
          fillOpacity: 0.08,
          dashArray: '5, 5'
        },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip('<b>ASTU University Perimeter</b><br>Area: 152.4 ha', {
            sticky: true,
            className: 'text-xs'
          });
        }
      }).addTo(map);
      boundaryLayerRef.current = geo;
    }
  }, [layers.boundary]);

  // 2. Roads Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (roadsLayerRef.current) {
      map.removeLayer(roadsLayerRef.current);
      roadsLayerRef.current = null;
    }

    if (layers.roads && activeTab === 'campus') {
      const geo = L.geoJSON(roadsData as any, {
        style: (feature) => {
          const hw = feature?.properties?.highway;
          const isPrimary = hw === 'primary' || hw === 'secondary';
          return {
            color: isPrimary ? '#e2e8f0' : '#94a3b8',
            weight: isPrimary ? 3 : 1.8,
            opacity: 0.85
          };
        }
      }).addTo(map);
      roadsLayerRef.current = geo;
    }
  }, [layers.roads, activeTab]);

  // 3. Buildings Layer with search & category filtering
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (buildingsLayerRef.current) {
      map.removeLayer(buildingsLayerRef.current);
      buildingsLayerRef.current = null;
    }

    if (layers.buildings && activeTab === 'campus') {
      const query = searchQuery.trim().toLowerCase();

      const geo = L.geoJSON(buildingsData as any, {
        filter: (feature) => {
          const props = feature.properties;
          const name = (props.name || '').toLowerCase();
          const type = (props.building_type || '').toLowerCase();

          // Query matching
          if (query && !name.includes(query) && !type.includes(query)) {
            return false;
          }

          // Category matching
          if (buildingCategory !== 'all') {
            if (buildingCategory === 'academic' && !name.includes('school') && !name.includes('lab') && !name.includes('library') && !type.includes('university')) {
              return false;
            }
            if (buildingCategory === 'admin' && !name.includes('admin') && !name.includes('senate') && !name.includes('office')) {
              return false;
            }
            if (buildingCategory === 'services' && !name.includes('cafe') && !name.includes('dorm') && !name.includes('stadium') && !name.includes('gym')) {
              return false;
            }
          }

          return true;
        },
        style: (feature) => {
          const name = (feature?.properties?.name || '').toLowerCase();
          let fillColor = '#0284c7';
          if (name.includes('library') || name.includes('geophysics')) fillColor = '#2563eb';
          if (name.includes('admin') || name.includes('senate')) fillColor = '#7c3aed';
          if (name.includes('stadium') || name.includes('sport')) fillColor = '#059669';

          return {
            color: '#0369a1',
            weight: 1.2,
            fillColor,
            fillOpacity: 0.65
          };
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          layer.bindTooltip(`<b>${props.name || 'Campus Building'}</b><br><span style="color:#94a3b8">${props.building_type || 'Facility'}</span>`, {
            sticky: true,
            className: 'text-xs'
          });

          layer.on('click', () => {
            onSelectFeature({
              type: 'building',
              properties: props
            });
          });
        }
      }).addTo(map);

      buildingsLayerRef.current = geo;
    }
  }, [layers.buildings, activeTab, searchQuery, buildingCategory]);

  // 4. Academic Landmarks Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (landmarksLayerRef.current) {
      map.removeLayer(landmarksLayerRef.current);
      landmarksLayerRef.current = null;
    }

    if (layers.landmarks && activeTab === 'campus') {
      const group = L.layerGroup();

      ASTU_LANDMARKS.forEach((lm) => {
        const iconHtml = `
          <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs shadow-lg border-2 border-white transition-transform hover:scale-110">
            <span>🏛️</span>
          </div>
        `;
        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-div-icon',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([lm.lat, lm.lng], { icon })
          .bindTooltip(`<b>${lm.name}</b><br><span style="color:#cbd5e1">${lm.nameOm}</span>`, {
            direction: 'top',
            offset: [0, -10]
          })
          .on('click', () => {
            onSelectFeature({
              type: 'building',
              properties: {
                id: lm.id,
                name: lm.name,
                building_type: lm.category,
                levels: 'Main Complex',
                notes: lm.description
              }
            });
          });

        group.addLayer(marker);
      });

      group.addTo(map);
      landmarksLayerRef.current = group;
    }
  }, [layers.landmarks, activeTab]);

  // 5. Geological Units Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (geologyLayerRef.current) {
      map.removeLayer(geologyLayerRef.current);
      geologyLayerRef.current = null;
    }

    if (layers.geology && activeTab === 'geophysical') {
      const geo = L.geoJSON(geologyData as any, {
        style: (feature) => {
          const p = feature?.properties;
          return {
            fillColor: p?.color || '#f59e0b',
            color: p?.color || '#f59e0b',
            weight: 1.5,
            fillOpacity: geologyOpacity
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`<b>${p.name} (${p.unit_code})</b><br>${p.lithology}`, {
            sticky: true,
            className: 'text-xs'
          });

          layer.on('click', () => {
            onSelectFeature({
              type: 'geology',
              properties: p
            });
          });
        }
      }).addTo(map);

      geologyLayerRef.current = geo;
    }
  }, [layers.geology, activeTab, geologyOpacity]);

  // 6. Wonji Fault Belt Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (faultsLayerRef.current) {
      map.removeLayer(faultsLayerRef.current);
      faultsLayerRef.current = null;
    }

    if (layers.faults && activeTab === 'geophysical') {
      const geo = L.geoJSON(faultsData as any, {
        style: (feature) => {
          const p = feature?.properties;
          return {
            color: p?.color || '#dc2626',
            weight: 3.5,
            opacity: 0.95
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`<b>${p.name}</b><br>Trend: ${p.trend} | Dip: ${p.dip_angle} ${p.dip_dir}`, {
            sticky: true,
            className: 'text-xs'
          });

          layer.on('click', () => {
            onSelectFeature({
              type: 'fault',
              properties: p
            });
          });
        }
      }).addTo(map);

      faultsLayerRef.current = geo;
    }
  }, [layers.faults, activeTab]);

  // 7. Bouguer Gravity Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (gravityLayerRef.current) {
      map.removeLayer(gravityLayerRef.current);
      gravityLayerRef.current = null;
    }

    if (layers.gravity && activeTab === 'geophysical') {
      const geo = L.geoJSON(gravityContoursData as any, {
        style: {
          color: '#c084fc',
          weight: 2.2,
          dashArray: '6, 4',
          opacity: 0.85
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`<b>${p.label}</b><br>${p.type}`, { sticky: true });
        }
      }).addTo(map);

      gravityLayerRef.current = geo;
    }
  }, [layers.gravity, activeTab]);

  // 8. Magnetic Anomaly Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (magneticLayerRef.current) {
      map.removeLayer(magneticLayerRef.current);
      magneticLayerRef.current = null;
    }

    if (layers.magnetic && activeTab === 'geophysical') {
      const geo = L.geoJSON(magneticContoursData as any, {
        style: {
          color: '#34d399',
          weight: 2.0,
          dashArray: '3, 3',
          opacity: 0.85
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`<b>${p.label}</b><br>${p.type}`, { sticky: true });
        }
      }).addTo(map);

      magneticLayerRef.current = geo;
    }
  }, [layers.magnetic, activeTab]);

  // 9. Geophysical Stations Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (stationsLayerRef.current) {
      map.removeLayer(stationsLayerRef.current);
      stationsLayerRef.current = null;
    }

    if (layers.stations && activeTab === 'geophysical') {
      const group = L.layerGroup();

      (stationsData as any).features.forEach((feat: any) => {
        const p = feat.properties;
        const [lon, lat] = feat.geometry.coordinates;

        const isThermal = p.name.includes('Thermal') || p.name.includes('Spring');
        const iconHtml = `
          <div class="relative flex items-center justify-center w-7 h-7 rounded-full ${
            isThermal ? 'bg-red-500' : 'bg-purple-600'
          } text-white font-bold text-xs shadow-xl border-2 border-slate-900 transition-transform hover:scale-125">
            <span>${isThermal ? '♨️' : '🎯'}</span>
          </div>
        `;
        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-div-icon',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([lat, lon], { icon })
          .bindTooltip(`<b>${p.id}</b>: ${p.name}`, { direction: 'top', offset: [0, -10] })
          .on('click', () => {
            onSelectFeature({
              type: 'station',
              properties: p
            });
          });

        group.addLayer(marker);
      });

      group.addTo(map);
      stationsLayerRef.current = group;
    }
  }, [layers.stations, activeTab]);

  // 10. SRTM Topographic Contours Layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (contoursLayerRef.current) {
      map.removeLayer(contoursLayerRef.current);
      contoursLayerRef.current = null;
    }

    if (layers.contours && activeTab === 'topographic') {
      const geo = L.geoJSON(contoursData as any, {
        style: (feature) => {
          const isIndex = feature?.properties?.is_index;
          return {
            color: isIndex ? '#b45309' : '#d97706',
            weight: isIndex ? 2.5 : 1.2,
            opacity: 0.85
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`<b>Elevation: ${p.label}</b>`, { sticky: true });
        }
      }).addTo(map);

      contoursLayerRef.current = geo;
    }
  }, [layers.contours, activeTab]);

  // 11. Transect Polyline Display
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (transectLayerRef.current) {
      map.removeLayer(transectLayerRef.current);
      transectLayerRef.current = null;
    }

    if (transectLine && transectLine.length >= 2) {
      const group = L.layerGroup();

      const poly = L.polyline(transectLine, {
        color: '#f59e0b',
        weight: 3.5,
        dashArray: '6, 6'
      });
      group.addLayer(poly);

      // Start/End circle markers
      const startMarker = L.circleMarker(transectLine[0], {
        radius: 6,
        color: '#f59e0b',
        fillColor: '#ffffff',
        fillOpacity: 1
      }).bindTooltip("Transect Start (A)", { permanent: true, direction: "top", offset: [0, -8] });

      const endMarker = L.circleMarker(transectLine[transectLine.length - 1], {
        radius: 6,
        color: '#f59e0b',
        fillColor: '#ffffff',
        fillOpacity: 1
      }).bindTooltip("Transect End (A')", { permanent: true, direction: "top", offset: [0, -8] });

      group.addLayer(startMarker);
      group.addLayer(endMarker);

      group.addTo(map);
      transectLayerRef.current = group;
    }
  }, [transectLine]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
