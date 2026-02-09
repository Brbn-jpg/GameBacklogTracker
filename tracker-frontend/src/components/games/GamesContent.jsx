import React, { useState, useEffect } from "react";
import IgdbGameCard from "./IgdbGameCard";
import { useAuth } from "../../context/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GamesContent = ({ filters }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { token } = useAuth();
  const pageSize = 12;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        
        if (filters.name) queryParams.append("name", filters.name);
        
        if (filters.genres && filters.genres.length > 0) {
          filters.genres.forEach(g => queryParams.append("genres", g));
        }

        if (filters.categories && filters.categories.length > 0) {
          filters.categories.forEach(c => queryParams.append("categories", c));
        }

        if (filters.developers) {
          const devs = filters.developers.split(",").map(d => d.trim());
          devs.forEach(d => queryParams.append("developers", d));
        }

        if (filters.publishers) {
          const pubs = filters.publishers.split(",").map(p => p.trim());
          pubs.forEach(p => queryParams.append("publishers", p));
        }

        if (filters.windows) queryParams.append("platforms", "PC (Microsoft Windows)");
        if (filters.mac) queryParams.append("platforms", "Mac");
        if (filters.linux) queryParams.append("platforms", "Linux");

        // Add pagination
        queryParams.append("page", currentPage);
        queryParams.append("size", pageSize);

        const url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/igdb/search?${queryParams.toString()}`;
        
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGames(data);
      } catch (e) {
        console.error("Error fetching games from IGDB:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, currentPage, token]);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && games.length === 0) return <div className="text-center py-12 text-xl text-slate-400">Searching IGDB...</div>;
  
  if (error)
    return <div className="text-center py-8 text-red-500 bg-red-500/10 rounded-xl border border-red-500/50">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-12">
      <div className="container mx-auto">
        {/* Results Info */}
        <div className="mb-6 text-slate-400 text-sm">
          Showing results for page {currentPage + 1}
        </div>

        {!loading && games.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xl border border-white/5 rounded-2xl bg-slate-900/20">
            No games found. Try adjusting your filters!
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {games.map((game) => (
            <IgdbGameCard key={game.appId || game.id} game={game} />
          ))}
        </div>

        {/* Simple Pagination Controls */}
        <div className="mt-12 flex justify-center items-center gap-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0 || loading}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 rounded-xl transition-all font-semibold border border-white/5"
          >
            <FaChevronLeft /> Previous
          </button>
          
          <span className="text-slate-400 font-medium">Page {currentPage + 1}</span>

          <button
            onClick={handleNextPage}
            disabled={games.length < pageSize || loading}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-30 rounded-xl transition-all font-semibold shadow-lg shadow-purple-500/20"
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesContent;
