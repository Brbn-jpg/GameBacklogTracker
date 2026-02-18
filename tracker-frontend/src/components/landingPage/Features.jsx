import React from "react";

const FeatureCard = ({ title, description, icon, colorClass }) => {
  return (
    <div className={`bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow-lg dark:neo-shadow-white ${colorClass} hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}>
      <div className="mb-6 p-4 neo-border-thick dark:border-white bg-white dark:bg-black inline-block text-black dark:text-white">{icon}</div>
      <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter text-black dark:text-white">{title}</h3>
      <p className="text-lg font-bold leading-tight text-black dark:text-white">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-black border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase mb-20 tracking-tighter text-black dark:text-white">
          Ready to <span className="bg-emerald-400 dark:bg-emerald-500 px-4 text-black">Conquer</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            title="Organize"
            description="All your games across all platforms in one single, raw list. No more duplicates."
            colorClass="hover:bg-cyan-400 dark:hover:bg-cyan-500 dark:hover:text-black"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            }
          />
          <FeatureCard
            title="Track"
            description="Log hours, set ratings, and update status. Numbers don't lie, your backlog does."
            colorClass="hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:text-black"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <FeatureCard
            title="Discover"
            description="Find your next addiction using our IGDB powered search. Pure data, zero hype."
            colorClass="hover:bg-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-black"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
