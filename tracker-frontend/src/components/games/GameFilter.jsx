import React, { useState, useEffect } from "react";
import MultiSelect from "../common/MultiSelect";

const GameFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    releaseDate: "",
    developers: "",
    publishers: "",
    windows: false,
    mac: false,
    linux: false,
    genres: [],
    categories: [],
    tags: [],
  });

  const [options, setOptions] = useState({
    genres: [],
    categories: [],
    tags: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [genresRes, categoriesRes, tagsRes] = await Promise.all([
          fetch("http://localhost:8080/v1/games/filters/genres"),
          fetch("http://localhost:8080/v1/games/filters/categories"),
          fetch("http://localhost:8080/v1/games/filters/tags"),
        ]);

        const genres = genresRes.ok ? await genresRes.json() : [];
        const categories = categoriesRes.ok ? await categoriesRes.json() : [];
        const tags = tagsRes.ok ? await tagsRes.json() : [];

        setOptions({ genres, categories, tags });
      } catch (error) {
        console.error("Failed to fetch filter options", error);
        // Fallback or empty options
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (field, value) => {
      setFilters((prevFilters) => ({
          ...prevFilters,
          [field]: value
      }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Filter Games</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-gray-400 text-sm font-medium mb-1"
          >
            Game Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Elden Ring"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-gray-400 text-sm font-medium mb-1"
          >
            Max Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={filters.price}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. 59.99"
          />
        </div>

        {/* Release Date */}
        <div>
          <label
            htmlFor="releaseDate"
            className="block text-gray-400 text-sm font-medium mb-1"
          >
            Release Date (YYYY-MM-DD)
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={filters.releaseDate}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Developers */}
        <div>
          <label
            htmlFor="developers"
            className="block text-gray-400 text-sm font-medium mb-1"
          >
            Developers (comma-separated)
          </label>
          <input
            type="text"
            id="developers"
            name="developers"
            value={filters.developers}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. FromSoftware, CD Projekt Red"
          />
        </div>

        {/* Publishers */}
        <div>
          <label
            htmlFor="publishers"
            className="block text-gray-400 text-sm font-medium mb-1"
          >
            Publishers (comma-separated)
          </label>
          <input
            type="text"
            id="publishers"
            name="publishers"
            value={filters.publishers}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Bandai Namco, Xbox Game Studios"
          />
        </div>

        {/* Platforms */}

        <div>
          <label className="block text-gray-400 text-sm font-medium mb-1">
            Platforms:
          </label>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="windows"
                name="windows"
                checked={filters.windows}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-cyan-500 bg-slate-800 border-white/10 rounded focus:ring-cyan-500"
              />

              <label htmlFor="windows" className="text-gray-300">
                Windows
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mac"
                name="mac"
                checked={filters.mac}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-cyan-500 bg-slate-800 border-white/10 rounded focus:ring-cyan-500"
              />

              <label htmlFor="mac" className="text-gray-300">
                Mac
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="linux"
                name="linux"
                checked={filters.linux}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-cyan-500 bg-slate-800 border-white/10 rounded focus:ring-cyan-500"
              />

              <label htmlFor="linux" className="text-gray-300">
                Linux
              </label>
            </div>
          </div>
        </div>

        {/* Genres */}
        <MultiSelect 
            label="Genres"
            options={options.genres}
            selectedValues={filters.genres}
            onChange={(val) => handleMultiSelectChange("genres", val)}
            placeholder="Select Genres..."
        />

        {/* Categories */}
        <MultiSelect 
            label="Categories"
            options={options.categories}
            selectedValues={filters.categories}
            onChange={(val) => handleMultiSelectChange("categories", val)}
            placeholder="Select Categories..."
        />

        {/* Tags */}
        <MultiSelect 
            label="Tags"
            options={options.tags}
            selectedValues={filters.tags}
            onChange={(val) => handleMultiSelectChange("tags", val)}
            placeholder="Select Tags..."
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/25 transform transition-all duration-200 hover:-translate-y-0.5"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default GameFilter;
