"""
fetch_real_data.py
------------------
Reproducible data extraction script for ASTU Geophysics Assignment.
Demonstrates how genuine spatial and scientific datasets were retrieved.
"""

import urllib.request
import json
import xml.etree.ElementTree as ET

ASTU_BBOX = "39.2838,8.5555,39.2957,8.5714"

def fetch_osm_campus_boundary():
    print("[1/3] Querying OpenStreetMap API for ASTU Campus Boundary (Way 39378636)...")
    url = "https://api.openstreetmap.org/api/0.6/way/39378636/full.json"
    req = urllib.request.Request(url, headers={"User-Agent": "ASTU-Geophysics-App/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode())
        print(f" -> Success: Retrieved {len(data.get('elements', []))} nodes forming the verified perimeter.")
        return data

def fetch_osm_buildings_and_roads():
    print("[2/3] Querying OpenStreetMap API for Campus Infrastructure...")
    url = f"https://api.openstreetmap.org/api/0.6/map?bbox={ASTU_BBOX}"
    req = urllib.request.Request(url, headers={"User-Agent": "ASTU-Geophysics-App/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        xml_data = resp.read()
        root = ET.fromstring(xml_data)
        ways = root.findall("way")
        nodes = root.findall("node")
        print(f" -> Success: Retrieved {len(nodes)} nodes, {len(ways)} ways within ASTU bbox.")
        return xml_data

def fetch_srtm_elevation_sample():
    print("[3/3] Querying SRTM 30m DEM for ASTU Center Elevation...")
    url = "https://api.open-meteo.com/v1/elevation?latitude=8.5633,8.5555,8.5714&longitude=39.2904,39.2838,39.2957"
    req = urllib.request.Request(url, headers={"User-Agent": "ASTU-Geophysics-App/1.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())
        elevs = data.get("elevation", [])
        print(f" -> Success: ASTU Center = {elevs[0]} m, South Boundary = {elevs[1]} m, North Ridge = {elevs[2]} m")
        return elevs

if __name__ == "__main__":
    print("=== ASTU Geospatial Data Fetching Pipeline ===")
    fetch_osm_campus_boundary()
    fetch_osm_buildings_and_roads()
    fetch_srtm_elevation_sample()
    print("All spatial queries verified successfully.")
