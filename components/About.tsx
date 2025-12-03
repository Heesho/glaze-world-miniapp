import React from 'react';
import Header from './Header';

const About: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <Header title="ABOUT" />

      {/* Action Buttons - matching globe page card style */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl py-3 px-4 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#111] transition-colors flex items-center justify-center gap-2 backdrop-blur-md">
          <span className="text-purple-400">*</span> Add to Farcaster
        </button>
        <button className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl py-3 px-4 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-[#111] transition-colors flex items-center justify-center gap-2 backdrop-blur-md">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
          </svg>
          Dune Dashboard
        </button>
      </div>

      {/* What Is $DONUT */}
      <section className="mb-6">
        <h2 className="text-lg font-black text-pink-500 mb-3 font-mono tracking-tight">What Is $DONUT</h2>
        <ul className="space-y-2 text-gray-300 font-mono text-[10px] leading-relaxed tracking-wide">
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>$DONUT is a store-of-value token on Base</span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>Mined through a continuous Dutch auction instead of proof-of-work or staking</span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>Auction revenue increases $DONUT's liquidity and scarcity</span>
          </li>
        </ul>
      </section>

      {/* How Mining Works */}
      <section className="mb-6">
        <h2 className="text-lg font-black text-pink-500 mb-3 font-mono tracking-tight">How Mining Works</h2>
        <ul className="space-y-2 text-gray-300 font-mono text-[10px] leading-relaxed tracking-wide">
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>Only one active miner at a time, called the King Glazer</span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>The right to mine is bought with ETH through a continuous Dutch auction:</span>
          </li>
          <li className="pl-4 flex gap-2">
            <span className="text-gray-600">-</span>
            <span>Price doubles after each purchase</span>
          </li>
          <li className="pl-4 flex gap-2">
            <span className="text-gray-600">-</span>
            <span>Then decays to 0 over one hour</span>
          </li>
          <li className="pl-4 flex gap-2">
            <span className="text-gray-600">-</span>
            <span>Anyone can purchase control of emissions at the current price</span>
          </li>
        </ul>
      </section>

      {/* Revenue Split */}
      <section className="mb-6">
        <h2 className="text-lg font-black text-pink-500 mb-3 font-mono tracking-tight">Revenue Split</h2>
        <ul className="space-y-2 text-gray-300 font-mono text-[10px] leading-relaxed tracking-wide">
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>80% → previous King Glazer</span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>15% → treasury (Blazery)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-600">*</span>
            <span>5% → liquidity pool</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
