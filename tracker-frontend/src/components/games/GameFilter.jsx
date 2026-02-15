import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import MultiSelect from "../common/MultiSelect";

const GENRES = [
  "Action", "Adventure", "Role-playing (RPG)", "Shooter", "Strategy", "Sports", 
  "Racing", "Simulation", "Puzzle", "Platform", "Fighting", "Indie", 
  "Arcade", "Family", "Music", "Tactical", "Point-and-click", "Visual Novel"
];

const PLATFORMS = [
  "PC (Microsoft Windows)", "Mac", "Linux", 
  "PlayStation 5", "PlayStation 4", 
  "Xbox Series X|S", "Xbox One", 
  "Nintendo Switch", "iOS", "Android"
];

const GameFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    genres: [],
    platforms: [],
    developers: "",
    publishers: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name, value) => {
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
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-600"
              placeholder="e.g. Elden Ring..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="genre" className="block text-gray-400 text-sm font-medium mb-1">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genres[0] || ""}
            onChange={(e) => {
              const val = e.target.value;
              setFilters((prev) => ({ ...prev, genres: val ? [val] : [] }));
            }}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <MultiSelect
          label="Platforms"
          options={PLATFORMS}
          selectedValues={filters.platforms}
          onChange={(val) => handleMultiSelectChange("platforms", val)}
          placeholder="Select platforms..."
        />

        <div>
          <label htmlFor="developers" className="block text-gray-400 text-sm font-medium mb-1">
            Developers
          </label>
          <input
            type="text"
            id="developers"
            name="developers"
            value={filters.developers}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-600"
            placeholder="e.g. FromSoftware, Valve"
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            Note: Search requires full company name (e.g. "FromSoftware")
          </p>
        </div>

        <div>
          <label htmlFor="publishers" className="block text-gray-400 text-sm font-medium mb-1">
            Publishers
          </label>
          <input
            type="text"
            id="publishers"
            name="publishers"
            value={filters.publishers}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-600"
            placeholder="e.g. Bandai Namco, Electronic Arts"
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            Note: Search requires full company name (e.g. "Bandai Namco")
          </p>
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