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
    <MainLayout className="bg-white dark:bg-black transition-colors">
      <div className="container mx-auto py-12 px-4 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-1/4 shrink-0">
          <div className="sticky top-28">
            <GameFilter onFilterChange={handleFilterChange} />
          </div>
        </aside>
        <div className="w-full lg:w-3/4">
          <GamesContent filters={filters} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Games;
