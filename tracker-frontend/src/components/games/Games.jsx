import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import GameFilter from "./GameFilter";
import GamesContent from "./GamesContent";

const Games = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row container mx-auto p-4 md:p-8 text-white gap-6">
        <div className="w-full md:w-1/4 md:pr-8">
          <GameFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4">
          <GamesContent filters={filters} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Games;
