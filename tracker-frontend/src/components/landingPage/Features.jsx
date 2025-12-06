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
            description="Get recommendations based on your gaming habits and wishlist."
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m-4.243-2.757l.707-.707m8.486 0l.707-.707"
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
