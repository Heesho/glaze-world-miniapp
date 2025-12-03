import React from 'react';

interface HeaderProps {
  title: string;
  highlightColor?: boolean; // If true, title is pink, otherwise white
}

const Header: React.FC<HeaderProps> = ({ title, highlightColor = false }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className={`text-xl font-black tracking-tight ${highlightColor ? 'text-pink-500' : 'text-white'}`}>
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-500/50">
          <img
            src="https://picsum.photos/seed/heesh/200"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white font-mono">Heeshilio Frost</span>
          <span className="text-[10px] text-gray-500 font-mono">@heesh</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
