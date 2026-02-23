import React from 'react';

const StatsCard = ({ title, value, subtext, icon, color }) => {
  return (
    <div className="bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-4 md:p-6 flex items-center transition-colors">
      <div className={`p-3 md:p-4 neo-border-thick dark:border-white mr-3 md:mr-5 ${color.bg.replace('/20', '')} text-black`}>{icon}</div>
      <div>
        <p className="text-xs md:text-sm font-black uppercase tracking-tight text-black/60 dark:text-white/60">
          {title}
        </p>
        <p className="text-2xl md:text-4xl font-black text-black dark:text-white flex items-end gap-1 leading-none mt-1">
          {value}
          {subtext && (
            <span className="text-sm md:text-lg font-bold mb-1 opacity-50 dark:opacity-40">
              {subtext}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
