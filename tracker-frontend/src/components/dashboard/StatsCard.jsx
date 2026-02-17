import React from 'react';

const StatsCard = ({ title, value, subtext, icon, color }) => {
  return (
    <div className="bg-white neo-border-thick neo-shadow p-4 md:p-6 flex items-center">
      <div className={`p-3 md:p-4 neo-border-thick mr-3 md:mr-5 ${color.bg.replace('/20', '')}`}>{icon}</div>
      <div>
        <p className="text-xs md:text-sm font-black uppercase tracking-tight text-black/60">
          {title}
        </p>
        <p className="text-2xl md:text-4xl font-black text-black flex items-end gap-1 leading-none mt-1">
          {value}
          {subtext && (
            <span className="text-sm md:text-lg font-bold mb-1 opacity-50">
              {subtext}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
