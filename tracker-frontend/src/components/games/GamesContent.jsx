import React, { useState, useEffect } from "react";
import BrowseGameCard from "./BrowseGameCard";
import Pagination from "../common/Pagination";

const GamesContent = ({ filters }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        // Add filters to queryParams
        if (filters.name) queryParams.append("name", filters.name);
        if (filters.price) queryParams.append("price", filters.price);
        if (filters.releaseDate)
          queryParams.append("releaseDate", filters.releaseDate);
        if (filters.developers && filters.developers.length > 0)
          queryParams.append("developers", filters.developers);
        if (filters.publishers && filters.publishers.length > 0)
          queryParams.append("publishers", filters.publishers);
        if (filters.windows) queryParams.append("windows", filters.windows);
        if (filters.mac) queryParams.append("mac", filters.mac);
        if (filters.linux) queryParams.append("linux", filters.linux);

        if (filters.genres && Array.isArray(filters.genres)) {
          filters.genres.forEach((g) => queryParams.append("genres", g));
        } else if (filters.genres) {
          queryParams.append("genres", filters.genres);
        }

        if (filters.categories && Array.isArray(filters.categories)) {
          filters.categories.forEach((c) =>
            queryParams.append("categories", c)
          );
        } else if (filters.categories) {
          queryParams.append("categories", filters.categories);
        }

        if (filters.tags && Array.isArray(filters.tags)) {
          filters.tags.forEach((t) => queryParams.append("tags", t));
        } else if (filters.tags) {
          queryParams.append("tags", filters.tags);
        }

        // Add pagination parameters
        queryParams.append("page", currentPage);
        queryParams.append("size", pageSize);

        const url = `http://localhost:8080/v1/games?${queryParams.toString()}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response Data:", data);

        // Assuming the API returns a Page object with 'content' and 'totalPages'
        if (
          data &&
          Array.isArray(data.content) &&
          typeof data.totalPages === "number"
        ) {
          setGames(data.content);
          setTotalPages(data.totalPages);
        } else if (Array.isArray(data)) {
          // Fallback if API returns a plain array
          setGames(data);
          setTotalPages(1); // If it's a plain array, assume one page
        } else {
          console.error(
            "API did not return expected page structure or array:",
            data
          );
          setGames([]);
          setTotalPages(0);
        }
      } catch (e) {
        console.error("Error fetching games:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, currentPage]); // Re-fetch games when filters or current page change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center py-8">Loading games...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto">
        {!loading && games.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xl">
            No games found matching your criteria.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <BrowseGameCard key={game.id} game={game} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GamesContent;
