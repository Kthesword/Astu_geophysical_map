export type ActiveTab = 'campus' | 'geophysical' | 'topographic' | 'report' | 'python';

export type BasemapType = 'osm' | 'positron' | 'satellite';

export interface BuildingProperties {
  id: string;
  name: string;
  building_type: string;
  amenity?: string;
  levels?: string;
  tags?: Record<string, string>;
}

export interface GeologicalUnit {
  unit_code: string;
  name: string;
  period: string;
  lithology: string;
  color: string;
  fillOpacity: number;
  density_gcc: string;
  mag_susceptibility_si: string;
  description: string;
}

export interface FaultProperties {
  name: string;
  system: string;
  type: string;
  trend: string;
  dip_dir: string;
  dip_angle: string;
  scarp_height_m: number;
  slip_rate_mm_yr: string;
  color: string;
}

export interface GeophysicalStation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  elevation_m: number;
  bouguer_mgal: number;
  residual_gravity_mgal: number;
  magnetic_total_nt: number;
  magnetic_anomaly_nt: number;
  app_resistivity_ohm_m: number;
  heat_flow_mw_m2: number;
  formation: string;
  instrument: string;
  notes: string;
}

export interface ElevationGrid {
  lats: number[];
  lons: number[];
  elevations: number[];
  min_elev: number;
  max_elev: number;
  mean_elev: number;
}
