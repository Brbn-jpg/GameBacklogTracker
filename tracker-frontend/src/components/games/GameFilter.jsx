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
    <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-6 space-y-6 neo-shadow dark:neo-shadow-white transition-colors duration-300">
      <div className="flex items-center gap-3 border-b-4 border-black dark:border-white pb-4 mb-2 text-black dark:text-white">
        <FaSearch className="text-2xl" />
        <h3 className="text-2xl font-black uppercase tracking-tighter">Filter Data</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">
            Title Query
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-3 text-black dark:text-white font-bold outline-none focus:bg-yellow-50 dark:focus:bg-yellow-400 dark:focus:text-black placeholder-black/40 dark:placeholder-white/60"
            placeholder="E.G. ELDEN RING"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="genre" className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">
            Primary Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genres[0] || ""}
            onChange={(e) => {
              const val = e.target.value;
              setFilters((prev) => ({ ...prev, genres: val ? [val] : [] }));
            }}
            className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-3 text-black dark:text-white font-bold outline-none cursor-pointer focus:bg-cyan-50 dark:focus:bg-yellow-400 dark:focus:text-black appearance-none"
          >
            <option value="">ALL GENRES</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">Target Platforms</label>
          <MultiSelect
            options={PLATFORMS}
            selectedValues={filters.platforms}
            onChange={(val) => handleMultiSelectChange("platforms", val)}
            placeholder="CHOOSE SYSTEMS"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="developers" className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">
            Developers
          </label>
          <input
            type="text"
            id="developers"
            name="developers"
            value={filters.developers}
            onChange={handleChange}
            className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-3 text-black dark:text-white font-bold outline-none focus:bg-emerald-50 dark:focus:bg-yellow-400 dark:focus:text-black placeholder-black/40 dark:placeholder-white/60"
            placeholder="E.G. FROMSOFTWARE"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 dark:bg-yellow-500 text-black font-black py-4 px-4 neo-border-thick dark:border-white neo-shadow-lg dark:neo-shadow-white uppercase text-xl neo-transition tracking-tighter"
        >
          Execute Search
        </button>
      </form>
    </div>
  );
};

export default GameFilter;
