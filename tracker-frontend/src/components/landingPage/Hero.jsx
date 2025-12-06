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
        <h1 className="text-5xl md::text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
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

      {/* Blurred Dashboard Mockup with 3D Perspective */}
      <div className="mt-20" style={{ perspective: "1000px" }}>
        <div
          className="w-3/4 mx-auto h-[500px] rounded-lg shadow-2xl shadow-purple-500/20 transition-transform duration-700 ease-out hover:scale-105"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(1deg) rotateY(-8deg) rotateZ(0deg)",
          }}
        >
          <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/10 p-4 bg-slate-900/60 backdrop-blur-sm">
            {/* Mimic Dashboard.jsx structure: Sidebar + Main Content */}
            <div className="flex h-full w-full">
              {/* Mock Sidebar */}
              <div className="w-48 bg-slate-800/50 rounded-lg p-2 mr-4 filter blur-sm">
                <div className="h-8 bg-slate-700/50 rounded mb-4"></div>{" "}
                {/* Logo/Title */}
                <div className="space-y-2 mt-4">
                  <div className="h-6 bg-slate-700/50 rounded"></div>
                  <div className="h-6 bg-slate-700/50 rounded"></div>
                  <div className="h-6 bg-slate-700/50 rounded"></div>
                  <div className="h-6 bg-slate-700/50 rounded"></div>
                </div>
                <div className="mt-auto h-8 bg-slate-700/50 rounded absolute bottom-2 w-[calc(100%-16px)]"></div>{" "}
                {/* Logout */}
              </div>

              {/* Mock Main Content Area */}
              <div className="flex-1 p-4 flex flex-col space-y-4 filter blur-sm">
                {/* Mock UserProfile */}
                <div className="h-16 bg-slate-800/50 rounded-lg w-full flex items-center justify-center p-3">
                  <div className="h-6 w-3/4 bg-slate-700/50 rounded"></div>
                </div>

                {/* Mock Stats Cards */}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                    <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                    <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                    <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-800/50 rounded-lg p-3 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-700/50 rounded"></div>
                    <div className="h-8 w-1/2 bg-slate-700/50 rounded"></div>
                  </div>
                </div>

                {/* Mock Kanban Columns */}
                <div className="flex-1 flex overflow-x-auto space-x-4 pb-2">
                  {/* Column 1 */}
                  <div className="w-64 flex-shrink-0 h-full bg-slate-800/50 rounded-lg p-3 flex flex-col space-y-3">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-2"></div>{" "}
                    {/* Column Title */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="w-64 flex-shrink-0 h-full bg-slate-800/50 rounded-lg p-3 flex flex-col space-y-3">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-2"></div>{" "}
                    {/* Column Title */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="w-64 flex-shrink-0 h-full bg-slate-800/50 rounded-lg p-3 flex flex-col space-y-3">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-2"></div>{" "}
                    {/* Column Title */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                      <div className="h-20 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div className="w-64 flex-shrink-0 h-full bg-slate-800/50 rounded-lg p-3 flex flex-col space-y-3">
                    <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-2"></div>{" "}
                    {/* Column Title */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                      <div className="h-20 bg-slate-700/50 rounded"></div>
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
