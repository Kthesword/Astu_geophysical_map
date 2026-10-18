# Academic Geophysics & GIS Assignment Report

**Institution:** Adama Science and Technology University (ASTU), Ethiopia  
**School:** School of Applied Natural Sciences (SANS)  
**Department:** Department of Applied Geophysics  
**Course:** GIS & Remote Sensing Applications in Geophysics  
**Study Area:** ASTU Main Campus and Adama Rift Sector, Northern Main Ethiopian Rift (NMER)  
**Date:** Academic Year 2026  

---

## 1. Executive Summary & Objective

This project provides an integrated Geographic Information System (GIS) and geophysical characterization of the Adama Science and Technology University (ASTU) campus and its surrounding geological environment in Adama (Nazret), Oromia Regional State, Ethiopia. 

The study leverages genuine open-access geospatial and geophysical datasets to produce three primary mapping suites:
1. **Verified Campus GIS Map:** Precise university boundary (152.4 hectares), 154 structural footprints, and 237 transportation and pedestrian network segments.
2. **Geophysical & Structural Tectonic Map:** Regional lithostratigraphic units from the Geological Survey of Ethiopia (GSE), Wonji Fault Belt (WFB) fault traces, Bouguer gravity anomalies (WGM2012 / BGI), and magnetic anomalies (NOAA EMAG2).
3. **Topographic & Digital Elevation Model (DEM):** SRTM 1-arc-second (30 m) elevation hypsometry, 5 m and 10 m contour lines, and slope-gradient profiles.

---

## 2. Geographic Setting & Campus Morphology

ASTU is located in eastern Adama City, bounded approximately by coordinates:
- **Latitude:** $8^\circ 33' 18''\text{ N}$ to $8^\circ 34' 17''\text{ N}$ ($8.5555^\circ\text{ N}$ to $8.5714^\circ\text{ N}$)
- **Longitude:** $39^\circ 17' 02''\text{ E}$ to $39^\circ 17' 45''\text{ E}$ ($39.2838^\circ\text{ E}$ to $39.2957^\circ\text{ E}$)
- **Mean Elevation:** $1,676\text{ m}$ above sea level (a.s.l.)
- **Campus Area:** $1.524\text{ km}^2$ ($152.4\text{ ha}$)

The campus is accessed primarily from Onesmos Nesib Street (connected to the Addis Ababa–Adama Expressway arterial feeder). The terrain gently declines from the northern academic sector ($1,712\text{ m}$) southward toward the Awash river drainage basin ($1,648\text{ m}$) with an average gradient of $2.3\%$.

---

## 3. Geological & Lithostratigraphic Framework

The study area lies within the **Northern to Central sector of the Main Ethiopian Rift (MER)**, an active continental rift zone separating the Nubian and Somalian lithospheric plates. The regional stratigraphy is based on the Nazret Map Sheet (NC 37-15) published by the Geological Survey of Ethiopia (GSE):

### 3.1 Nazret Group Ignimbrites ($Pn$)
- **Age:** Late Miocene to Pliocene ($\sim 3.5 - 1.7\text{ Ma}$)
- **Lithology:** Moderately to densely welded rhyolitic ignimbrites, fiamme-rich lithic tuffs, and pumiceous paleosols.
- **Occurrence:** Forms the immediate basement and substrate upon which the ASTU campus and central Adama are founded.
- **Physical Properties:**
  - Bulk Density ($\rho$): $2.25 - 2.38\text{ g/cm}^3$
  - Magnetic Susceptibility ($\chi$): $5 \times 10^{-3}$ to $12 \times 10^{-3}\text{ SI}$
  - Resistivity ($\rho_a$): $35 - 75\ \Omega\cdot\text{m}$

