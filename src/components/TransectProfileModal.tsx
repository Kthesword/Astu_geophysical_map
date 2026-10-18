import React from 'react';
import { X, TrendingUp, Compass, ArrowRight } from 'lucide-react';

interface TransectProfileProps {
  transectName: string;
  profile: Array<{ distanceMeters: number; elevation: number; lat: number; lon: number }>;
  onClose: () => void;
}

export const TransectProfileModal: React.FC<TransectProfileProps> = ({
  transectName,
  profile,
  onClose
}) => {
  if (!profile || profile.length === 0) return null;

  const elevations = profile.map(p => p.elevation);
  const minElev = Math.min(...elevations);
  const maxElev = Math.max(...elevations);
  const relief = maxElev - minElev;
  const totalDistance = profile[profile.length - 1].distanceMeters;
  const meanElev = Math.round((elevations.reduce((a, b) => a + b, 0) / elevations.length) * 10) / 10;
  const avgSlope = Math.round((relief / (totalDistance || 1)) * 100 * 10) / 10;

  // Chart dimensions
  const width = 520;
  const height = 150;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const yMin = Math.floor(minElev / 10) * 10 - 5;
  const yMax = Math.ceil(maxElev / 10) * 10 + 5;
  const yRange = yMax - yMin || 1;

  // SVG points
  const points = profile.map(p => {
    const x = padLeft + (p.distanceMeters / (totalDistance || 1)) * plotW;
    const y = padTop + plotH - ((p.elevation - yMin) / yRange) * plotH;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padLeft},${padTop + plotH} ${points} ${padLeft + plotW},${padTop + plotH}`;

  return (
    <div className="absolute bottom-6 left-4 z-[1000] w-[560px] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 text-slate-100 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200 pointer-events-auto">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Topographic Cross-Section Profile: {transectName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Metrics */}
      <div className="grid grid-cols-4 gap-2 my-2.5 text-xs">
        <div className="bg-slate-800/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">Distance</span>
          <span className="font-semibold text-slate-100 font-mono">{totalDistance} m</span>
        </div>
        <div className="bg-slate-800/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">Min / Max Elev</span>
          <span className="font-semibold text-emerald-400 font-mono">{minElev}m / {maxElev}m</span>
        </div>
        <div className="bg-slate-800/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">Relief Δh</span>
          <span className="font-semibold text-amber-400 font-mono">{Math.round(relief * 10) / 10} m</span>
        </div>
        <div className="bg-slate-800/60 p-2 rounded border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">Mean Slope</span>
          <span className="font-semibold text-sky-400 font-mono">{avgSlope}%</span>
        </div>
      </div>

      {/* SVG Elevation Graph */}
      <div className="bg-slate-950/70 rounded-lg p-2 border border-slate-800/80">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[yMin, (yMin + yMax) / 2, yMax].map((yVal, idx) => {
            const yPos = padTop + plotH - ((yVal - yMin) / yRange) * plotH;
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={yPos}
                  x2={padLeft + plotW}
                  y2={yPos}
                  stroke="#334155"
                  strokeDasharray="2, 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 6}
                  y={yPos + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {Math.round(yVal)}m
                </text>
              </g>
            );
          })}

          {/* Fill area */}
          <polygon points={areaPoints} fill="url(#elevGrad)" />

          {/* Elevation Curve */}
          <polyline
            points={points}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Baseline axis */}
          <line
            x1={padLeft}
            y1={padTop + plotH}
            x2={padLeft + plotW}
            y2={padTop + plotH}
            stroke="#475569"
            strokeWidth="1"
          />

          {/* Distance tick labels */}
          <text x={padLeft} y={height - 8} fill="#94a3b8" fontSize="9" fontFamily="monospace">0m</text>
          <text x={padLeft + plotW / 2} y={height - 8} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            {Math.round(totalDistance / 2)}m
          </text>
          <text x={padLeft + plotW} y={height - 8} textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            {totalDistance}m
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
        <span className="flex items-center gap-1">
          <Compass className="w-3 h-3 text-blue-400" />
          <span>SRTM 30m 1-arc-second calibrated elevation curve</span>
        </span>
        <span className="text-slate-500 font-mono">Vert. Exag: ~12x</span>
      </div>
    </div>
  );
};
