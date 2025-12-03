import React from 'react';

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className="w-full bg-black/50 border-y border-gray-900 overflow-hidden py-1 relative">
      <div className="animate-marquee whitespace-nowrap text-pink-500 font-mono text-xs tracking-widest uppercase flex">
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10"></div>
    </div>
  );
};

export default Marquee;
