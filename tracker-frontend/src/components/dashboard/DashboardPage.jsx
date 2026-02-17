import React, { useState, useEffect, useCallback, useMemo } from "react";
import KanbanColumn from "./KanbanColumn";
import StatsCard from "./StatsCard";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import UserProfile from "./UserProfile";
import {
  FaThList,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
} from "react-icons/fa";

const DashboardPage = () => {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sort & Filter State
  const [sortBy, setSortBy] = useState("addedAt"); // 'rating', 'hoursPlayed', 'addedAt'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc', 'desc'
  const [filterStatus, setFilterStatus] = useState("ALL");

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const token = Cookies.get("jwt_token") || user.token;
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [gamesResponse, statsResponse] = await Promise.all([
          fetch(
            `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`,
            { headers },
          ),
          fetch(
            `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/stats`,
            { headers },
          ),
        ]);

        if (!gamesResponse.ok)
          throw new Error(`HTTP error! status: ${gamesResponse.status}`);
        if (!statsResponse.ok)
          throw new Error(`HTTP error! status: ${statsResponse.status}`);

        const gamesData = await gamesResponse.json();
        const statsData = await statsResponse.json();

        setGames(gamesData);
        setStats(statsData);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDrop = useCallback(
    async (gameId, newStatus) => {
      const originalGames = [...games];
      const updatedGames = games.map((game) =>
        game.id === gameId
          ? { ...game, status: newStatus.toUpperCase() }
          : game,
      );
      setGames(updatedGames);

      const token = Cookies.get("jwt_token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${gameId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus.toUpperCase() }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update game status");
        }
      } catch (error) {
        console.error("Error updating game status:", error);
        setGames(originalGames);
      }
    },
    [games],
  );

  const handleRemove = async (gameId) => {
    const originalGames = [...games];
    const updatedGames = games.filter((game) => game.id !== gameId);
    setGames(updatedGames);

    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${gameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove game");
      }
    } catch (error) {
      console.error("Error removing game:", error);
      setGames(originalGames);
    }
  };

  // Processing Logic
  const processedGames = useMemo(() => {
    let result = [...games];

    // Filter
    if (filterStatus !== "ALL") {
      result = result.filter((g) => g.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      // Handle nulls/undefined safely
      if (valA === undefined || valA === null) valA = 0;
      if (valB === undefined || valB === null) valB = 0;

      // String comparison for dates if needed, but addedAt is usually string date
      if (sortBy === "addedAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [games, filterStatus, sortBy, sortOrder]);

  const ditchedGames = useMemo(
    () => processedGames.filter((g) => g.status === "DITCHED"),
    [processedGames],
  );
  const notPlayedGames = useMemo(
    () => processedGames.filter((g) => g.status === "NOT_PLAYED"),
    [processedGames],
  );
  const playingGames = useMemo(
    () => processedGames.filter((g) => g.status === "PLAYING"),
    [processedGames],
  );
  const completedGames = useMemo(
    () => processedGames.filter((g) => g.status === "COMPLETED"),
    [processedGames],
  );

  // Handle Sort Toggle
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc"); // Default to desc for new field (usually higher is better/newer)
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <div className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
          Loading Operations Hub...
        </div>
        <div className="w-64 h-6 neo-border-thick overflow-hidden">
          <div className="h-full bg-emerald-400 animate-[pulse_1s_infinite]"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-12 neo-border-thick bg-red-100 text-red-600 text-center neo-shadow max-w-2xl mx-auto mt-20">
        <h3 className="text-4xl font-black uppercase mb-4">Core Error</h3>
        <p className="text-xl font-bold uppercase">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 md:p-8 flex flex-col">
      <div className="max-w-[1600px] mx-auto w-full">
        <UserProfile />

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              title="Total Intelligence"
              value={stats ? stats.totalGames : "0"}
              color={{ bg: "bg-emerald-400" }}
              icon={<FaThList className="text-2xl" />}
            />

            <div className="bg-white neo-border-thick p-6 neo-shadow flex flex-col justify-center">
              <p className="text-sm font-black uppercase tracking-widest text-black/40 mb-4 border-b-2 border-black pb-2">
                Status Breakdown
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-tighter">
                <div className="flex items-center justify-between">
                  <span>Ditched</span>
                  <span className="bg-red-500 text-white px-1 neo-border">
                    {games.filter((g) => g.status === "DITCHED").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Not Played</span>
                  <span className="bg-yellow-400 px-1 neo-border">
                    {games.filter((g) => g.status === "NOT_PLAYED").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Playing</span>
                  <span className="bg-cyan-400 px-1 neo-border">
                    {games.filter((g) => g.status === "PLAYING").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Completed</span>
                  <span className="bg-emerald-400 px-1 neo-border">
                    {games.filter((g) => g.status === "COMPLETED").length}
                  </span>
                </div>
              </div>
            </div>

            <StatsCard
              title="Logged Activity"
              value={stats ? `${stats.totalHoursPlayed}H` : "0H"}
              color={{ bg: "bg-cyan-400" }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="3"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            <StatsCard
              title="Avg Satisfaction"
              value={stats ? stats.averageRating.toFixed(1) : "0"}
              subtext="/10"
              color={{ bg: "bg-yellow-400" }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Toolbar */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 bg-white neo-border-thick p-1 neo-shadow">
            <span className="px-3 py-2 font-black uppercase text-xs flex items-center gap-2 bg-black text-white">
              <FaFilter /> Filter
            </span>
            {["ALL", "DITCHED", "NOT_PLAYED", "PLAYING", "COMPLETED"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-2 text-xs font-black uppercase transition-colors ${
                    filterStatus === status
                      ? "bg-yellow-400 text-black neo-border"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {status.replace("_", " ")}
                </button>
              ),
            )}
          </div>

          <div className="flex gap-2 bg-white neo-border-thick p-1 neo-shadow">
            <span className="px-3 py-2 font-black uppercase text-xs flex items-center gap-2 bg-black text-white">
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}{" "}
              Sort
            </span>
            {[
              { label: "Date", key: "addedAt" },
              { label: "Rating", key: "rating" },
              { label: "Time", key: "hoursPlayed" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleSort(item.key)}
                className={`px-3 py-2 text-xs font-black uppercase transition-colors ${
                  sortBy === item.key
                    ? "bg-cyan-400 text-black neo-border"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <main className="w-full overflow-x-auto pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-w-[1000px] lg:min-w-0">
            {/* If a filter is active (not ALL), we might want to show only that column or handle it differently.
                Currently, it filters cards inside columns. So 'Playing' column will be empty if filter is 'COMPLETED'.
                This is standard Kanban behavior when filtering.
            */}
            <KanbanColumn
              title="Ditched"
              statusId="DITCHED"
              games={ditchedGames}
              colorClass="neo-border-thick"
              badgeColor="bg-red-500 text-white"
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
            <KanbanColumn
              title="Not Played"
              statusId="NOT_PLAYED"
              games={notPlayedGames}
              colorClass="neo-border-thick"
              badgeColor="bg-yellow-400 text-black"
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
            <KanbanColumn
              title="Playing"
              statusId="PLAYING"
              games={playingGames}
              colorClass="neo-border-thick"
              badgeColor="bg-cyan-400 text-black"
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
            <KanbanColumn
              title="Completed"
              statusId="COMPLETED"
              games={completedGames}
              colorClass="neo-border-thick"
              badgeColor="bg-emerald-400 text-black"
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
