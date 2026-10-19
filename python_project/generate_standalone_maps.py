"""
generate_standalone_maps.py
---------------------------
Generates standalone, self-contained Folium HTML maps for offline viewing or submission.
Runs with standard Python and Folium (no Streamlit required).

Usage:
  python generate_standalone_maps.py
"""

import os
import json
import folium
from folium import plugins

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "output_maps")
os.makedirs(OUTPUT_DIR, exist_ok=True)

ASTU_CENTER = [8.5633, 39.2904]

def load_data(name):
    p = os.path.join(DATA_DIR, name)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return None

def build_campus_map():
    print("Building Campus Map...")
    m = folium.Map(location=ASTU_CENTER, zoom_start=15, tiles="CartoDB positron")
    
    # Google Satellite layer option
    folium.TileLayer(
        tiles="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        attr="Google Satellite Hybrid",
        name="Satellite Hybrid"
    ).add_to(m)

    boundary = load_data("astu_boundary.geojson")
    if boundary:
        folium.GeoJson(
            boundary,
            name="ASTU Boundary (152.4 ha)",
            style_function=lambda x: {
                "fillColor": "#2563eb", "color": "#1d4ed8", "weight": 3,
                "fillOpacity": 0.08, "dashArray": "5, 5"
            },
            tooltip="ASTU Verified Campus Boundary"
        ).add_to(m)

    roads = load_data("astu_roads.geojson")
    if roads:
        folium.GeoJson(
            roads,
            name="Internal Roads & Walkways (237)",
            style_function=lambda x: {"color": "#64748b", "weight": 2, "opacity": 0.8}
        ).add_to(m)

    buildings = load_data("astu_buildings.geojson")
    if buildings:
        folium.GeoJson(
            buildings,
            name="Campus Buildings (154)",
            style_function=lambda x: {
                "fillColor": "#0284c7", "color": "#0369a1", "weight": 1, "fillOpacity": 0.65
            },
            tooltip=folium.GeoJsonTooltip(fields=["name", "building_type"], aliases=["Building:", "Type:"])
        ).add_to(m)

    # Key academic landmarks
    landmarks = [
        {"name": "Department of Applied Geophysics", "lat": 8.5635, "lon": 39.2912, "desc": "SANS Building - Geophysics research & equipment lab."},
        {"name": "ASTU Central Administration", "lat": 8.5620, "lon": 39.2900, "desc": "University Senate & Executive administration."},
        {"name": "Central Digital Library", "lat": 8.5645, "lon": 39.2895, "desc": "Primary research and scientific library."},
        {"name": "Main Entrance Gate", "lat": 8.5585, "lon": 39.2858, "desc": "Campus access gate along Onesmos Nesib Street."}
    ]
    for lm in landmarks:
        folium.Marker(
            location=[lm["lat"], lm["lon"]],
            popup=folium.Popup(f"<b>{lm['name']}</b><br>{lm['desc']}", max_width=250),
            tooltip=lm["name"],
            icon=folium.Icon(color="blue", icon="university", prefix="fa")
        ).add_to(m)

    folium.LayerControl().add_to(m)
    plugins.MeasureControl(position="topleft").add_to(m)
    plugins.Fullscreen().add_to(m)
    
    out_path = os.path.join(OUTPUT_DIR, "campus_map.html")
    m.save(out_path)
    print(f"Saved: {out_path}")

