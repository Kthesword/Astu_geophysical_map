import React from 'react';
import { X, Layers, Activity, Mountain, Info, Compass, ShieldAlert } from 'lucide-react';

interface FeatureDetailProps {
  feature: any;
  onClose: () => void;
}

export const FeatureDetailModal: React.FC<FeatureDetailProps> = ({ feature, onClose }) => {
  if (!feature) return null;

  const { type, properties } = feature;

  return (
    <div className="absolute top-16 left-4 z-[1000] w-84 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 text-slate-100 shadow-2xl animate-in fade-in slide-in-from-left duration-200 pointer-events-auto">
      <div className="flex items-start justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {type === 'building' && <Layers className="w-4 h-4 text-sky-400" />}
          {type === 'geology' && <Mountain className="w-4 h-4 text-amber-400" />}
          {type === 'fault' && <Activity className="w-4 h-4 text-red-400" />}
          {type === 'station' && <Compass className="w-4 h-4 text-purple-400" />}
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {type === 'building' && 'Campus Building'}
            {type === 'geology' && 'Lithostratigraphic Unit'}
            {type === 'fault' && 'Wonji Fault Belt Segment'}
            {type === 'station' && 'Geophysical Field Station'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2.5 text-xs">
        {/* Building Details */}
        {type === 'building' && (
          <>
            <div>
              <div className="text-sm font-bold text-white">{properties.name || 'ASTU University Facility'}</div>
              <div className="text-[11px] text-slate-400 capitalize">Type: {properties.building_type || 'Academic / Infrastructure'}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">Levels / Floors</span>
                <span className="font-semibold text-slate-200">{properties.levels || '1 - 3 stories'}</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">OSM Entity ID</span>
                <span className="font-mono text-slate-300">#{properties.id}</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Verified ground polygon mapped via OpenStreetMap cadastral database within the 152.4 ha ASTU perimeter.
            </div>
          </>
        )}

        {/* Geological Unit */}
        {type === 'geology' && (
          <>
            <div>
              <div className="text-sm font-bold text-white">{properties.name}</div>
              <div className="text-[11px] text-amber-400 font-mono">Code: {properties.unit_code} · {properties.period}</div>
            </div>
            <div className="text-slate-300 text-[11px] leading-relaxed">
              <b>Lithology:</b> {properties.lithology}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 font-mono">
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Density (ρ)</span>
                <span className="font-semibold text-slate-200">{properties.density_gcc} g/cm³</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Mag. Suscept. (χ)</span>
                <span className="font-semibold text-slate-200">{properties.mag_susceptibility_si} SI</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-800">
              <b>Engineering & Geophysics:</b> {properties.description}
            </div>
          </>
        )}

        {/* Fault Details */}
        {type === 'fault' && (
          <>
            <div>
              <div className="text-sm font-bold text-red-400">{properties.name}</div>
              <div className="text-[11px] text-slate-400">{properties.system} · {properties.type}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">Strike / Trend</span>
                <span className="font-semibold text-slate-200">{properties.trend}</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">Dip Geometry</span>
                <span className="font-semibold text-slate-200">{properties.dip_angle} {properties.dip_dir}</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">Scarp Throw</span>
                <span className="font-semibold text-slate-200">~{properties.scarp_height_m} meters</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded">
                <span className="text-[10px] text-slate-400 uppercase block">Slip Rate</span>
                <span className="font-semibold text-slate-200">{properties.slip_rate_mm_yr}</span>
              </div>
            </div>
            <div className="text-[11px] text-amber-300/90 flex items-start gap-1.5 bg-amber-950/30 p-2 rounded border border-amber-900/40">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Active Quaternary extensional fault line controlling local groundwater circulation and seismic hazard.</span>
            </div>
          </>
        )}

        {/* Station Details */}
        {type === 'station' && (
          <>
            <div>
              <div className="text-sm font-bold text-purple-300">{properties.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">ID: {properties.id} · Elevation: {properties.elevation_m} m</div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Bouguer Gravity:</span>
                <span className="font-semibold text-white">{properties.bouguer_mgal} mGal</span>
              </div>
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Residual Gravity Anomaly:</span>
                <span className="font-semibold text-emerald-400">+{properties.residual_gravity_mgal} mGal</span>
              </div>
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Total Magnetic Field:</span>
                <span className="font-semibold text-white">{properties.magnetic_total_nt} nT</span>
              </div>
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Magnetic Anomaly:</span>
                <span className="font-semibold text-sky-400">{properties.magnetic_anomaly_nt > 0 ? `+${properties.magnetic_anomaly_nt}` : properties.magnetic_anomaly_nt} nT</span>
              </div>
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Apparent Resistivity:</span>
                <span className="font-semibold text-amber-400">{properties.app_resistivity_ohm_m} Ω·m</span>
              </div>
              <div className="flex justify-between bg-slate-800/50 p-1.5 rounded">
                <span className="text-slate-400 font-sans">Geothermal Heat Flow:</span>
                <span className="font-semibold text-rose-400">{properties.heat_flow_mw_m2} mW/m²</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              <div className="font-semibold text-slate-300 mb-0.5">Instrumentation:</div>
              {properties.instrument}
              <div className="mt-1 text-[10px] text-slate-500">{properties.notes}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