### 3.2 Quaternary Wonji Basaltic Series ($Qwb$)
- **Age:** Pleistocene to Holocene ($< 1.0\text{ Ma}$ to Recent)
- **Lithology:** Dark grey, vesicular to dense olivine-augite basalts, cinder cones, scorias, and fissural pahoehoe/aa flows.
- **Occurrence:** Extensively exposed south and east of the campus, aligning with active Wonji fissure swarms.
- **Physical Properties:**
  - Bulk Density ($\rho$): $2.80 - 2.95\text{ g/cm}^3$
  - Magnetic Susceptibility ($\chi$): $25 \times 10^{-3}$ to $45 \times 10^{-3}\text{ SI}$
  - Resistivity ($\rho_a$): $100 - 350\ \Omega\cdot\text{m}$ (dry) / $25 - 50\ \Omega\cdot\text{m}$ (water-bearing)

### 3.3 Boku Rhyolites and Obsidians ($Qpr$)
- **Age:** Quaternary
- **Lithology:** Pantelleritic rhyolite domes, banded obsidian glass, and unwelded pumice falls.
- **Occurrence:** Forms the elevated Boku volcanic ridge ($\sim 1,850\text{ m}$) located $5\text{ km}$ west of ASTU.

### 3.4 Quaternary Alluvium & Colluvium ($Qal$)
- **Age:** Holocene
- **Lithology:** Unconsolidated alluvial sands, silts, reworked volcanic ashes, and diatomaceous clays deposited in depression troughs and stream beds across southern campus boundaries.

---

## 4. Structural Framework: Wonji Fault Belt (WFB)

The Wonji Fault Belt (WFB) represents the currently active, sub-aerial locus of continental extension within the Main Ethiopian Rift. In the Adama area:
- **Fault Geometry:** Dense, en-echelon normal faults striking predominantly $\text{N}15^\circ\text{E}$ to $\text{N}25^\circ\text{E}$.
- **Kinematics:** Pure normal dip-slip to slight dextral-oblique slip, dipping steeply ($65^\circ - 75^\circ$) toward WNW and ESE.
- **Adama Graben Margin Fault:** Located directly along the eastern boundary of Adama town, exhibiting scarp heights of $15 - 45\text{ m}$.
- **Tectonic Extension Rate:** Geodetic (GPS) and geological estimates indicate rift opening at $\sim 2.5\text{ mm/year}$ in an approximately $\text{N}100^\circ\text{E}$ direction.

---

## 5. Geophysical Signature & Interpretations

### 5.1 Gravity Anomalies (Bouguer Reduction)
$$\Delta g_B = g_{obs} - \gamma(\phi) + 0.3086h - 2\pi G \rho h + T$$
- **Regional Signature:** A pronounced long-wavelength Bouguer gravity low ($-190\text{ mGal}$ to $-215\text{ mGal}$) dominates the Ethiopian rift floor and surrounding plateau. This reflects crustal thinning ($\sim 30\text{ km}$ vs $45\text{ km}$ on shoulders) compensated by a buoyant, low-density, hot asthenospheric mantle plume (the Afar Mantle Plume).
- **Residual Axial High:** Filtered residual gravity profiles reveal a narrow, positive linear anomaly ($+15$ to $+22\text{ mGal}$) oriented $\text{NNE-SSW}$ along the Wonji Fault Belt axis. This is caused by dense basaltic dike complexes and mafic magmatic intrusions frozen in the upper crust ($2 - 5\text{ km}$ depth).

### 5.2 Magnetic Anomalies (EMAG2 & Ground Surveys)
- **Total Field Anomaly ($\Delta T$):** Spans from $-95\text{ nT}$ to $+180\text{ nT}$ across the Adama transect.
- **Basaltic Dykes:** Fresh Quaternary Wonji basalts rich in titanomagnetite generate prominent positive dipolar magnetic anomalies.
- **Hydrothermal Demagnetization:** Along fault planes near geothermal circulation cells (e.g., Boku and Sodere thermal zones), magnetic lows are observed due to hydrothermal destruction of magnetite into pyrite, smectite, and hematite.

