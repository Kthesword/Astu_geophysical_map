import boundaryData from './astu_boundary.json';
import buildingsData from './astu_buildings.json';
import roadsData from './astu_roads.json';
import geologyData from './geology_data.json';
import faultsData from './faults_data.json';
import contoursData from './astu_contours.json';
import elevationGridData from './astu_elevation_grid.json';
import stationsData from './astu_geophysics_stations.json';
import gravityContoursData from './astu_gravity_contours.json';
import magneticContoursData from './astu_magnetic_contours.json';

export interface ASTULandmark {
  id: string;
  name: string;
  nameOm: string;
  category: 'academic' | 'admin' | 'research' | 'services' | 'entrance';
  lat: number;
  lng: number;
  elevation: number;
  description: string;
}

export const ASTU_LANDMARKS: ASTULandmark[] = [
  {
    id: 'sans-geophysics',
    name: 'Department of Applied Geophysics',
    nameOm: 'Kutaa Barnoota Jiyoo-fiiziksii',
    category: 'research',
    lat: 8.5635,
    lng: 39.2912,
    elevation: 1675.2,
    description: 'School of Applied Natural Sciences (SANS). Primary laboratory for gravimetric, magnetic, ERT, and seismic exploration instrumentation.'
  },
  {
    id: 'admin-senate',
    name: 'ASTU Central Administration & Senate Building',
    nameOm: 'Waajjira Ol-aanaa Yuunivarsiitii',
    category: 'admin',
    lat: 8.5620,
    lng: 39.2900,
    elevation: 1672.0,
    description: 'Presidential offices, university senate hall, academic vice president, and registrar operations.'
  },
  {
    id: 'library-main',
    name: 'ASTU Central Digital Library',
    nameOm: 'Mana Kitaabaa Giddu-galeessaa',
    category: 'academic',
    lat: 8.5645,
    lng: 39.2895,
    elevation: 1681.4,
    description: 'Multi-story research library with GIS workstations, geosciences reading archives, and computational labs.'
  },
  {
    id: 'eng-civil',
    name: 'School of Civil Engineering & Architecture',
    nameOm: 'Mana Barumsa Injinariingii Sivilii',
    category: 'academic',
    lat: 8.5610,
    lng: 39.2880,
    elevation: 1667.5,
    description: 'Soil mechanics, geotechnical engineering testing laboratories, and structural geology materials testing.'
  },
  {
    id: 'gate-main',
    name: 'ASTU Main Entrance Gate',
    nameOm: 'Balbala Guddaa ASTU',
    category: 'entrance',
    lat: 8.5585,
    lng: 39.2858,
    elevation: 1656.0,
    description: 'Southern primary access gate on Onesmos Nesib Street connecting to the Addis-Adama expressway corridor.'
  },
  {
    id: 'stadium-complex',
    name: 'ASTU Stadium & Sports Complex',
    nameOm: 'Dirree Ispoortii ASTU',
    category: 'services',
    lat: 8.5675,
    lng: 39.2925,
    elevation: 1695.0,
    description: 'Olympic athletic track, football stadium, and university multipurpose gymnasium.'
  },
  {
    id: 'student-center',
    name: 'Central Student Cafeteria & Recreation Hub',
    nameOm: 'Giddugala Nyaataa fi Boqonnaa Barattootaa',
    category: 'services',
    lat: 8.5605,
    lng: 39.2915,
    elevation: 1664.0,
    description: 'Update data index to import json files instead of geojson for Vite compatibility'
  }
];

export {
  boundaryData,
  buildingsData,
  roadsData,
  geologyData,
  faultsData,
  contoursData,
  elevationGridData,
  stationsData,
  gravityContoursData,
  magneticContoursData
};
