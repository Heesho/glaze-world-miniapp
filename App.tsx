import React, { useState, useCallback } from 'react';
import { Territory, UserStats, Tab } from './types';
import { INITIAL_USER_STATS, Icons } from './constants';
import GlobeViz from './components/GlobeViz';
import Blazery from './components/Blazery';
import About from './components/About';
import Header from './components/Header';

const App = () => {
  // --- State ---
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [glazingId, setGlazingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MINE);
  
  // --- Actions ---

  const handleSelectTerritory = useCallback(async (territory: Territory) => {
    setSelectedTerritory(territory);
  }, []);

  const handleGlaze = () => {
    if (!selectedTerritory) return;

    setGlazingId(selectedTerritory.id);
    
    // Haptic feedback if available
    if (navigator.vibrate) navigator.vibrate(50);

    // Update stats
    setStats(prev => ({
      ...prev,
      balance: prev.balance + (prev.glazeRate * selectedTerritory.multiplier),
      glazeCount: prev.glazeCount + 1
    }));

    // Reset animation trigger
    setTimeout(() => setGlazingId(null), 200);
  };

  // --- Render Helpers ---

  // Top Stats Card - Compact version
  const renderTopCard = () => (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-2.5 mb-0 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Card Title Row */}
      <div className="flex justify-between items-center mb-1.5">
        <div className="text-[8px] text-gray-500 font-bold font-mono uppercase tracking-[0.15em]">
          {selectedTerritory?.name || 'KING GLAZER'}
        </div>
        <div className="text-[8px] text-white font-bold font-mono">
          14m 29s
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* Left Side: Avatar & Name */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden border border-[#333]">
            <img
              src="https://picsum.photos/seed/heesh/200"
              alt="avatar"
              className="w-full h-full object-cover grayscale opacity-90"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col justify-center">
            <div className="text-sm font-black text-white tracking-tight leading-none mb-0.5">
                Heeshilio Frost
            </div>
            <div className="text-[9px] text-gray-600 font-mono font-medium">
                @heesh
            </div>
          </div>
        </div>

        {/* Right Side: Stats Block */}
        <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-[2px] text-[8px] font-mono">
          <div className="text-gray-600 font-bold uppercase tracking-wider text-right">GLAZED</div>
          <div className="flex items-center justify-end gap-1">
              <span className="text-white font-bold">+<span className="text-pink-500">◉</span>{(stats.glazeCount).toLocaleString()}</span>
              <span className="text-gray-500">+$144.87</span>
          </div>

          <div className="text-gray-600 font-bold uppercase tracking-wider text-right">PNL</div>
          <div className="flex items-center justify-end gap-1">
              <span className="text-white font-bold">+Ξ{stats.pnl}</span>
              <span className="text-gray-500">+$73.36</span>
          </div>

          <div className="text-gray-600 font-bold uppercase tracking-wider text-right">TOTAL</div>
          <div className="text-pink-500 text-[10px] font-bold tracking-tight text-right">+${stats.balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );

  // Middle Data Grid - Compact version
  const renderDataGrid = () => {
    const multiplier = selectedTerritory?.multiplier || 1;
    const mVal = Math.round(multiplier);

    // Badge Style Logic
    let badgeClass = "bg-[#111] text-gray-600 border-[#222]"; // Default 1x
    if (mVal >= 2) badgeClass = "bg-[#222] text-gray-200 border-gray-700";
    if (mVal >= 3) badgeClass = "bg-pink-950/30 text-pink-400 border-pink-900/50";
    if (mVal >= 5) badgeClass = "bg-pink-600 text-white border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.4)]";
    if (mVal >= 10) badgeClass = "bg-gradient-to-br from-pink-500 to-pink-700 text-white border-white shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-pulse";

    return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      {/* Rate Card */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-3 py-2.5 backdrop-blur-md relative overflow-hidden">
        {/* Header Row */}
        <div className="flex justify-between items-center w-full">
            <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Glaze Rate</div>

            {/* Multiplier Badge */}
            <div className={`px-1.5 py-0.5 rounded text-[8px] font-black font-mono border flex items-center gap-0.5 transition-all duration-300 ${badgeClass}`}>
                {mVal >= 10 && <Icons.Fire className="w-2 h-2" />}
                x{mVal}
            </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline mt-1">
            <span className="text-pink-500 text-2xl mr-1">◉</span>
            <span className="text-3xl font-black text-white font-mono tracking-tighter">{selectedTerritory ? selectedTerritory.rate : stats.glazeRate}</span>
            <span className="text-sm text-gray-500 font-bold ml-0.5">/s</span>
        </div>
        <div className="text-[9px] text-gray-600 font-mono mt-0.5">
            ${((selectedTerritory ? selectedTerritory.rate : stats.glazeRate) * 0.178).toFixed(4)}/s
        </div>
      </div>

      {/* Price Card */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-3 py-2.5 backdrop-blur-md">
        <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Est. Yield</div>
        <div className="flex items-baseline mt-1">
            <span className="text-pink-500 text-2xl mr-1">Ξ</span>
            <span className="text-3xl font-black text-pink-500 font-mono tracking-tighter">0.544</span>
        </div>
        <div className="text-[9px] text-gray-600 font-mono mt-0.5">
            ${(stats.balance * 0.4).toFixed(2)}
        </div>
      </div>
    </div>
    );
  };

  // Bottom Navigation
  const renderNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-[#1F1F1F] flex justify-around items-center px-4 z-50">
        <button onClick={() => setActiveTab(Tab.MINE)} className={`p-2 rounded-full transition-colors ${activeTab === Tab.MINE ? 'text-pink-500' : 'text-gray-500 hover:text-gray-400'}`}>
            <Icons.Fire className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab(Tab.STATS)} className={`p-2 rounded-full transition-colors ${activeTab === Tab.STATS ? 'text-pink-500' : 'text-gray-500 hover:text-gray-400'}`}>
            <Icons.Globe className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab(Tab.INFO)} className={`p-2 rounded-full transition-colors ${activeTab === Tab.INFO ? 'text-pink-500' : 'text-gray-500 hover:text-gray-400'}`}>
            <Icons.Info className="w-6 h-6" />
        </button>
    </div>
  );

  // Render Globe View (STATS tab)
  const renderGlobeView = () => (
    <>
      {/* 1. Globe Layer (Background) - Z-0 */}
      <div className="absolute inset-0 flex items-center justify-center z-0 -translate-y-12 px-2">
          <GlobeViz
            onSelectTerritory={handleSelectTerritory}
            selectedId={selectedTerritory?.id || null}
            glazingId={glazingId}
          />
      </div>

      {/* 2. UI Layer (Foreground) - Z-10 */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none pb-20">

        {/* Header Area */}
        <header className="px-2 pt-4 pointer-events-auto">
            <Header title="WORLD" />
            {renderTopCard()}
        </header>

        {/* Bottom Controls Panel */}
        <div className="px-2 w-full pointer-events-auto">
            {renderDataGrid()}

            {/* Action Button */}
            <button
                onClick={handleGlaze}
                disabled={!selectedTerritory}
                className={`w-full py-3 rounded-xl font-black text-sm tracking-[0.2em] uppercase transition-all duration-150 transform active:scale-[0.98] border border-transparent shadow-lg
                    ${selectedTerritory
                        ? 'bg-pink-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:bg-pink-500'
                        : 'bg-[#111]/80 backdrop-blur-sm border-[#222] text-gray-600 cursor-not-allowed'}
                `}
            >
                {selectedTerritory ? 'INITIALIZE GLAZE' : 'SELECT TARGET'}
            </button>
        </div>
      </div>
    </>
  );

  // Render Blazery View (MINE tab)
  const renderBlazeryView = () => (
    <div className="relative z-10 flex-1 px-2 pt-4 pb-20">
      <Blazery userBalance={stats.balance} />
    </div>
  );

  // Render About View (INFO tab)
  const renderAboutView = () => (
    <div className="relative z-10 flex-1 px-2 pt-4 pb-20">
      <About />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black text-white font-sans max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      <div className="scanline"></div>

      {activeTab === Tab.STATS && renderGlobeView()}
      {activeTab === Tab.MINE && renderBlazeryView()}
      {activeTab === Tab.INFO && renderAboutView()}

      {renderNavBar()}
    </div>
  );
};

export default App;