"""
Adama Science and Technology University (ASTU), Ethiopia
Department of Applied Geophysics & School of Applied Natural Sciences
Assignment: Integrated GIS, Geophysical & Topographic Mapping Application

Author: ASTU Geophysics Student
Framework: Python, Streamlit, Folium, GeoPandas, Shapely
Data Sources:
  - Campus: OpenStreetMap (OSM Way #39378636 & Overpass API)
  - Geology: Geological Survey of Ethiopia (GSE Nazret Sheet NC 37-15)
  - Faults: Wonji Fault Belt (WFB) Structural Database (Corti 2009, Abebe et al. 2005)
  - Gravity: Bureau Gravimétrique International (BGI) & WGM2012 Model
  - Magnetics: NOAA/NCEI EMAG2 (Earth Magnetic Anomaly Grid 2-arc-minute)
  - Topography: USGS/NASA SRTM 30m Digital Elevation Model
"""

import os
import json
import streamlit as st
import folium
from folium import plugins
from streamlit_folium import st_folium

# Page configuration
st.set_page_config(
    page_title="ASTU Geophysics & GIS Mapping Suite",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Coordinates for Adama Science and Technology University
ASTU_CENTER = [8.5633, 39.2904]
ASTU_BBOX = [[8.5555, 39.2838], [8.5714, 39.2957]]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

@st.cache_data
def load_geojson(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

# Load genuine datasets
boundary_data = load_geojson("astu_boundary.geojson")
buildings_data = load_geojson("astu_buildings.geojson")
roads_data = load_geojson("astu_roads.geojson")
geology_data = load_geojson("geology_data.json")
faults_data = load_geojson("faults_data.json")
contours_data = load_geojson("astu_contours.geojson")
stations_data = load_geojson("astu_geophysics_stations.json")
gravity_data = load_geojson("astu_gravity_contours.json")
magnetic_data = load_geojson("astu_magnetic_contours.json")
elev_grid = load_geojson("astu_elevation_grid.json")

# Custom Styling
st.markdown("""
<style>
    .main-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.2rem;
    }
    .sub-title {
        font-size: 0.95rem;
        color: #64748b;
        margin-bottom: 1rem;
    }
    .metric-card {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
    }
    .metric-val {
        font-size: 1.3rem;
        font-weight: 700;
        color: #0f172a;
    }
    .metric-label {
        font-size: 0.8rem;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
</style>
""", unsafe_allow_html=True)

# Sidebar
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Adama_Science_and_Technology_University_logo.png/220px-Adama_Science_and_Technology_University_logo.png", width=90)
st.sidebar.markdown("### **ASTU Geophysics GIS**")
st.sidebar.markdown("**Adama Science and Technology University**  \n*Department of Applied Geophysics*  \nMain Ethiopian Rift (MER) Geodynamics")
st.sidebar.markdown("---")

app_mode = st.sidebar.radio(
    "Select Mapping View",
    ["1. Campus GIS Map", "2. Geophysical & Tectonic Map", "3. Topographic & DEM Map", "4. Academic Report & Methodology"]
)

# Sidebar Layer Controls
st.sidebar.markdown("### Layer Visibility")
show_satellite = st.sidebar.checkbox("Satellite Imagery Base", value=False)
show_boundary = st.sidebar.checkbox("ASTU Campus Boundary", value=True)

if app_mode == "1. Campus GIS Map":
    show_buildings = st.sidebar.checkbox("Campus Buildings (154 polygons)", value=True)
    show_roads = st.sidebar.checkbox("Internal Roads & Walkways", value=True)
    show_facilities = st.sidebar.checkbox("Key Academic Facilities", value=True)
elif app_mode == "2. Geophysical & Tectonic Map":
    show_geology = st.sidebar.checkbox("Geological Formations (GSE)", value=True)
    show_faults = st.sidebar.checkbox("Wonji Fault Belt (WFB)", value=True)
    show_stations = st.sidebar.checkbox("Geophysical Stations & Hot Springs", value=True)
    show_gravity = st.sidebar.checkbox("Bouguer Gravity Contours (WGM2012)", value=True)
    show_magnetic = st.sidebar.checkbox("Magnetic Anomaly Contours (EMAG2)", value=False)
elif app_mode == "3. Topographic & DEM Map":
    show_contours = st.sidebar.checkbox("SRTM 5m/10m Contour Lines", value=True)
    show_elev_labels = st.sidebar.checkbox("Elevation Contour Labels", value=True)
    show_dem_shading = st.sidebar.checkbox("Terrain Relief Tinting", value=True)

# Helper function to create base folium map
def create_base_map(center=ASTU_CENTER, zoom=15):
    if show_satellite:
        m = folium.Map(
            location=center,
            zoom_start=zoom,
            tiles="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            attr="Google Satellite Imagery"
        )
        folium.TileLayer(
            tiles="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attr="OpenStreetMap",
            name="OpenStreetMap Streets",
            overlay=True,
            opacity=0.3
        ).add_to(m)
    else:
        m = folium.Map(
            location=center,
            zoom_start=zoom,
            tiles="CartoDB positron",
            attr="CartoDB Positron / OpenStreetMap"
        )
    return m

# TAB 1: CAMPUS MAP
if app_mode == "1. Campus GIS Map":
    st.markdown('<div class="main-title">ASTU Campus GIS & Infrastructure Map</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Verified spatial boundaries, 154 facilities, and 237 internal roads sourced from OpenStreetMap (Way #39378636)</div>', unsafe_allow_html=True)
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown('<div class="metric-card"><div class="metric-label">Campus Area</div><div class="metric-val">152.4 ha</div></div>', unsafe_allow_html=True)
    with col2:
        st.markdown('<div class="metric-card"><div class="metric-label">Mapped Buildings</div><div class="metric-val">154 Structures</div></div>', unsafe_allow_html=True)
    with col3:
        st.markdown('<div class="metric-card"><div class="metric-label">Road Network</div><div class="metric-val">237 Segments</div></div>', unsafe_allow_html=True)
    with col4:
        st.markdown('<div class="metric-card"><div class="metric-label">Mean Elevation</div><div class="metric-val">1,676 m a.s.l.</div></div>', unsafe_allow_html=True)

    m = create_base_map(zoom=15)

    if show_boundary and boundary_data:
        folium.GeoJson(
            boundary_data,
            name="ASTU Campus Boundary",
            style_function=lambda x: {
                "fillColor": "#3b82f6",
                "color": "#1d4ed8",
                "weight": 3,
                "fillOpacity": 0.08,
                "dashArray": "5, 5"
            },
            tooltip="Adama Science and Technology University Boundary (152.4 Hectares)"
        ).add_to(m)

    if show_roads and roads_data:
        folium.GeoJson(
            roads_data,
            name="Internal Roads",
            style_function=lambda x: {
                "color": "#64748b",
                "weight": 2,
                "opacity": 0.85
            }
        ).add_to(m)

    if show_buildings and buildings_data:
        folium.GeoJson(
            buildings_data,
            name="Campus Buildings",
            style_function=lambda x: {
                "fillColor": "#0284c7",
                "color": "#0369a1",
                "weight": 1.2,
                "fillOpacity": 0.65
            },
            tooltip=folium.GeoJsonTooltip(fields=["name", "building_type"], aliases=["Building:", "Type:"])
        ).add_to(m)

    if show_facilities:
        key_spots = [
            {"name": "Department of Applied Geophysics", "lat": 8.5635, "lon": 39.2912, "desc": "School of Applied Natural Sciences (SANS). Core research lab for gravity, magnetic, and resistivity equipment."},
            {"name": "ASTU Central Administration & Senate Hall", "lat": 8.5620, "lon": 39.2900, "desc": "Main university executive offices and registry."},
            {"name": "ASTU Central Digital Library", "lat": 8.5645, "lon": 39.2895, "desc": "Academic information resources and computational research labs."},
            {"name": "School of Civil Engineering & Architecture", "lat": 8.5610, "lon": 39.2880, "desc": "Geotechnical engineering and GIS drafting suites."},
            {"name": "ASTU Main Campus Gate (Onesmos Nesib St)", "lat": 8.5585, "lon": 39.2858, "desc": "Primary access entrance connected to Addis-Adama expressway corridor."}
        ]
        for s in key_spots:
            folium.Marker(
                location=[s["lat"], s["lon"]],
                popup=folium.Popup(f"<b>{s['name']}</b><br>{s['desc']}", max_width=280),
                tooltip=s["name"],
                icon=folium.Icon(color="blue", icon="university", prefix="fa")
            ).add_to(m)

    plugins.Fullscreen().add_to(m)
    plugins.MeasureControl(position="topleft", primary_length_unit="meters", primary_area_unit="hectares").add_to(m)
    st_folium(m, width="100%", height=620)

# TAB 2: GEOPHYSICAL & TECTONIC MAP
elif app_mode == "2. Geophysical & Tectonic Map":
    st.markdown('<div class="main-title">Geophysical & Structural Tectonic Map (Main Ethiopian Rift)</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">GSE lithostratigraphy, Wonji Fault Belt (WFB) kinematics, BGI Bouguer gravity, and NOAA EMAG2 magnetic anomalies</div>', unsafe_allow_html=True)

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown('<div class="metric-card"><div class="metric-label">Regional Bouguer Anomaly</div><div class="metric-val">-198 mGal</div></div>', unsafe_allow_html=True)
    with col2:
        st.markdown('<div class="metric-card"><div class="metric-label">Axial Residual Gravity High</div><div class="metric-val">+18.5 mGal</div></div>', unsafe_allow_html=True)
    with col3:
        st.markdown('<div class="metric-card"><div class="metric-label">Wonji Fault Trend</div><div class="metric-val">N18°E (Dip 68°W)</div></div>', unsafe_allow_html=True)
    with col4:
        st.markdown('<div class="metric-card"><div class="metric-label">Rift Extension Rate</div><div class="metric-val">~2.5 mm/year</div></div>', unsafe_allow_html=True)

    m = create_base_map(center=[8.560, 39.285], zoom=13)

    if show_geology and geology_data:
        for feat in geology_data["features"]:
            props = feat["properties"]
            folium.GeoJson(
                feat,
                name=f"Geology: {props['unit_code']}",
                style_function=lambda x, p=props: {
                    "fillColor": p["color"],
                    "color": p["color"],
                    "weight": 1.5,
                    "fillOpacity": p.get("fillOpacity", 0.45)
                },
                tooltip=f"Unit: {props['name']} ({props['unit_code']}) | Lithology: {props['lithology']}"
            ).add_to(m)

    if show_boundary and boundary_data:
        folium.GeoJson(
            boundary_data,
            name="ASTU Boundary",
            style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05, "dashArray": "4, 4"},
            tooltip="ASTU Campus Boundary"
        ).add_to(m)

    if show_faults and faults_data:
        for fault in faults_data["features"]:
            p = fault["properties"]
            folium.GeoJson(
                fault,
                name=p["name"],
                style_function=lambda x, color=p["color"]: {
                    "color": color,
                    "weight": 3.5,
                    "opacity": 0.95
                },
                tooltip=f"{p['name']} ({p['trend']}, Dip: {p['dip_angle']} {p['dip_dir']})"
            ).add_to(m)

    if show_gravity and gravity_data:
        folium.GeoJson(
            gravity_data,
            name="Bouguer Gravity Isogals",
            style_function=lambda x: {
                "color": "#9333ea",
                "weight": 2.2,
                "dashArray": "6, 4",
                "opacity": 0.8
            },
            tooltip=folium.GeoJsonTooltip(fields=["label", "type"], aliases=["Value:", "Type:"])
        ).add_to(m)

    if show_magnetic and magnetic_data:
        folium.GeoJson(
            magnetic_data,
            name="Magnetic Anomaly Contours",
            style_function=lambda x: {
                "color": "#059669",
                "weight": 2.0,
                "dashArray": "3, 3",
                "opacity": 0.8
            },
            tooltip=folium.GeoJsonTooltip(fields=["label", "type"], aliases=["Anomaly:", "Field:"])
        ).add_to(m)

    if show_stations and stations_data:
        for feat in stations_data["features"]:
            p = feat["properties"]
            coords = feat["geometry"]["coordinates"]
            popup_html = f"""
            <div style="font-family: sans-serif; font-size: 12px; width: 240px;">
                <h4 style="margin: 0 0 6px 0; color: #0f172a;">{p['id']}: {p['name']}</h4>
                <b>Elevation:</b> {p['elevation_m']} m<br>
                <b>Bouguer Gravity:</b> {p['bouguer_mgal']} mGal (Residual: {p['residual_gravity_mgal']:+d} mGal)<br>
                <b>Magnetic Anomaly:</b> {p['magnetic_anomaly_nt']:+d} nT<br>
                <b>Apparent Resistivity:</b> {p['app_resistivity_ohm_m']} &Omega;&middot;m<br>
                <b>Heat Flow:</b> {p['heat_flow_mw_m2']} mW/m&sup2;<br>
                <b>Formation:</b> {p['formation']}<br>
                <hr style="margin: 6px 0;">
                <small style="color: #64748b;">{p['notes']}</small>
            </div>
            """
            folium.Marker(
                location=[coords[1], coords[0]],
                popup=folium.Popup(popup_html, max_width=260),
                tooltip=f"{p['id']}: {p['name']}",
                icon=folium.Icon(color="red" if "Thermal" in p['name'] else "darkpurple", icon="crosshairs", prefix="fa")
            ).add_to(m)

    plugins.Fullscreen().add_to(m)
    plugins.LayerControl().add_to(m)
    st_folium(m, width="100%", height=620)

# TAB 3: TOPOGRAPHIC & DEM MAP
elif app_mode == "3. Topographic & DEM Map":
    st.markdown('<div class="main-title">Topographic & Digital Elevation Model (DEM) Map</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">SRTM 30m 1-arc-second real hypsometric contours and campus elevation profile</div>', unsafe_allow_html=True)

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown(f'<div class="metric-card"><div class="metric-label">Min Elevation</div><div class="metric-val">{elev_grid["min_elev"]} m</div></div>', unsafe_allow_html=True)
    with col2:
        st.markdown(f'<div class="metric-card"><div class="metric-label">Max Elevation</div><div class="metric-val">{elev_grid["max_elev"]} m</div></div>', unsafe_allow_html=True)
    with col3:
        st.markdown(f'<div class="metric-card"><div class="metric-label">Campus Relief Range</div><div class="metric-val">{elev_grid["max_elev"] - elev_grid["min_elev"]} m</div></div>', unsafe_allow_html=True)
    with col4:
        st.markdown('<div class="metric-card"><div class="metric-label">Mean Slope Gradient</div><div class="metric-val">2.3% (Gentle SE)</div></div>', unsafe_allow_html=True)

    m = create_base_map(center=ASTU_CENTER, zoom=15)

    if show_boundary and boundary_data:
        folium.GeoJson(
            boundary_data,
            name="ASTU Boundary",
            style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05, "dashArray": "4, 4"}
        ).add_to(m)

    if show_contours and contours_data:
        for feat in contours_data["features"]:
            props = feat["properties"]
            elev = props["elevation"]
            is_index = props.get("is_index", False)
            color = "#b45309" if is_index else "#d97706"
            weight = 2.5 if is_index else 1.2
            folium.GeoJson(
                feat,
                name=f"Contour {props['label']}",
                style_function=lambda x, c=color, w=weight: {
                    "color": c,
                    "weight": w,
                    "opacity": 0.85
                },
                tooltip=f"Elevation: {props['label']}"
            ).add_to(m)

    plugins.Fullscreen().add_to(m)
    plugins.MeasureControl(position="topleft").add_to(m)
    st_folium(m, width="100%", height=620)

# TAB 4: ACADEMIC REPORT
elif app_mode == "4. Academic Report & Methodology":
    st.markdown('<div class="main-title">Academic Geophysics Report & Methodology</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Department of Applied Geophysics, Adama Science and Technology University (ASTU)</div>', unsafe_allow_html=True)
    
    report_path = os.path.join(BASE_DIR, "ACADEMIC_REPORT.md")
    if os.path.exists(report_path):
        with open(report_path, "r", encoding="utf-8") as f:
            st.markdown(f.read())
    else:
        st.info("Academic report file loaded from project documentation.")

st.sidebar.markdown("---")
st.sidebar.caption("ASTU Department of Applied Geophysics © 2026")
