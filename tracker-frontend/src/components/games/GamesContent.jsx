import React, { useState, useEffect } from "react";
import IgdbGameCard from "./IgdbGameCard";
import { useAuth } from "../../context/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GamesContent = ({ filters }) => {
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { token, isAuthenticated } = useAuth();
  const pageSize = 12;

  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  const fetchUserBacklog = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserGames(data);
      }
    } catch (e) {
      console.error("Failed to fetch user backlog", e);
    }
  };

  useEffect(() => {
    fetchUserBacklog();
  }, [isAuthenticated, token]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (filters.name) queryParams.append("name", filters.name);
        if (filters.genres && filters.genres.length > 0) {
          filters.genres.forEach((g) => queryParams.append("genres", g));
        }
        if (filters.developers) {
          const devs = filters.developers.split(",").map((d) => d.trim());
          devs.forEach((d) => queryParams.append("developers", d));
        }
        if (filters.platforms && filters.platforms.length > 0) {
          filters.platforms.forEach((p) => queryParams.append("platforms", p));
        }

        queryParams.append("page", currentPage);
        queryParams.append("size", pageSize);

        const url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/igdb/search?${queryParams.toString()}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGames(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, currentPage, token]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && games.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black transition-colors">
        <div className="text-4xl font-black uppercase tracking-tighter mb-4 italic text-black dark:text-white">Scanning IGDB...</div>
        <div className="w-64 h-6 neo-border-thick dark:border-white overflow-hidden">
          <div className="h-full bg-yellow-400 dark:bg-yellow-500 animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    );

  return (
    <div className="pb-12 bg-white dark:bg-black transition-colors duration-300">
      <div className="mb-8 border-b-4 border-black dark:border-white pb-4 flex justify-between items-end">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">Results</h2>
        <span className="text-xl font-black uppercase bg-cyan-400 dark:bg-cyan-500 px-3 py-1 neo-border border-black dark:border-white text-black">Page {currentPage + 1}</span>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}>
        {games.map((game) => {
          const matchedUserGame = userGames.find(ug => ug.appId === (game.appId || game.id));
          return (
            <IgdbGameCard 
              key={game.appId || game.id} 
              game={game} 
              existingUserGameId={matchedUserGame?.id}
              onActionSuccess={fetchUserBacklog}
            />
          );
        })}
      </div>

      <div className="mt-20 flex justify-center items-center gap-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || loading}
          className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-black uppercase text-xl text-black dark:text-white disabled:opacity-30 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none"
        >
          <FaChevronLeft /> Prev
        </button>

        <button
          onClick={handleNextPage}
          disabled={games.length < pageSize || loading}
          className="flex items-center gap-3 px-8 py-4 bg-yellow-400 dark:bg-yellow-500 neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-black uppercase text-xl text-black disabled:opacity-30 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none"
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default GamesContent;
