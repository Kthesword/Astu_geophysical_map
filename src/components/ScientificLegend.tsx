import React from 'react';
import { ActiveTab } from '../types';
import { Layers, Info } from 'lucide-react';

interface LegendProps {
  activeTab: ActiveTab;
}

export const ScientificLegend: React.FC<LegendProps> = ({ activeTab }) => {
  if (activeTab === 'report' || activeTab === 'python') return null;

  return (
    <div className="absolute bottom-6 right-4 z-[1000] bg-slate-900/95 backdrop-blur border border-slate-800 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-[260px] pointer-events-auto">
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Scientific Legend</span>
        </span>
        <span className="text-[10px] text-slate-500 font-mono">ASTU-GP</span>
      </div>

      {activeTab === 'campus' && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded border-2 border-blue-600 bg-blue-500/20" />
            <span>ASTU Boundary (152.4 ha)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-sky-600/80 border border-sky-400" />
            <span>Campus Buildings (154)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-slate-400 rounded-full" />
            <span>Internal Roads & Paths (237)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-300/40" />
            <span>Key Academic Landmarks</span>
          </div>
          <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
            Source: OpenStreetMap Way #39378636
          </div>
        </div>
      )}

      {activeTab === 'geophysical' && (
        <div className="space-y-2">
          <div>
            <div className="text-[10px] font-medium text-slate-400 uppercase mb-1">Lithostratigraphy (GSE)</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }} />
                <span>Pn: Nazret Ignimbrite</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: '#78716c' }} />
                <span>Qwb: Wonji Basalt Series</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: '#ec4899' }} />
                <span>Qpr: Boku Rhyolites/Pumice</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: '#ca8a04' }} />
                <span>Qal: Quaternary Alluvium</span>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800">
            <div className="text-[10px] font-medium text-slate-400 uppercase mb-1">Structures & Anomalies</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-red-600 rounded" />
                <span>Wonji Normal Fault (Dip 65°-72°)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-purple-400" />
                <span>Bouguer Gravity Isogals (mGal)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dotted border-emerald-400" />
                <span>EMAG2 Magnetic Anomaly (nT)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Geothermal Springs & Stations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'topographic' && (
        <div className="space-y-2">
          <div className="text-[10px] font-medium text-slate-400 uppercase mb-1">SRTM 30m Elevation</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1.5 bg-amber-700 rounded" />
              <span>Index Contour (20m interval)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-amber-500 rounded" />
              <span>Intermediate Contour (5m)</span>
            </div>
          </div>
          <div className="pt-1.5 border-t border-slate-800">
            <div className="text-[10px] text-slate-400 mb-1">Hypsometric Gradient:</div>
            <div className="h-2 w-full rounded bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>1,644 m</span>
              <span>1,676 m</span>
              <span>1,720 m</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
            <Info className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Click map to sample live elevation</span>
          </div>
        </div>
      )}
    </div>
  );
};
