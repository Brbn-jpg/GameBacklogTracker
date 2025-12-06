import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-8 transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="text-purple-400 text-4xl mb-4">{icon}</div>
      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="mt-10 py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          All-in-One Tracking Solution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Organize Your Library"
            description="Import your games from various platforms and keep them all in one place."
            icon={
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            }
          />
          <FeatureCard
            title="Track Your Progress"
            description="Update your game status, completion percentage, and hours played."
            icon={
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            }
          />
          <FeatureCard
            title="Discover New Games"
            description="Explore a vast database of games, filter by genre, platform, and more to find your next adventure."
            icon={
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
