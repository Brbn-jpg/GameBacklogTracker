import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const GameFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FaSearch className="text-purple-500 text-sm" />
          Search Games
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-1">
            Game Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="e.g. Elden Ring..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          Search IGDB
        </button>
      </form>
    </div>
  );
};

export default GameFilter;