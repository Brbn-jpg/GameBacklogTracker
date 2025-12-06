import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-slate-950 text-white py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-cyan-400/20 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/4 -translate-y-1/4"></div>
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Never Lose Track of Your Backlog
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          GameLog helps you organize your game library, track your progress, and
          conquer your backlog once and for all.
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:-translate-y-1 transform transition-all duration-300"
          >
            Get Started Free
          </Link>
          <a
            href="#features"
            className="inline-block bg-white/10 border border-white/20 text-white font-bold py-3 px-8 rounded-lg backdrop-blur-md hover:-translate-y-1 transform transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* 3D Perspective Mockup */}
      <div className="mt-20" style={{ perspective: "1000px" }}>
        <div className="w-3/4 mx-auto h-96 rounded-lg shadow-2xl shadow-purple-500/20 transform rotate-x-12 origin-top">
          <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/10">
            <div className="w-full h-full scale-75 transform-gpu">
              {/* A simplified version of the dashboard would be better here to avoid nested interactive elements */}
              <div className="bg-slate-900 h-full w-full p-4">
                <div className="flex">
                  <div className="w-48 bg-slate-800/50 rounded-lg p-2 mr-4">
                    <div className="h-8 bg-slate-700/50 rounded mb-4"></div>
                    <div className="h-4 bg-slate-700/50 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700/50 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-4/6"></div>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="h-32 bg-slate-700/50 rounded"></div>
                      <div className="h-32 bg-slate-700/50 rounded"></div>
                      <div className="h-32 bg-slate-700/50 rounded"></div>
                      <div className="h-32 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
