import React from 'react';
import { ActiveTab, BasemapType } from '../types';
import { 
  Layers, 
  MapPin, 
  Eye, 
  EyeOff, 
  Sliders, 
  Search, 
  Compass, 
  TrendingUp, 
  Activity, 
  Mountain,
  Navigation,
  Globe
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  basemap: BasemapType;
  setBasemap: (b: BasemapType) => void;
  // Layer toggles
  layers: {
    boundary: boolean;
    buildings: boolean;
    roads: boolean;
    landmarks: boolean;
    geology: boolean;
    faults: boolean;
    gravity: boolean;
    magnetic: boolean;
    stations: boolean;
    contours: boolean;
    demTint: boolean;
  };
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  geologyOpacity: number;
  setGeologyOpacity: (op: number) => void;
  // Building search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  buildingCategory: string;
  setBuildingCategory: (c: string) => void;
  // Transect selection
  selectedTransect: string;
  onSelectTransect: (key: string) => void;
  // Cursor probe
  cursorPos: { lat: number; lon: number; elevation: number; slope: number } | null;
  onResetView: () => void;
}

export const SidebarControls: React.FC<SidebarProps> = ({
  activeTab,
  basemap,
  setBasemap,
  layers,
  setLayers,
  geologyOpacity,
  setGeologyOpacity,
  searchQuery,
  setSearchQuery,
  buildingCategory,
  setBuildingCategory,
  selectedTransect,
  onSelectTransect,
  cursorPos,
  onResetView
}) => {
  const toggleLayer = (key: string) => {
    setLayers((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-200 shrink-0 z-20 overflow-y-auto">
      {/* Top Header & Reset View */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>GIS Layer Controls</span>
        </div>
        <button
          onClick={onResetView}
          className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded border border-slate-700 transition-colors"
          title="Recenter view on ASTU Campus"
        >
          <Navigation className="w-3 h-3 text-blue-400" />
          <span>Center ASTU</span>
        </button>
      </div>

      <div className="p-3.5 space-y-4 flex-1">
        {/* Basemap Selector */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Base Layer</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setBasemap('positron')}
              className={`py-1.5 px-2 rounded font-medium transition-colors ${
                basemap === 'positron' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Positron
            </button>
            <button
              onClick={() => setBasemap('osm')}
              className={`py-1.5 px-2 rounded font-medium transition-colors ${
                basemap === 'osm' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              OSM Streets
            </button>
            <button
              onClick={() => setBasemap('satellite')}
              className={`py-1.5 px-2 rounded font-medium transition-colors ${
                basemap === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* TAB SPECIFIC CONTROLS */}

        {/* 1. CAMPUS MAP CONTROLS */}
        {activeTab === 'campus' && (
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Campus Infrastructure
            </div>

            {/* Building search & filter */}
            <div className="space-y-1.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 154 campus buildings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category pill-like filter */}
              <div className="flex flex-wrap gap-1 text-[11px]">
                {['all', 'academic', 'admin', 'services'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBuildingCategory(cat)}
                    className={`px-2 py-0.5 rounded capitalize transition-colors ${
                      buildingCategory === cat
                        ? 'bg-slate-700 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle checkboxes */}
            <div className="space-y-2 pt-1 border-t border-slate-800 text-xs">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">ASTU Boundary (152.4 ha)</span>
                <input
                  type="checkbox"
                  checked={layers.boundary}
                  onChange={() => toggleLayer('boundary')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Campus Buildings (154)</span>
                <input
                  type="checkbox"
                  checked={layers.buildings}
                  onChange={() => toggleLayer('buildings')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Internal Roads & Paths (237)</span>
                <input
                  type="checkbox"
                  checked={layers.roads}
                  onChange={() => toggleLayer('roads')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Academic Key Landmarks</span>
                <input
                  type="checkbox"
                  checked={layers.landmarks}
                  onChange={() => toggleLayer('landmarks')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>
            </div>
          </div>
        )}

        {/* 2. GEOPHYSICAL CONTROLS */}
        {activeTab === 'geophysical' && (
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Geological & Geophysical Layers
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">GSE Formations (Pn, Qwb, Qpr, Qal)</span>
                <input
                  type="checkbox"
                  checked={layers.geology}
                  onChange={() => toggleLayer('geology')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>

              {layers.geology && (
                <div className="pl-2 pr-1 pt-1 pb-2">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Formation Opacity</span>
                    <span className="font-mono">{Math.round(geologyOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.05"
                    value={geologyOpacity}
                    onChange={(e) => setGeologyOpacity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              )}

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Wonji Fault Belt (Normal Faults)</span>
                <input
                  type="checkbox"
                  checked={layers.faults}
                  onChange={() => toggleLayer('faults')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Bouguer Gravity Isogals (WGM2012)</span>
                <input
                  type="checkbox"
                  checked={layers.gravity}
                  onChange={() => toggleLayer('gravity')}
                  className="rounded border-slate-700 bg-slate-800 text-purple-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Magnetic Anomaly Contours (EMAG2)</span>
                <input
                  type="checkbox"
                  checked={layers.magnetic}
                  onChange={() => toggleLayer('magnetic')}
                  className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Field Stations & Thermal Springs</span>
                <input
                  type="checkbox"
                  checked={layers.stations}
                  onChange={() => toggleLayer('stations')}
                  className="rounded border-slate-700 bg-slate-800 text-red-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">ASTU Campus Outline</span>
                <input
                  type="checkbox"
                  checked={layers.boundary}
                  onChange={() => toggleLayer('boundary')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>
            </div>
          </div>
        )}

        {/* 3. TOPOGRAPHIC CONTROLS */}
        {activeTab === 'topographic' && (
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Digital Elevation Model (DEM)
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">SRTM 5m / 10m Contours</span>
                <input
                  type="checkbox"
                  checked={layers.contours}
                  onChange={() => toggleLayer('contours')}
                  className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">Hypsometric Shading Overlay</span>
                <input
                  type="checkbox"
                  checked={layers.demTint}
                  onChange={() => toggleLayer('demTint')}
                  className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-slate-300 group-hover:text-white">ASTU Campus Boundary</span>
                <input
                  type="checkbox"
                  checked={layers.boundary}
                  onChange={() => toggleLayer('boundary')}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-0"
                />
              </label>
            </div>

            {/* Topographic Transect Selector */}
            <div className="pt-2 border-t border-slate-800">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Cross-Section Profiles</span>
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => onSelectTransect('astu-ew')}
                  className={`w-full text-left p-2 rounded transition-colors border ${
                    selectedTransect === 'astu-ew'
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs">Transect A-A' (ASTU E-W)</div>
                  <div className="text-[10px] text-slate-400">West gate to East campus athletic ring (1,240m)</div>
                </button>

                <button
                  onClick={() => onSelectTransect('wonji-fault')}
                  className={`w-full text-left p-2 rounded transition-colors border ${
                    selectedTransect === 'wonji-fault'
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs">Transect B-B' (Wonji Fault Scarp)</div>
                  <div className="text-[10px] text-slate-400">Adama Graben normal fault step (1,850m)</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Cursor & Probe Panel */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs">
        <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1.5">
          <span className="flex items-center gap-1 text-blue-400">
            <Compass className="w-3 h-3" />
            <span>Elevation & Spatial Probe</span>
          </span>
          <span className="text-[9px] text-slate-500 font-mono">SRTM 30m</span>
        </div>

        {cursorPos ? (
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500 font-sans">Elevation:</span>
              <span className="font-bold text-amber-400">{cursorPos.elevation} m a.s.l.</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500 font-sans">Slope Gradient:</span>
              <span className="text-sky-400">{cursorPos.slope}%</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span className="text-slate-500 font-sans">Coordinates:</span>
              <span>{cursorPos.lat.toFixed(4)}°N, {cursorPos.lon.toFixed(4)}°E</span>
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 py-1 italic">
            Move mouse or click on map to sample real SRTM elevation.
          </div>
        )}
      </div>
    </aside>
  );
};