def build_geophysical_map():
    print("Building Geophysical Map...")
    m = folium.Map(location=[8.560, 39.285], zoom_start=13, tiles="CartoDB positron")

    geology = load_data("geology_data.json")
    if geology:
        for f in geology["features"]:
            p = f["properties"]
            folium.GeoJson(
                f,
                name=f"Geology: {p['name']} ({p['unit_code']})",
                style_function=lambda x, p=p: {
                    "fillColor": p["color"], "color": p["color"], "weight": 1.5, "fillOpacity": 0.45
                },
                tooltip=f"{p['name']} - {p['lithology']}"
            ).add_to(m)

    faults = load_data("faults_data.json")
    if faults:
        for f in faults["features"]:
            p = f["properties"]
            folium.GeoJson(
                f,
                name=f"Fault: {p['name']}",
                style_function=lambda x, c=p["color"]: {"color": c, "weight": 3.5, "opacity": 0.95},
                tooltip=f"{p['name']} (Trend: {p['trend']}, Dip: {p['dip_angle']} {p['dip_dir']})"
            ).add_to(m)

    gravity = load_data("astu_gravity_contours.json")
    if gravity:
        folium.GeoJson(
            gravity,
            name="Bouguer Gravity Isogals (WGM2012)",
            style_function=lambda x: {"color": "#9333ea", "weight": 2.2, "dashArray": "6, 4", "opacity": 0.8},
            tooltip=folium.GeoJsonTooltip(fields=["label", "type"])
        ).add_to(m)

    magnetic = load_data("astu_magnetic_contours.json")
    if magnetic:
        folium.GeoJson(
            magnetic,
            name="Magnetic Anomaly Contours (EMAG2)",
            style_function=lambda x: {"color": "#059669", "weight": 2.0, "dashArray": "3, 3", "opacity": 0.8},
            tooltip=folium.GeoJsonTooltip(fields=["label", "type"])
        ).add_to(m)

    stations = load_data("astu_geophysics_stations.json")
    if stations:
        for f in stations["features"]:
            p = f["properties"]
            c = f["geometry"]["coordinates"]
            popup = f"""<b>{p['id']}: {p['name']}</b><br>
            Bouguer Gravity: {p['bouguer_mgal']} mGal<br>
            Magnetic Anomaly: {p['magnetic_anomaly_nt']:+.1f} nT<br>
            Resistivity: {p['app_resistivity_ohm_m']} &Omega;&middot;m<br>
            Formation: {p['formation']}"""
            folium.Marker(
                location=[c[1], c[0]],
                popup=folium.Popup(popup, max_width=250),
                tooltip=p['name'],
                icon=folium.Icon(color="red" if "Thermal" in p['name'] else "darkpurple", icon="crosshairs", prefix="fa")
            ).add_to(m)

    folium.LayerControl().add_to(m)
    plugins.Fullscreen().add_to(m)
    out_path = os.path.join(OUTPUT_DIR, "geophysical_map.html")
    m.save(out_path)
    print(f"Saved: {out_path}")

def build_topographic_map():
    print("Building Topographic Map...")
    m = folium.Map(location=ASTU_CENTER, zoom_start=15, tiles="CartoDB positron")

    boundary = load_data("astu_boundary.geojson")
    if boundary:
        folium.GeoJson(
            boundary,
            name="ASTU Boundary",
            style_function=lambda x: {"color": "#1d4ed8", "weight": 2.5, "fillOpacity": 0.05, "dashArray": "4, 4"}
        ).add_to(m)

    contours = load_data("astu_contours.geojson")
    if contours:
        for f in contours["features"]:
            p = f["properties"]
            is_index = p.get("is_index", False)
            folium.GeoJson(
                f,
                name=f"Contour {p['label']}",
                style_function=lambda x, idx=is_index: {
                    "color": "#b45309" if idx else "#d97706",
                    "weight": 2.5 if idx else 1.2,
                    "opacity": 0.85
                },
                tooltip=f"Elevation: {p['label']}"
            ).add_to(m)

    folium.LayerControl().add_to(m)
    plugins.Fullscreen().add_to(m)
    plugins.MeasureControl(position="topleft").add_to(m)
    out_path = os.path.join(OUTPUT_DIR, "topographic_map.html")
    m.save(out_path)
    print(f"Saved: {out_path}")

if __name__ == "__main__":
    build_campus_map()
    build_geophysical_map()
    build_topographic_map()
    print("All 3 standalone maps generated in python_project/output_maps/!")
