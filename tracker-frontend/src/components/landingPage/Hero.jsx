import React from "react";
import { Link } from "react-router-dom";
import Cyberpunk from "../../assets/images/Cyberpunk-screenshot.jpg";
import EldenRing from "../../assets/images/Elden-Ring-screenshot.jpg";
import GOW from "../../assets/images/GodOfWar-screenshot.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 bg-white dark:bg-black border-b-4 border-black dark:border-white overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-black dark:text-white">
              Kill Your <br />
              <span className="bg-yellow-400 dark:bg-yellow-500 px-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white inline-block transform hover:scale-105 transition-transform text-black">Backlog</span>
            </h1>
            <p className="text-2xl font-bold max-w-xl border-l-8 border-black dark:border-white pl-6 py-2 text-black dark:text-white">
              Organize your library, track progress, and conquer your gaming debt with zero fluff.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/register"
                className="bg-cyan-400 dark:bg-cyan-500 text-black text-2xl font-black uppercase px-8 py-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-cyan-300 dark:hover:bg-cyan-400"
              >
                Join Squad
              </Link>
              <a
                href="#features"
                className="bg-white dark:bg-black text-black dark:text-white text-2xl font-black uppercase px-8 py-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white neo-transition hover:bg-gray-100 dark:hover:bg-yellow-400 dark:hover:text-black"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Visual Content - Raw Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="neo-border-thick dark:border-white neo-shadow-cyan dark:neo-shadow-white overflow-hidden h-64 rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
              <img src={Cyberpunk} alt="Cyberpunk" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="neo-border-thick dark:border-white neo-shadow-emerald dark:neo-shadow-white overflow-hidden mt-8 h-64 rotate-[2deg] hover:rotate-0 transition-transform duration-300">
              <img src={EldenRing} alt="Elden Ring" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="col-span-2 neo-border-thick dark:border-white neo-shadow-lg dark:neo-shadow-white overflow-hidden h-80 rotate-[1deg] hover:rotate-0 transition-transform duration-300">
              <img src={GOW} alt="God of War" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
