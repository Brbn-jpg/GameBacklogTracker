import React from "react";
import { Link } from "react-router-dom";
import Cyberpunk from "../../assets/images/Cyberpunk-screenshot.jpg";
import EldenRing from "../../assets/images/Elden-Ring-screenshot.jpg";
import GOW from "../../assets/images/GodOfWar-screenshot.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 bg-white border-b-4 border-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
              Kill Your <br />
              <span className="bg-yellow-400 px-4 neo-border-thick neo-shadow inline-block transform hover:scale-105 transition-transform">Backlog</span>
            </h1>
            <p className="text-2xl font-bold max-w-xl border-l-8 border-black pl-6 py-2">
              Organize your library, track progress, and conquer your gaming debt with zero fluff.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/register"
                className="bg-cyan-400 text-black text-2xl font-black uppercase px-8 py-4 neo-border-thick neo-shadow neo-transition"
              >
                Join Squad
              </Link>
              <a
                href="#features"
                className="bg-white text-black text-2xl font-black uppercase px-8 py-4 neo-border-thick neo-shadow neo-transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Visual Content - Raw Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="neo-border-thick neo-shadow-cyan overflow-hidden h-64 rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
              <img src={Cyberpunk} alt="Cyberpunk" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="neo-border-thick neo-shadow-emerald overflow-hidden mt-8 h-64 rotate-[2deg] hover:rotate-0 transition-transform duration-300">
              <img src={EldenRing} alt="Elden Ring" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="col-span-2 neo-border-thick neo-shadow-lg overflow-hidden h-80 rotate-[1deg] hover:rotate-0 transition-transform duration-300">
              <img src={GOW} alt="God of War" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
