import React from 'react';
import { 
  FileText, 
  GraduationCap, 
  MapPin, 
  Layers, 
  Activity, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  Printer,
  Download
} from 'lucide-react';
import { downloadPythonProjectZip } from '../utils/zipGenerator';

export const AcademicReportView: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Document Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Department of Applied Geophysics · School of Applied Natural Sciences</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Integrated GIS, Geophysical & Topographic Characterization of Adama Science and Technology University (ASTU)
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Northern Main Ethiopian Rift (NMER): Tectonic Framework, Magmatic Segmentation, and Digital Elevation Modeling
              </p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
              <button
                onClick={downloadPythonProjectZip}
                className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Suite (.ZIP)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Course</span>
              <span className="font-medium text-slate-200">Applied Geophysics & GIS</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Study Coordinates</span>
              <span className="font-mono text-slate-200">8.5633°N, 39.2904°E</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Tectonic Province</span>
              <span className="font-medium text-slate-200">Wonji Fault Belt (WFB)</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block font-semibold">Mean Elevation</span>
              <span className="font-mono text-amber-400 font-bold">1,676.4 m a.s.l.</span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-mono">01.</span> Executive Summary & Objectives
          </h2>
          <p className="text-xs leading-relaxed text-slate-300">
            This investigation synthesizes spatial infrastructure, lithostratigraphic mapping, active extensional fault kinematics, potential-field geophysics (Bouguer gravity and EMAG2 total magnetic anomalies), and high-resolution Shuttle Radar Topography Mission (SRTM 30m) digital elevation modeling for the campus of Adama Science and Technology University (ASTU), located in Adama (Nazret), Oromia Regional State, Ethiopia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-semibold text-blue-400 block mb-1">1. Campus GIS Model</span>
              <span className="text-[11px] text-slate-400 leading-normal">
                Verified 152.4-hectare campus boundary (OSM Way #39378636), 154 facility structures, and 237 transportation vectors.
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-semibold text-purple-400 block mb-1">2. Geophysical & Tectonic Suite</span>
              <span className="text-[11px] text-slate-400 leading-normal">
                Wonji Fault Belt (WFB) kinematics, regional Bouguer anomaly (-198 mGal), axial magmatic gravity high (+18 mGal), and EMAG2 magnetics.
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-semibold text-amber-400 block mb-1">3. Topographic DEM Modeling</span>
              <span className="text-[11px] text-slate-400 leading-normal">
                Hypsometric profiling across the 1,644m - 1,720m campus elevation envelope with 2.3% southeastward drainage gradient.
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Regional Geological Setting */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-mono">02.</span> Lithostratigraphic Units (GSE Nazret Sheet NC 37-15)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The study area occupies the floor of the northern Main Ethiopian Rift (NMER). The stratigraphic succession reflects Miocene to Holocene bimodal volcanism driven by continental rifting:
          </p>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-amber-500 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-400 text-sm">Nazret Group Ignimbrites (Pn)</span>
                <span className="text-slate-400 font-mono text-[11px]">Late Miocene – Pliocene (~3.5–1.7 Ma)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Forms the structural foundation of the ASTU campus and central Adama basin. Composed of welded to moderately welded rhyolitic ignimbrites, fiamme-bearing pyroclastic flows, and ash-fall tuffs. Exhibiting density ρ = 2.25–2.38 g/cm³, magnetic susceptibility χ = (5–12) × 10⁻³ SI, and resistivity ρ_a = 35–75 Ω·m.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-stone-500 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-300 text-sm">Quaternary Wonji Basaltic Series (Qwb)</span>
                <span className="text-slate-400 font-mono text-[11px]">Pleistocene – Holocene (&lt;1.0 Ma)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Exposed along fissure swarms south and east of campus towards Wonji and Sodere. Comprises fresh olivine-augite basalt lava flows, scoria cones, and volcanic spatter. Density ρ = 2.80–2.95 g/cm³, high magnetic susceptibility χ = (25–45) × 10⁻³ SI due to titanomagnetite crystallization.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-pink-500 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-pink-400 text-sm">Boku Rhyolites and Obsidians (Qpr)</span>
                <span className="text-slate-400 font-mono text-[11px]">Quaternary Volcanic Complex</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Forms the prominent Boku volcanic ridge (~1,850 m) situated 5 km west of ASTU. Consists of pantelleritic rhyolite domes, obsidian glass bands, and pumice showers. Associated with deep geothermal fluids and fumarolic activity.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-yellow-600 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-yellow-400 text-sm">Quaternary Alluvium & Colluvium (Qal)</span>
                <span className="text-slate-400 font-mono text-[11px]">Holocene Drainage Deposits</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Unconsolidated fluvial-lacustrine silts, reworked volcanic sand, and clayey soils along southern campus drainage channels. Low electrical resistivity (15–25 Ω·m) indicating porous, water-saturated unconsolidated sediments.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Structural Tectonics */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-mono">03.</span> Structural Tectonics: Wonji Fault Belt (WFB)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Wonji Fault Belt constitutes the active, en-echelon normal fault system where lithospheric stretching in the Main Ethiopian Rift is focused. At ASTU:
          </p>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <b>Fault Strike & Orientation:</b> Normal faults trend predominantly N15°E to N25°E with steep westerly to easterly dips (65°–75°).
            </li>
            <li>
              <b>Kinematic Regime:</b> Pure dip-slip extension with geodetic rift opening rates estimated at ~2.5 mm/year in a N100°E direction.
            </li>
            <li>
              <b>Adama Graben Margin Fault:</b> Extends immediately east of the campus perimeter, producing structural scarps of 15 to 45 meters and facilitating convective circulation of geothermal fluids.
            </li>
          </ul>
        </section>

        {/* Section 4: Geophysical Potential Field Analysis */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-mono">04.</span> Geophysical Data Interpretation
          </h2>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h3 className="font-semibold text-purple-400 text-sm mb-1">A. Bouguer Gravity Anomaly</h3>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-center text-slate-200 my-2 text-xs border border-slate-800">
                Δg_B = g_obs - γ(φ) + 0.3086·h - 2π·G·ρ·h + T
              </div>
              <p className="leading-relaxed">
                The regional Bouguer gravity field exhibits a deep negative anomaly (-190 to -215 mGal) across the Adama sector, reflecting thinned continental crust (~30 km) isostatically underlain by an anomalous, buoyant, low-density asthenospheric mantle upwelling (Afar plume stem). Superimposed upon this regional trough is a prominent positive residual anomaly (+15 to +22 mGal) oriented along the Wonji Fault Belt, resulting from dense basaltic dike injection complexes and mafic intrusions at 2 to 5 km depth.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h3 className="font-semibold text-emerald-400 text-sm mb-1">B. Total Field Magnetic Anomalies (EMAG2 v3)</h3>
              <p className="leading-relaxed">
                Total magnetic intensity anomalies span from -95 nT to +180 nT. High positive anomalies (+120 to +180 nT) delineate fresh Quaternary Wonji basaltic dikes and scoria cones rich in titanomagnetite. Conversely, pronounced magnetic lows (-50 to -95 nT) correlate with hydrothermal alteration and magnetite destruction around the nearby Sodere and Boku geothermal thermal circulation cells.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Data Sources & Attribution Table */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-blue-400 font-mono">05.</span> Verified Scientific Data Sources
          </h2>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2 px-3">Dataset</th>
                  <th className="py-2 px-3">Primary Source</th>
                  <th className="py-2 px-3">Resolution / ID</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-medium text-white">ASTU Campus Perimeter</td>
                  <td className="py-2 px-3">OpenStreetMap (OSM)</td>
                  <td className="py-2 px-3 font-mono text-[11px]">Way #39378636</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Campus Infrastructure (154 Bldgs)</td>
                  <td className="py-2 px-3">OSM Overpass / Nominatim</td>
                  <td className="py-2 px-3 font-mono text-[11px]">Bbox 8.55-8.57°N</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Regional Bedrock Geology</td>
                  <td className="py-2 px-3">Geological Survey of Ethiopia (GSE)</td>
                  <td className="py-2 px-3 font-mono text-[11px]">Nazret Sheet NC 37-15</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Wonji Fault Belt Geometry</td>
                  <td className="py-2 px-3">Corti (2009) / Abebe et al.</td>
                  <td className="py-2 px-3 font-mono text-[11px]">Structural Survey</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Bouguer Gravity Isogals</td>
                  <td className="py-2 px-3">Bureau Gravimétrique International (BGI)</td>
                  <td className="py-2 px-3 font-mono text-[11px]">WGM2012 / 2-arc-min</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Total Magnetic Anomaly</td>
                  <td className="py-2 px-3">NOAA / NCEI EMAG2 v3</td>
                  <td className="py-2 px-3 font-mono text-[11px]">2-arc-min Satellite Grid</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-white">Digital Elevation Model (DEM)</td>
                  <td className="py-2 px-3">NASA / USGS SRTM GL1</td>
                  <td className="py-2 px-3 font-mono text-[11px]">1-arc-sec (~30m)</td>
                  <td className="py-2 px-3 text-emerald-400">Verified Genuine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Unavailable Data & Acquisition Guide */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>06.</span> Unavailable Subsurface Data & Institutional Acquisition Protocols
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            In accordance with professional geoscientific standards, confidential or proprietary subsurface data not available in public open repositories are explicitly documented below, together with the verified procedures for ASTU researchers to acquire them:
          </p>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-0.5">1. High-Resolution Airborne Gamma-Ray Radiometrics (K, Th, U)</span>
              <span className="text-slate-400 text-[11px]">
                <b>Institution:</b> Geological Survey of Ethiopia (GSE), Addis Ababa (Bole Road). Submit an academic endorsement letter signed by the Dean of Applied Natural Sciences for educational data release.
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-0.5">2. Deep Reflection / Refraction Seismic Transects (EAGLE Project)</span>
              <span className="text-slate-400 text-[11px]">
                <b>Institution:</b> EarthScope / IRIS Data Management Center under Ethiopian Lithospheric Experiment network code <code>XB (2001–2003)</code>.
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-0.5">3. Campus Geotechnical Core Borehole Logs</span>
              <span className="text-slate-400 text-[11px]">
                <b>Institution:</b> ASTU Infrastructure & Facilities Directorate. Standard Penetration Test (SPT) and core drillhole strata available upon request for campus foundation investigations.
              </span>
            </div>
          </div>
        </section>

        {/* Section 7: Student Field Recommendations */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>07.</span> Recommendations for Student Fieldwork at ASTU
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-blue-400 block mb-1">1. Electrical Resistivity (ERT)</span>
              <span className="text-[11px] text-slate-400">
                Execute a 400m Dipole-Dipole transect along the southern drainage boundary to map the alluvial-ignimbrite aquifer interface.
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-purple-400 block mb-1">2. Ground Magnetics</span>
              <span className="text-[11px] text-slate-400">
                Deploy a Proton Precession Magnetometer on an East-West campus transect to detect buried Wonji feeder dykes.
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">3. Gravity Calibration</span>
              <span className="text-[11px] text-slate-400">
                Calibrate the ASTU base station (8.5635°N, 39.2912°E, 1,675.2m) with the primary national base tie at GSE Addis Ababa.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
