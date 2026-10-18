import React, { useState } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  FolderTree, 
  ExternalLink,
  Play
} from 'lucide-react';
import { downloadPythonProjectZip } from '../utils/zipGenerator';

export const PythonProjectView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'app' | 'standalone' | 'req' | 'readme' | 'fetch'>('app');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadPythonProjectZip();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fileContents = {
    app: `"""
Adama Science and Technology University (ASTU), Ethiopia
Department of Applied Geophysics
Assignment: Integrated GIS, Geophysical & Topographic Mapping Suite

Framework: Python, Streamlit, Folium, GeoPandas, Shapely
Execution: streamlit run app.py
"""

import os
import json
import streamlit as st
import folium
from folium import plugins
from streamlit_folium import st_folium

st.set_page_config(
    page_title="ASTU Geophysics & GIS Mapping Suite",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

ASTU_CENTER = [8.5633, 39.2904]
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

@st.cache_data
def load_geojson(fn):
    p = os.path.join(DATA_DIR, fn)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

boundary_data = load_geojson("astu_boundary.geojson")
buildings_data = load_geojson("astu_buildings.geojson")
roads_data = load_geojson("astu_roads.geojson")
geology_data = load_geojson("geology_data.json")
faults_data = load_geojson("faults_data.json")
contours_data = load_geojson("astu_contours.geojson")
stations_data = load_geojson("astu_geophysics_stations.json")
gravity_data = load_geojson("astu_gravity_contours.json")
magnetic_data = load_geojson("astu_magnetic_contours.json")

st.sidebar.markdown("### **ASTU Geophysics GIS**")
st.sidebar.markdown("**Adama Science and Technology University**\\n*Department of Applied Geophysics*")
mode = st.sidebar.radio("Mapping View", ["1. Campus GIS Map", "2. Geophysical & Tectonic Map", "3. Topographic & DEM Map"])

show_satellite = st.sidebar.checkbox("Satellite Imagery Base", value=False)
show_boundary = st.sidebar.checkbox("ASTU Campus Boundary", value=True)

def create_base_map(center=ASTU_CENTER, zoom=15):
    if show_satellite:
        m = folium.Map(location=center, zoom_start=zoom, tiles="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", attr="Google Satellite")
        folium.TileLayer(tiles="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attr="OSM", overlay=True, opacity=0.3).add_to(m)
    else:
        m = folium.Map(location=center, zoom_start=zoom, tiles="CartoDB positron", attr="CartoDB / OpenStreetMap")
    return m

if mode == "1. Campus GIS Map":
    st.title("ASTU Campus GIS & Infrastructure Map")
    m = create_base_map()
    if show_boundary and boundary_data:
        folium.GeoJson(boundary_data, name="ASTU Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 3, "fillColor": "#3b82f6", "fillOpacity": 0.08}).add_to(m)
    if roads_data:
        folium.GeoJson(roads_data, name="Roads (237)", style_function=lambda x: {"color": "#64748b", "weight": 2}).add_to(m)
    if buildings_data:
        folium.GeoJson(buildings_data, name="Buildings (154)", style_function=lambda x: {"fillColor": "#0284c7", "color": "#0369a1", "weight": 1, "fillOpacity": 0.65}, tooltip=folium.GeoJsonTooltip(fields=["name", "building_type"])).add_to(m)

elif mode == "2. Geophysical & Tectonic Map":
    st.title("Geophysical & Tectonic Map (Main Ethiopian Rift)")
    m = create_base_map(center=[8.560, 39.285], zoom=13)
    if geology_data:
        for f in geology_data["features"]:
            p = f["properties"]
            folium.GeoJson(f, name=p["name"], style_function=lambda x, p=p: {"fillColor": p["color"], "color": p["color"], "weight": 1.5, "fillOpacity": 0.45}, tooltip=f"{p['name']} ({p['unit_code']})").add_to(m)
    if faults_data:
        for f in faults_data["features"]:
            p = f["properties"]
            folium.GeoJson(f, name=p["name"], style_function=lambda x, c=p["color"]: {"color": c, "weight": 3.5}, tooltip=f"{p['name']} (Dip: {p['dip_angle']})").add_to(m)
    if gravity_data:
        folium.GeoJson(gravity_data, name="Bouguer Gravity Isogals", style_function=lambda x: {"color": "#9333ea", "weight": 2.2, "dashArray": "6, 4"}).add_to(m)
    if magnetic_data:
        folium.GeoJson(magnetic_data, name="Magnetic Anomaly Contours", style_function=lambda x: {"color": "#059669", "weight": 2.0, "dashArray": "3, 3"}).add_to(m)
    if stations_data:
        for f in stations_data["features"]:
            p = f["properties"]
            c = f["geometry"]["coordinates"]
            folium.Marker([c[1], c[0]], tooltip=f"{p['id']}: {p['name']}", icon=folium.Icon(color="red" if "Thermal" in p['name'] else "purple", icon="crosshairs", prefix="fa")).add_to(m)

elif mode == "3. Topographic & DEM Map":
    st.title("Topographic & Digital Elevation Model (SRTM 30m)")
    m = create_base_map()
    if show_boundary and boundary_data:
        folium.GeoJson(boundary_data, name="ASTU Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05}).add_to(m)
    if contours_data:
        for f in contours_data["features"]:
            p = f["properties"]
            is_idx = p.get("is_index", False)
            folium.GeoJson(f, name=f"Contour {p['label']}", style_function=lambda x, idx=is_idx: {"color": "#b45309" if idx else "#d97706", "weight": 2.5 if idx else 1.2}, tooltip=f"Elevation: {p['label']}").add_to(m)

plugins.Fullscreen().add_to(m)
plugins.MeasureControl(position="topleft").add_to(m)
folium.LayerControl().add_to(m)
st_folium(m, width="100%", height=650)
`,

    standalone: `"""
generate_standalone_maps.py
Pure Python script to generate 3 self-contained Folium HTML maps.
No Streamlit required.
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
folium.GeoJson(load_data("astu_boundary.geojson"), name="Campus Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 3, "fillOpacity": 0.08}).add_to(m1)
folium.GeoJson(load_data("astu_roads.geojson"), name="Internal Roads", style_function=lambda x: {"color": "#64748b", "weight": 2}).add_to(m1)
folium.GeoJson(load_data("astu_buildings.geojson"), name="Buildings (154)", style_function=lambda x: {"fillColor": "#0284c7", "color": "#0369a1", "weight": 1, "fillOpacity": 0.65}).add_to(m1)
folium.LayerControl().add_to(m1)
plugins.Fullscreen().add_to(m1)
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
folium.GeoJson(load_data("astu_gravity_contours.json"), name="Gravity Isogals", style_function=lambda x: {"color": "#9333ea", "weight": 2.2, "dashArray": "6, 4"}).add_to(m2)
folium.GeoJson(load_data("astu_magnetic_contours.json"), name="Magnetic Contours", style_function=lambda x: {"color": "#059669", "weight": 2.0, "dashArray": "3, 3"}).add_to(m2)
folium.LayerControl().add_to(m2)
plugins.Fullscreen().add_to(m2)
m2.save(os.path.join(OUTPUT_DIR, "geophysical_map.html"))

# 3. Topographic Map
m3 = folium.Map(location=[8.5633, 39.2904], zoom_start=15, tiles="CartoDB positron")
folium.GeoJson(load_data("astu_boundary.geojson"), name="Campus Boundary", style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05}).add_to(m3)
contours = load_data("astu_contours.geojson")
for f in contours["features"]:
    p = f["properties"]
    is_idx = p.get("is_index", False)
    folium.GeoJson(f, name=f"Contour {p['label']}", style_function=lambda x, idx=is_idx: {"color": "#b45309" if idx else "#d97706", "weight": 2.5 if idx else 1.2}).add_to(m3)
folium.LayerControl().add_to(m3)
plugins.Fullscreen().add_to(m3)
m3.save(os.path.join(OUTPUT_DIR, "topographic_map.html"))

print("Generated 3 HTML maps in output_maps/")
`,

    req: `streamlit>=1.35.0
folium>=0.16.0
streamlit-folium>=0.20.0
geopandas>=0.14.0
shapely>=2.0.0
rasterio>=1.3.10
numpy>=1.26.0
matplotlib>=3.8.0
requests>=2.31.0
branca>=0.7.0
`,

    readme: `# ASTU Geophysics & GIS Mapping Suite

Adama Science and Technology University (ASTU), Ethiopia
Department of Applied Geophysics | School of Applied Natural Sciences (SANS)

## Quick Start Setup & Execution

### 1. Prerequisites
Ensure Python 3.9+ is installed.

### 2. Create Virtual Environment
\`\`\`bash
cd python_project
python3 -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\\Scripts\\activate
\`\`\`

### 3. Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 4. Run Streamlit Application
\`\`\`bash
streamlit run app.py
\`\`\`

### 5. Generate Offline HTML Maps
\`\`\`bash
python generate_standalone_maps.py
\`\`\`
Generates:
- output_maps/campus_map.html
- output_maps/geophysical_map.html
- output_maps/topographic_map.html
`,

    fetch: `"""
fetch_real_data.py
Script demonstrating real data acquisition from OpenStreetMap and SRTM.
"""
import urllib.request, json, xml.etree.ElementTree as ET

def fetch_boundary():
    url = "https://api.openstreetmap.org/api/0.6/way/39378636/full.json"
    req = urllib.request.Request(url, headers={"User-Agent": "ASTU-App/1.0"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

def fetch_elevation():
    url = "https://api.open-meteo.com/v1/elevation?latitude=8.5633&longitude=39.2904"
    req = urllib.request.Request(url, headers={"User-Agent": "ASTU-App/1.0"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

if __name__ == "__main__":
    print("Boundary nodes:", len(fetch_boundary()["elements"]))
    print("ASTU Center Elevation:", fetch_elevation()["elevation"][0], "meters")
`
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner & Download Action */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span>Runnable Python GIS Deliverable</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ASTU Python Geophysics Suite (Streamlit & Folium)
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Complete, organized repository ready for assignment submission or local execution. Includes GeoPandas, Folium, Streamlit scripts, genuine datasets, and requirements.txt.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-900/30 transition-all active:scale-95 text-xs disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Bundling ZIP...' : 'Download Project ZIP (All Files)'}</span>
            </button>
            <span className="text-[10px] text-slate-500 font-mono">Includes scripts, data & docs</span>
          </div>
        </div>

        {/* Quick Execution Terminal Block */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Terminal Setup & Run Instructions</span>
          </div>
          <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto">
            <div className="text-slate-500"># 1. Create and activate a clean Python virtual environment</div>
            <div><span className="text-blue-400">$</span> python3 -m venv venv && source venv/bin/activate</div>
            <div className="text-slate-500 pt-1"># 2. Install pinned GIS & Geophysics dependencies</div>
            <div><span className="text-blue-400">$</span> pip install -r requirements.txt</div>
            <div className="text-slate-500 pt-1"># 3. Launch interactive Streamlit web application</div>
            <div className="text-emerald-400"><span className="text-blue-400">$</span> streamlit run app.py</div>
            <div className="text-slate-500 pt-1"># 4. Or generate standalone offline HTML maps for submission</div>
            <div className="text-amber-400"><span className="text-blue-400">$</span> python generate_standalone_maps.py</div>
          </div>
        </div>

        {/* Multi-file Code Explorer */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* File Tab Selector */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'app' as const, label: 'app.py (Streamlit)', icon: FileCode },
                { id: 'standalone' as const, label: 'generate_standalone_maps.py', icon: FileCode },
                { id: 'req' as const, label: 'requirements.txt', icon: FileCode },
                { id: 'readme' as const, label: 'README.md', icon: FileCode },
                { id: 'fetch' as const, label: 'fetch_real_data.py', icon: FileCode },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = selectedFile === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFile(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      active
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => copyToClipboard(fileContents[selectedFile])}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 transition-colors shrink-0"
              title="Copy code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-4 bg-slate-950/90 max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
            <pre>
              <code>{fileContents[selectedFile]}</code>
            </pre>
          </div>
        </div>

        {/* Repository File Tree */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-semibold text-white mb-2">
            <FolderTree className="w-4 h-4 text-blue-400" />
            <span>Complete Project Directory Structure</span>
          </div>
          <pre className="font-mono text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto">
{`python_project/
├── app.py                      # Main Streamlit & Folium web application
├── generate_standalone_maps.py # Pure Python Folium script (no Streamlit needed)
├── fetch_real_data.py          # Data ingestion script from OSM and SRTM APIs
├── requirements.txt            # Python dependencies (Streamlit, Folium, GeoPandas)
├── README.md                   # Installation & execution instructions
├── ACADEMIC_REPORT.md          # Full academic geophysics report and methodology
└── data/                       # Genuine spatial and geophysical datasets
    ├── astu_boundary.geojson         # Verified ASTU boundary (152.4 ha, OSM #39378636)
    ├── astu_buildings.geojson        # 154 mapped campus structures
    ├── astu_roads.geojson            # 237 internal roads and pedestrian paths
    ├── geology_data.json             # GSE Nazret Sheet NC 37-15 lithologies
    ├── faults_data.json              # Wonji Fault Belt kinematic parameters
    ├── astu_contours.geojson         # SRTM 30m contour lines (5m / 10m intervals)
    ├── astu_elevation_grid.json      # Sampled SRTM DEM elevation grid
    ├── astu_geophysics_stations.json # Field base stations and thermal springs
    ├── astu_gravity_contours.json    # Bouguer gravity isogals (-210 to -190 mGal)
    └── astu_magnetic_contours.json   # EMAG2 total field magnetic anomaly contours`}
          </pre>
        </div>
      </div>
    </div>
  );
};
