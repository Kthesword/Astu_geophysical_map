import React from 'react';
import { ActiveTab } from '../types';
import { 
  Compass, 
  Map as MapIcon, 
  Activity, 
  Mountain, 
  FileText, 
  Code2, 
  Download,
  Layers,
  GraduationCap
} from 'lucide-react';
import { downloadPythonProjectZip } from '../utils/zipGenerator';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAttribution: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAttribution
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await downloadPythonProjectZip();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const navItems = [
    { id: 'campus' as ActiveTab, label: 'Campus GIS Map', icon: MapIcon },
    { id: 'geophysical' as ActiveTab, label: 'Geophysical & Tectonics', icon: Activity },
    { id: 'topographic' as ActiveTab, label: 'Topographic & DEM', icon: Mountain },
    { id: 'report' as ActiveTab, label: 'Academic Report', icon: FileText },
    { id: 'python' as ActiveTab, label: 'Python GIS Suite', icon: Code2 },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 shrink-0 z-30 select-none">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* University & Department Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">ASTU Geophysics GIS</span>
              <span className="text-[11px] text-blue-400/90 font-mono">Main Ethiopian Rift</span>
            </div>
            <div className="text-xs text-slate-400 truncate flex items-center gap-1.5">
              <span>Adama Science and Technology University</span>
              <span>·</span>
              <span className="text-slate-300">Dept. of Applied Geophysics</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Segmented control) */}
        <nav className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAttribution}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Scientific Data Sources & Attribution"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Data Sources</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center gap-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md shadow-sm transition-colors active:scale-95 disabled:opacity-50"
            title="Download complete runnable Python project (app.py, generate_maps.py, data, requirements.txt, README.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Packing ZIP...' : 'Download Python Project (.ZIP)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
