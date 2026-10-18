/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, BasemapType } from './types';
import { Header } from './components/Header';
import { SidebarControls } from './components/SidebarControls';
import { LeafletMap } from './components/LeafletMap';
import { ScientificLegend } from './components/ScientificLegend';
import { FeatureDetailModal } from './components/FeatureDetailModal';
import { TransectProfileModal } from './components/TransectProfileModal';
import { AcademicReportView } from './components/AcademicReportView';
import { PythonProjectView } from './components/PythonProjectView';
import { DataSourcesModal } from './components/DataSourcesModal';
import { generateTransectProfile } from './utils/elevationProbe';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('campus');
  const [basemap, setBasemap] = useState<BasemapType>('positron');
  
  // Layer visibility toggles
  const [layers, setLayers] = useState({
    boundary: true,
    buildings: true,
    roads: true,
    landmarks: true,
    geology: true,
    faults: true,
    gravity: true,
    magnetic: true,
    stations: true,
    contours: true,
    demTint: true
  });

  const [geologyOpacity, setGeologyOpacity] = useState(0.45);
  const [searchQuery, setSearchQuery] = useState('');
  const [buildingCategory, setBuildingCategory] = useState('all');

  // Interactive inspect selection
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  // Elevation Probe
  const [cursorPos, setCursorPos] = useState<{
    lat: number;
    lon: number;
    elevation: number;
    slope: number;
  } | null>(null);

  // Topographic transect
  const [selectedTransect, setSelectedTransect] = useState<string>('');
  const [transectProfile, setTransectProfile] = useState<Array<{
    distanceMeters: number;
    elevation: number;
    lat: number;
    lon: number;
  }> | null>(null);
  const [transectLine, setTransectLine] = useState<Array<[number, number]> | null>(null);
  const [transectName, setTransectName] = useState<string>('');

  // Modals & Triggers
  const [isAttributionOpen, setIsAttributionOpen] = useState(false);
  const [resetViewTrigger, setResetViewTrigger] = useState(0);

  // Handle Transect Selection
  const handleSelectTransect = (key: string) => {
    if (selectedTransect === key) {
      setSelectedTransect('');
      setTransectProfile(null);
      setTransectLine(null);
      return;
    }

    setSelectedTransect(key);

    if (key === 'astu-ew') {
      // East-West transect across ASTU campus
      const start: [number, number] = [8.5615, 39.2845];
      const end: [number, number] = [8.5645, 39.2955];
      const profile = generateTransectProfile(start[0], start[1], end[0], end[1], 40);
      setTransectProfile(profile);
      setTransectLine([start, end]);
      setTransectName("Transect A-A' (ASTU Campus East-West)");
    } else if (key === 'wonji-fault') {
      // NW-SE transect across Adama Graben and Wonji Fault step
      const start: [number, number] = [8.5720, 39.2780];
      const end: [number, number] = [8.5520, 39.3020];
      const profile = generateTransectProfile(start[0], start[1], end[0], end[1], 50);
      setTransectProfile(profile);
      setTransectLine([start, end]);
      setTransectName("Transect B-B' (Wonji Fault Belt Scarp)");
    }
  };

  const handleResetView = () => {
    setResetViewTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAttribution={() => setIsAttributionOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {activeTab === 'report' ? (
          <AcademicReportView />
        ) : activeTab === 'python' ? (
          <PythonProjectView />
        ) : (
          <>
            {/* Left Control Sidebar */}
            <SidebarControls
              activeTab={activeTab}
              basemap={basemap}
              setBasemap={setBasemap}
              layers={layers}
              setLayers={setLayers}
              geologyOpacity={geologyOpacity}
              setGeologyOpacity={setGeologyOpacity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              buildingCategory={buildingCategory}
              setBuildingCategory={setBuildingCategory}
              selectedTransect={selectedTransect}
              onSelectTransect={handleSelectTransect}
              cursorPos={cursorPos}
              onResetView={handleResetView}
            />

            {/* Map Canvas */}
            <main className="flex-1 h-full relative overflow-hidden bg-slate-950">
              <LeafletMap
                activeTab={activeTab}
                basemap={basemap}
                layers={layers}
                geologyOpacity={geologyOpacity}
                searchQuery={searchQuery}
                buildingCategory={buildingCategory}
                onSelectFeature={(feat) => setSelectedFeature(feat)}
                onCursorUpdate={(pos) => setCursorPos(pos)}
                transectLine={transectLine}
                resetViewTrigger={resetViewTrigger}
              />

              {/* Dynamic Scientific Legend */}
              <ScientificLegend activeTab={activeTab} />

              {/* Feature Details Inspector Drawer */}
              {selectedFeature && (
                <FeatureDetailModal
                  feature={selectedFeature}
                  onClose={() => setSelectedFeature(null)}
                />
              )}

              {/* Transect Profile Graphic Modal */}
              {transectProfile && (
                <TransectProfileModal
                  transectName={transectName}
                  profile={transectProfile}
                  onClose={() => {
                    setTransectProfile(null);
                    setTransectLine(null);
                    setSelectedTransect('');
                  }}
                />
              )}
            </main>
          </>
        )}
      </div>

      {/* Scientific Data Sources & Attribution Modal */}
      <DataSourcesModal
        isOpen={isAttributionOpen}
        onClose={() => setIsAttributionOpen(false)}
      />
    </div>
  );
}
