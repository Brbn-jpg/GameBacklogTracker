import React, { useState } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import GameFilter from "./GameFilter";
import GamesContent from "./GamesContent";

const Games = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-slate-950 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow container mx-auto p-8 text-white">
        <div className="w-1/4 pr-8">
          <GameFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4">
          <GamesContent filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Games;
