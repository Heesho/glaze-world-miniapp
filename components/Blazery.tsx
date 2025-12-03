import React, { useState } from 'react';
import Header from './Header';

interface BlazeryProps {
  userBalance: number;
}

const Blazery: React.FC<BlazeryProps> = ({ userBalance }) => {
  const [lpAmount, setLpAmount] = useState<string>('65.61703');

  // Mock conversion rate
  const ethPerLp = 0.01835;
  const lpPrice = 58.68; // USD per LP
  const ethPrice = 3055; // USD per ETH

  const lpValue = parseFloat(lpAmount) || 0;
  const ethValue = lpValue * ethPerLp;
  const lpUsdValue = lpValue * lpPrice;
  const ethUsdValue = ethValue * ethPrice;

  const availableLp = 14.0485;
  const isProfitable = ethUsdValue >= lpUsdValue;
  const pnl = ethUsdValue - lpUsdValue;

  return (
    <div className="flex flex-col h-full">
      <Header title="BLAZERY" />

      {/* Swap Cards - matching globe page card style */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* PAY Card */}
        <div className="bg-[#0A0A0A] border-2 border-pink-500 rounded-2xl p-4 backdrop-blur-md">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">PAY</div>
          <div className="flex items-baseline gap-1">
            <span className="text-pink-500 font-bold text-xl">LP</span>
            <input
              type="text"
              value={lpAmount}
              onChange={(e) => setLpAmount(e.target.value)}
              className="text-3xl font-black text-pink-500 font-mono tracking-tighter bg-transparent w-full outline-none"
            />
          </div>
          <div className="text-[10px] text-gray-600 font-mono mt-1">${lpUsdValue.toFixed(2)}</div>
        </div>

        {/* GET Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4 backdrop-blur-md">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">GET</div>
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold text-xl">Ξ</span>
            <span className="text-3xl font-black text-white font-mono tracking-tighter">{ethValue.toFixed(8)}</span>
          </div>
          <div className="text-[10px] text-gray-600 font-mono mt-1">${ethUsdValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Blaze Button - matching globe page button style */}
      <button className="w-full py-5 rounded-xl font-black text-xl tracking-[0.2em] uppercase transition-all duration-150 transform active:scale-[0.98] border border-transparent shadow-lg bg-pink-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:bg-pink-500 mb-4">
        BLAZE
      </button>

      {/* Available Balance */}
      <div className="flex justify-between items-center text-[10px] font-mono mb-4">
        <div className="text-gray-500">
          Available: <span className="text-white font-bold">{availableLp}</span> <span className="text-gray-600">DONUT-ETH LP</span>
        </div>
        <button className="text-pink-500 font-bold hover:text-pink-400 transition-colors">
          Get LP →
        </button>
      </div>

      {/* Warning/Info */}
      {!isProfitable && (
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4 backdrop-blur-md">
          <div className="text-center text-yellow-500 font-mono text-sm leading-relaxed">
            <span className="mr-1">⚠</span>
            Unprofitable blaze! You'll receive ${ethUsdValue.toFixed(2)} in WETH for ${lpUsdValue.toFixed(2)} in LP (${pnl.toFixed(2)})
          </div>
        </div>
      )}
    </div>
  );
};

export default Blazery;
