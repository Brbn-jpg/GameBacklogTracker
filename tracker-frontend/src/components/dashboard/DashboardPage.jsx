import React, { useState, useEffect, useCallback, useMemo } from "react";
import KanbanColumn from "./KanbanColumn";
import StatsCard from "./StatsCard";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import UserProfile from "./UserProfile";

const DashboardPage = () => {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          fetch(`http://localhost:8080/v1/usergames`, { headers }),
          fetch(`http://localhost:8080/v1/usergames/stats`, { headers }),
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
        game.id === gameId ? { ...game, status: newStatus.toUpperCase() } : game
      );
      setGames(updatedGames);

      const token = Cookies.get("jwt_token");
      try {
        const response = await fetch(
          `http://localhost:8080/v1/usergames/${gameId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus.toUpperCase() }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update game status");
        }
      } catch (error) {
        console.error("Error updating game status:", error);
        setGames(originalGames);
      }
    },
    [games]
  );

  const handleRemove = async (gameId) => {
    const originalGames = [...games];
    const updatedGames = games.filter((game) => game.id !== gameId);
    setGames(updatedGames);

    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(
        `http://localhost:8080/v1/usergames/${gameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove game");
      }
    } catch (error) {
      console.error("Error removing game:", error);
      setGames(originalGames);
    }
  };

  const ditchedGames = useMemo(
    () => games.filter((g) => g.status === "DITCHED"),
    [games]
  );
  const notPlayedGames = useMemo(
    () => games.filter((g) => g.status === "NOT_PLAYED"),
    [games]
  );
  const playingGames = useMemo(
    () => games.filter((g) => g.status === "PLAYING"),
    [games]
  );
  const completedGames = useMemo(
    () => games.filter((g) => g.status === "COMPLETED"),
    [games]
  );

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen md:h-screen w-full bg-slate-950 text-slate-300 font-sans p-4 md:p-6 flex flex-col md:overflow-hidden">
      <div className="shrink-0">
        <UserProfile />
      </div>
      <section className="shrink-0 max-w-[1600px] mx-auto w-full mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Games"
            value={games.length}
            color={{ bg: "bg-purple-500/20" }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            }
          />

          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-center">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">
              Games by Status
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></span>
                  Playing
                </span>{" "}
                <span className="text-white font-bold">
                  {playingGames.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                  Completed
                </span>{" "}
                <span className="text-white font-bold">
                  {completedGames.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>
                  Not Played
                </span>{" "}
                <span className="text-white font-bold">
                  {notPlayedGames.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                  Ditched
                </span>{" "}
                <span className="text-white font-bold">
                  {ditchedGames.length}
                </span>
              </div>
            </div>
          </div>

          <StatsCard
            title="Total Hours Played"
            value={stats ? `${stats.totalHoursPlayed}h` : "0h"}
            color={{ bg: "bg-cyan-500/20" }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          <StatsCard
            title="Average Rating"
            value={stats ? stats.averageRating : "0"}
            subtext="/10"
            color={{ bg: "bg-yellow-500/20" }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />
        </div>
      </section>
      <main className="flex-1 w-full max-w-[1600px] mx-auto md:min-h-0 lg:overflow-x-auto pb-6 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-4 h-full lg:w-full">
          <KanbanColumn
            title="Ditched"
            statusId="DITCHED"
            games={ditchedGames}
            colorClass="border-rose-900/30"
            badgeColor="text-rose-400"
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
          <KanbanColumn
            title="Not Played"
            statusId="NOT_PLAYED"
            games={notPlayedGames}
            colorClass="border-slate-700/30"
            badgeColor="text-slate-300"
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
          <KanbanColumn
            title="Playing"
            statusId="PLAYING"
            games={playingGames}
            colorClass="border-cyan-900/30"
            badgeColor="text-cyan-400"
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
          <KanbanColumn
            title="Completed"
            statusId="COMPLETED"
            games={completedGames}
            colorClass="border-emerald-900/30"
            badgeColor="text-emerald-400"
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
