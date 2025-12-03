import React, { useState, useCallback } from 'react';
import { Territory, UserStats, Tab } from './types';
import { INITIAL_USER_STATS, Icons } from './constants';
import GlobeViz from './components/GlobeViz';

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

  // Top Stats Card - Matched to Reference Image
  const renderTopCard = () => (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4 mb-0 backdrop-blur-md relative overflow-hidden shadow-2xl">
      {/* Card Title Row */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-[10px] text-gray-500 font-bold font-mono uppercase tracking-[0.15em]">
          {selectedTerritory?.name || 'KING GLAZER'}
        </div>
        <div className="text-[10px] text-white font-bold font-mono">
          14m 29s
        </div>
      </div>

      <div className="flex justify-between items-start">
        {/* Left Side: Avatar & Name */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
             <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden border border-[#333]">
               <img 
                 src="https://picsum.photos/seed/heesh/200" 
                 alt="avatar" 
                 className="w-full h-full object-cover grayscale opacity-90" 
               />
             </div>
          </div>
          
          {/* Text Info */}
          <div className="flex flex-col justify-center">
            {/* Main Name (Connected User) */}
            <div className="text-lg font-black text-white tracking-tight leading-none mb-0.5">
                Heeshilio Frost
            </div>
            {/* Sub Handle */}
            <div className="text-xs text-gray-600 font-mono font-medium">
                @heesh
            </div>
          </div>
        </div>

        {/* Right Side: Stats Block - Grid for perfect alignment */}
        <div className="grid grid-cols-[auto_auto] gap-x-3 gap-y-[3px] text-[10px] font-mono pt-0.5">
          {/* Row 1: Glazed */}
          <div className="text-gray-600 font-bold uppercase tracking-wider text-right self-center">GLAZED</div>
          <div className="flex items-center justify-end gap-1.5 self-center">
              <span className="text-white font-bold flex items-center gap-1 text-xs">
                  +<span className="text-pink-500 text-[10px]">🍩</span>{(stats.glazeCount).toLocaleString()}
              </span>
              <span className="text-gray-500">+$144.87</span>
          </div>

          {/* Row 2: PNL */}
          <div className="text-gray-600 font-bold uppercase tracking-wider text-right self-center">PNL</div>
          <div className="flex items-center justify-end gap-1.5 self-center">
              <span className="text-white font-bold text-xs">+Ξ{stats.pnl}</span>
              <span className="text-gray-500">+$73.36</span>
          </div>

          {/* Row 3: Total */}
          <div className="text-gray-600 font-bold uppercase tracking-wider text-right self-center">TOTAL</div>
          <div className="text-pink-500 text-sm font-bold tracking-tight text-right self-center">+${stats.balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );

  // Middle Data Grid
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
    <div className="grid grid-cols-2 gap-3 mb-4 px-1">
      {/* Rate Card */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col justify-between h-24 backdrop-blur-md relative overflow-hidden">
        {/* Header Row */}
        <div className="flex justify-between items-start w-full">
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">Glaze Rate</div>
            
            {/* Multiplier Badge */}
            <div className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-black font-mono border flex items-center gap-1 transition-all duration-300 ${badgeClass}`}>
                {mVal >= 10 && <Icons.Fire className="w-3 h-3" />}
                x{mVal}
            </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
            <Icons.Donut className="w-5 h-5 text-gray-400" />
            <span className="text-3xl font-black text-white font-mono tracking-tighter leading-none">{selectedTerritory ? selectedTerritory.rate : stats.glazeRate}</span>
            <span className="text-xs text-gray-500 font-bold">/s</span>
        </div>
      </div>

      {/* Price Card */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col justify-between h-24 backdrop-blur-md">
        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Est. Yield</div>
        <div className="flex items-baseline gap-1">
            <span className="text-pink-500 font-bold text-xl">Ξ</span>
            <span className="text-3xl font-black text-pink-500 font-mono tracking-tighter">0.544</span>
        </div>
        <div className="text-[10px] text-gray-600 font-mono">
            ${(stats.balance * 0.4).toFixed(2)}
        </div>
      </div>
    </div>
    );
  };

  // Bottom Navigation
  const renderNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black border-t border-[#1F1F1F] flex justify-around items-center px-4 z-50 pb-2">
        <button onClick={() => setActiveTab(Tab.MINE)} className={`p-2 rounded-full transition-colors ${activeTab === Tab.MINE ? 'text-pink-500' : 'text-gray-700 hover:text-gray-500'}`}>
            <Icons.Fire className="w-6 h-6" />
        </button>
        <button className="relative -top-6 group">
             <div className="w-14 h-14 rounded-full bg-[#050505] flex items-center justify-center border border-[#1F1F1F] group-active:scale-95 transition-transform">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                 </div>
             </div>
        </button>
        <button onClick={() => setActiveTab(Tab.INFO)} className={`p-2 rounded-full transition-colors ${activeTab === Tab.INFO ? 'text-white' : 'text-gray-700 hover:text-gray-500'}`}>
            <Icons.User className="w-6 h-6" />
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black text-white font-sans max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      <div className="scanline"></div>
      
      {/* 1. Globe Layer (Background) - Z-0 */}
      <div className="absolute inset-0 flex items-center justify-center z-0 -translate-y-12 px-4">
          <GlobeViz 
            onSelectTerritory={handleSelectTerritory}
            selectedId={selectedTerritory?.id || null} 
            glazingId={glazingId}
          />
      </div>

      {/* 2. UI Layer (Foreground) - Z-10 */}
      {/* pointer-events-none on container allows clicks to pass through to the globe in the middle */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none pb-24">
        
        {/* Header Area */}
        <header className="px-4 pt-2 pointer-events-auto">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-black tracking-tighter italic">
                  <span className="text-pink-500">GLAZE</span><span className="text-white">WORLD</span>
                </h1>
                {/* Top Right User Profile */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end leading-tight">
                        <span className="text-sm font-bold text-white">Heeshilio Frost</span>
                        <span className="text-[10px] text-gray-500 font-mono">@heesh</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#333] overflow-hidden grayscale">
                        <img 
                            src="https://picsum.photos/seed/heesh/200" 
                            alt="profile" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>
            </div>
            {renderTopCard()}
        </header>

        {/* Bottom Controls Panel */}
        <div className="px-4 w-full pointer-events-auto">
            {renderDataGrid()}

            {/* Action Button */}
            <button 
                onClick={handleGlaze}
                disabled={!selectedTerritory}
                className={`w-full py-5 rounded-xl font-black text-xl tracking-[0.2em] uppercase transition-all duration-150 transform active:scale-[0.98] border border-transparent shadow-lg
                    ${selectedTerritory 
                        ? 'bg-pink-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:bg-pink-500' 
                        : 'bg-[#111]/80 backdrop-blur-sm border-[#222] text-gray-600 cursor-not-allowed'}
                `}
            >
                {selectedTerritory ? 'INITIALIZE GLAZE' : 'SELECT TARGET'}
            </button>
        </div>
      </div>

      {renderNavBar()}
    </div>
  );
};

export default App;