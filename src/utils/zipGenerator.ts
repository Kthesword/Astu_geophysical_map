import JSZip from 'jszip';
import {
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
} from '../data';

export async function downloadPythonProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root python scripts and documentation
  const appPyContent = `"""
ASTU Geophysics & GIS Mapping Suite
Streamlit + Folium Interactive Application
"""
import os
import json
import streamlit as st
import folium
from folium import plugins
from streamlit_folium import st_folium

st.set_page_config(page_title="ASTU Geophysics & GIS Mapping Suite", page_icon="🌍", layout="wide")

ASTU_CENTER = [8.5633, 39.2904]
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

def load_data(fn):
    p = os.path.join(DATA_DIR, fn)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

boundary = load_data("astu_boundary.geojson")
buildings = load_data("astu_buildings.geojson")
roads = load_data("astu_roads.geojson")
geology = load_data("geology_data.json")
faults = load_data("faults_data.json")
contours = load_data("astu_contours.geojson")
stations = load_data("astu_geophysics_stations.json")
gravity = load_data("astu_gravity_contours.json")
magnetic = load_data("astu_magnetic_contours.json")

st.sidebar.title("ASTU Geophysics GIS")
st.sidebar.markdown("**Adama Science and Technology University**\\n*Department of Applied Geophysics*")
mode = st.sidebar.radio("Map View", ["Campus Map", "Geophysical Map", "Topographic Map"])

m = folium.Map(location=ASTU_CENTER, zoom_start=15, tiles="CartoDB positron")

if mode == "Campus Map":
    st.title("ASTU Campus GIS Map")
    if boundary:
        folium.GeoJson(boundary, name="Campus Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 3, "fillOpacity": 0.08}).add_to(m)
    if roads:
        folium.GeoJson(roads, name="Internal Roads", style_function=lambda x: {"color": "#64748b", "weight": 2}).add_to(m)
    if buildings:
        folium.GeoJson(buildings, name="Buildings (154)", style_function=lambda x: {"fillColor": "#0284c7", "color": "#0369a1", "weight": 1, "fillOpacity": 0.6}).add_to(m)

elif mode == "Geophysical Map":
    st.title("Geophysical & Tectonic Map (Main Ethiopian Rift)")
    if geology:
        for f in geology["features"]:
            p = f["properties"]
            folium.GeoJson(f, name=p["name"], style_function=lambda x, p=p: {"fillColor": p["color"], "color": p["color"], "weight": 1.5, "fillOpacity": 0.45}).add_to(m)
    if faults:
        for f in faults["features"]:
            p = f["properties"]
            folium.GeoJson(f, name=p["name"], style_function=lambda x, c=p["color"]: {"color": c, "weight": 3.5}).add_to(m)
    if gravity:
        folium.GeoJson(gravity, name="Bouguer Gravity", style_function=lambda x: {"color": "#9333ea", "weight": 2, "dashArray": "6, 4"}).add_to(m)
    if magnetic:
        folium.GeoJson(magnetic, name="Magnetic Anomalies", style_function=lambda x: {"color": "#059669", "weight": 2, "dashArray": "3, 3"}).add_to(m)
    if stations:
        for f in stations["features"]:
            p = f["properties"]
            c = f["geometry"]["coordinates"]
            folium.Marker([c[1], c[0]], tooltip=f"{p['id']}: {p['name']}", icon=folium.Icon(color="purple", icon="crosshairs", prefix="fa")).add_to(m)

elif mode == "Topographic Map":
    st.title("Topographic & Elevation Model Map")
    if boundary:
        folium.GeoJson(boundary, name="Campus Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 2, "fillOpacity": 0.05}).add_to(m)
    if contours:
        for f in contours["features"]:
            p = f["properties"]
            folium.GeoJson(f, name=f"Contour {p['label']}", style_function=lambda x, p=p: {"color": "#b45309" if p.get("is_index") else "#d97706", "weight": 2 if p.get("is_index") else 1}).add_to(m)

plugins.Fullscreen().add_to(m)
plugins.MeasureControl(position="topleft").add_to(m)
folium.LayerControl().add_to(m)
st_folium(m, width="100%", height=650)
`;

  const standalonePyContent = `"""
generate_standalone_maps.py
Pure Python Folium script to export HTML maps.
Usage: python generate_standalone_maps.py
"""
import os, json, folium
from folium import plugins

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "output_maps")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_data(fn):
    p = os.path.join(DATA_DIR, fn)
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)

# 1. Campus Map
m1 = folium.Map(location=[8.5633, 39.2904], zoom_start=15, tiles="CartoDB positron")
folium.GeoJson(load_data("astu_boundary.geojson"), name="ASTU Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 3, "fillOpacity": 0.08}).add_to(m1)
folium.GeoJson(load_data("astu_roads.geojson"), name="Roads", style_function=lambda x: {"color": "#64748b", "weight": 2}).add_to(m1)
folium.GeoJson(load_data("astu_buildings.geojson"), name="Buildings", style_function=lambda x: {"fillColor": "#0284c7", "color": "#0369a1", "weight": 1, "fillOpacity": 0.65}).add_to(m1)
folium.LayerControl().add_to(m1)
m1.save(os.path.join(OUTPUT_DIR, "campus_map.html"))

# 2. Geophysical Map
m2 = folium.Map(location=[8.560, 39.285], zoom_start=13, tiles="CartoDB positron")
geology = load_data("geology_data.json")
for f in geology["features"]:
    p = f["properties"]
    folium.GeoJson(f, name=p["name"], style_function=lambda x, p=p: {"fillColor": p["color"], "color": p["color"], "weight": 1.5, "fillOpacity": 0.45}).add_to(m2)
faults = load_data("faults_data.json")
for f in faults["features"]:
    p = f["properties"]
    folium.GeoJson(f, name=p["name"], style_function=lambda x, c=p["color"]: {"color": c, "weight": 3.5}).add_to(m2)
folium.GeoJson(load_data("astu_gravity_contours.json"), name="Gravity Isogals", style_function=lambda x: {"color": "#9333ea", "weight": 2, "dashArray": "6, 4"}).add_to(m2)
folium.GeoJson(load_data("astu_magnetic_contours.json"), name="Magnetic Contours", style_function=lambda x: {"color": "#059669", "weight": 2, "dashArray": "3, 3"}).add_to(m2)
folium.LayerControl().add_to(m2)
m2.save(os.path.join(OUTPUT_DIR, "geophysical_map.html"))

# 3. Topographic Map
m3 = folium.Map(location=[8.5633, 39.2904], zoom_start=15, tiles="CartoDB positron")
folium.GeoJson(load_data("astu_boundary.geojson"), name="ASTU Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05}).add_to(m3)
contours = load_data("astu_contours.geojson")
for f in contours["features"]:
    p = f["properties"]
    folium.GeoJson(f, name=f"Contour {p['label']}", style_function=lambda x, p=p: {"color": "#b45309" if p.get("is_index") else "#d97706", "weight": 2.5 if p.get("is_index") else 1.2}).add_to(m3)
folium.LayerControl().add_to(m3)
m3.save(os.path.join(OUTPUT_DIR, "topographic_map.html"))

print("Generated 3 HTML maps in output_maps/")
`;

  const requirementsTxt = `streamlit>=1.35.0
folium>=0.16.0
streamlit-folium>=0.20.0
geopandas>=0.14.0
shapely>=2.0.0
rasterio>=1.3.10
numpy>=1.26.0
matplotlib>=3.8.0
requests>=2.31.0
branca>=0.7.0
`;

  const readmeMd = `# ASTU Geophysics & GIS Mapping Suite

Adama Science and Technology University (ASTU), Ethiopia
Department of Applied Geophysics | School of Applied Natural Sciences (SANS)

## Quick Start
\`\`\`bash
# 1. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Option A: Run Streamlit Web Application
streamlit run app.py

# 4. Option B: Generate Standalone HTML Maps (No Streamlit required)
python generate_standalone_maps.py
\`\`\`
`;

  zip.file('app.py', appPyContent);
  zip.file('generate_standalone_maps.py', standalonePyContent);
  zip.file('requirements.txt', requirementsTxt);
  zip.file('README.md', readmeMd);

  // Add data folder
  const dataFolder = zip.folder('data');
  if (dataFolder) {
    dataFolder.file('astu_boundary.geojson', JSON.stringify(boundaryData, null, 2));
    dataFolder.file('astu_buildings.geojson', JSON.stringify(buildingsData, null, 2));
    dataFolder.file('astu_roads.geojson', JSON.stringify(roadsData, null, 2));
    dataFolder.file('geology_data.json', JSON.stringify(geologyData, null, 2));
    dataFolder.file('faults_data.json', JSON.stringify(faultsData, null, 2));
    dataFolder.file('astu_contours.geojson', JSON.stringify(contoursData, null, 2));
    dataFolder.file('astu_elevation_grid.json', JSON.stringify(elevationGridData, null, 2));
    dataFolder.file('astu_geophysics_stations.json', JSON.stringify(stationsData, null, 2));
    dataFolder.file('astu_gravity_contours.json', JSON.stringify(gravityContoursData, null, 2));
    dataFolder.file('astu_magnetic_contours.json', JSON.stringify(magneticContoursData, null, 2));
  }

  // Generate zip file and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ASTU_Geophysics_GIS_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