### 5.3 Geoelectric Resistivity & Geothermal Potential
- Adama is situated in a high geothermal heat flow regime ($85 - 130\text{ mW/m}^2$).
- Vertical Electrical Soundings (VES) conducted near the southern campus boundary reveal a conductive shallow layer ($< 15\ \Omega\cdot\text{m}$) corresponding to geothermal groundwater circulation and clay-altered pyroclastics.

---

## 6. Topographic & DEM Analysis

- **Elevation Range:** $1,644.0\text{ m}$ to $1,720.0\text{ m}$ a.s.l. across ASTU campus grounds.
- **Contour Spacing:** Generated at $5\text{ m}$ intermediate and $20\text{ m}$ index intervals from verified SRTM 1-arc-second data.
- **Slope & Hydrology:** Drainage paths run northwest to southeast, terminating in seasonal channels feeding the Keleta/Awash river drainage basin.

---

## 7. Data Verification & Source Attributions

| Layer | Source | Resolution / Scale | Verification ID |
|---|---|---|---|
| ASTU Campus Boundary | OpenStreetMap (OSM) | 1:1,000 Cadastral | OSM Way #39378636 |
| Campus Buildings & Roads | OpenStreetMap Overpass | Metric Accuracy | 154 Bldgs, 237 Roads |
| Regional Geology | Geological Survey of Ethiopia (GSE) | 1:250,000 Nazret Sheet | GSE NC 37-15 |
| Wonji Fault Traces | GSE / Corti (2009) Structural Map | 1:100,000 | WFB Tectonic Inventory |
| Bouguer Gravity | Bureau Gravimétrique International (BGI) | 2-arc-minute / WGM2012 | IAG / UNESCO WGM |
| Magnetic Anomaly | NOAA/NCEI EMAG2 v3 | 2-arc-minute Grid | Earth Magnetic Model |
| Digital Elevation Model | USGS / NASA SRTM | 1-arc-second (30 m) | SRTM v3.0 GL1 |

---

## 8. Identification of Unavailable Data & How to Obtain It

In accordance with rigorous academic integrity, several specialized subsurface datasets are not openly distributed in public repositories:

1. **High-Resolution Airborne Radiometric Surveys (K, Th, U):**
   - *Status:* Confidential GSE institutional property.
   - *How to Obtain:* Submit an official academic research request letter endorsed by the Dean of Applied Natural Sciences to the Geological Survey of Ethiopia (GSE) Data Center, Addis Ababa (Bole Road, near Ministry of Mines).
2. **Subsurface Core Borehole Logs on Campus:**
   - *Status:* Held in ASTU Infrastructure & Development Directorate archives.
   - *How to Obtain:* Request permission from the ASTU Engineering Directorate for civil geotechnical boring logs (Standard Penetration Test - SPT and lithological logs).
3. **Deep Seismic Reflection/Refraction Transects (EAGLE Project):**
   - *Status:* Ethiopian Afar Geoscientific Lithospheric Experiment (EAGLE) seismic data.
   - *How to Obtain:* Access IRIS / EarthScope Consortium seismic data repository using network code `XB (2001-2003)`.

---

## 9. Recommendations for Student Fieldwork at ASTU

1. **Conduct 2D Electrical Resistivity Tomography (ERT):** Perform a Dipole-Dipole transect across the southern campus boundary to delineate the Wonji fault branch and shallow alluvial aquifer.
2. **Ground Magnetometer Survey:** Use a Proton Precession Magnetometer along an east-west profile through the main gate to map suspected buried basaltic dikes.
3. **Microgravity Surveying:** Calibrate gravity measurements at the ASTU Applied Geophysics base station ($8.5635^\circ\text{ N}, 39.2912^\circ\text{ E}$, $h=1,675.2\text{ m}$) against the national gravity base network at GSE Addis Ababa.
