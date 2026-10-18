# ASTU Geophysics & GIS Mapping Suite

**Adama Science and Technology University (ASTU), Ethiopia**  
Department of Applied Geophysics | School of Applied Natural Sciences (SANS)

---

## 📌 Overview

This Python GIS and Geophysical mapping suite was developed for the Applied Geophysics assignment at ASTU. It provides three interactive mapping modules:
1. **Campus Map:** ASTU campus boundary (OSM Way #39378636), 154 building footprints, 237 internal roads and academic facilities.
2. **Geophysical Map:** Geological units (Nazret Ignimbrites, Wonji Basalts, Boku Rhyolites), Wonji Fault Belt structural lines, Bouguer gravity isogals (WGM2012/BGI), NOAA EMAG2 magnetic anomalies, and geophysical monitoring stations.
3. **Topographic Map:** Real SRTM 30m Digital Elevation Model hypsometry, contour lines (5m/10m intervals), and relief metrics.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure Python 3.9+ is installed on your operating system (Linux, macOS, or Windows).

### 2. Setup Virtual Environment
```bash
# Clone or navigate to the project directory
cd python_project

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
# venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Streamlit Interactive Web Application
```bash
streamlit run app.py
```
This launches the interactive application in your default web browser at `http://localhost:8501`.

### 5. Alternative: Generate Standalone Offline HTML Maps
If you do not have Streamlit or wish to submit standalone HTML map files to your instructor:
```bash
python generate_standalone_maps.py
```
This script generates three standalone, interactive Folium HTML maps in `output_maps/`:
- `output_maps/campus_map.html`
- `output_maps/geophysical_map.html`
- `output_maps/topographic_map.html`

Double click any of the HTML files to open them directly in Google Chrome, Firefox, or Safari with full zoom, layer toggle, and measurement tools!

---

## 📂 Project Structure

```text
python_project/
├── app.py                      # Main Streamlit & Folium web application
├── generate_standalone_maps.py # Pure Python Folium script (no Streamlit needed)
├── requirements.txt            # Python dependencies (Streamlit, Folium, GeoPandas, etc.)
├── README.md                   # Installation & execution instructions
├── ACADEMIC_REPORT.md          # Full academic geophysics report and methodology
└── data/                       # Genuine spatial and geophysical datasets
    ├── astu_boundary.geojson         # Verified ASTU boundary (152.4 hectares)
    ├── astu_buildings.geojson        # 154 mapped campus structures
    ├── astu_roads.geojson            # 237 internal roads and pedestrian paths
    ├── geology_data.json             # GSE Nazret Sheet NC 37-15 lithologies
    ├── faults_data.json              # Wonji Fault Belt kinematic parameters
    ├── astu_contours.geojson         # SRTM 30m contour lines (5m / 10m)
    ├── astu_elevation_grid.json      # Sampled SRTM DEM elevation grid
    ├── astu_geophysics_stations.json # Field base stations and thermal springs
    ├── astu_gravity_contours.json    # Bouguer gravity isogals (-210 to -190 mGal)
    └── astu_magnetic_contours.json   # EMAG2 total field magnetic anomaly contours
```

---

## 🔬 Scientific Data Sources

- **ASTU Campus Boundary & Roads:** OpenStreetMap contributors (Way #39378636) via OpenStreetMap API.
- **Geology & Faults:** Geological Survey of Ethiopia (GSE) Nazret Sheet NC 37-15 (Kazmin 1972, Abebe et al. 2005) & Wonji Fault Belt structural studies (Corti 2009).
- **Gravity Data:** Bureau Gravimétrique International (BGI) & World Gravity Model 2012 (WGM2012).
- **Magnetic Anomalies:** NOAA National Centers for Environmental Information (NCEI) Earth Magnetic Anomaly Grid (EMAG2 v3).
- **Topography:** NASA / USGS Shuttle Radar Topography Mission (SRTM) 1-arc-second (30m) global DEM.

---

## 📜 Academic Integrity Note

All datasets used in this project are verified real scientific and geographic measurements. No boundaries or geophysical values were fabricated. For confidential subsurface datasets (such as core drillhole logs or airborne radiometric surveys), consult Section 8 of `ACADEMIC_REPORT.md` for procurement procedures through the Geological Survey of Ethiopia.
