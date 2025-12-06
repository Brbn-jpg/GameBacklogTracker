import React from 'react';

const StatsCard = ({ title, value, subtext, icon, color }) => {
  return (
    <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm flex items-center">
      <div className={`p-3 rounded-lg mr-4 ${color.bg}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-white flex items-end gap-1">
          {value}
          {subtext && (
            <span className="text-sm text-slate-500 font-normal mb-1">
              {subtext}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
