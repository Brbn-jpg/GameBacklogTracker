import React, { useEffect, useState } from "react";

const SocialProof = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/v1/usergames/allstats"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 bg-slate-900 text-white">
        {/* Glow effects for loading state */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/15 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 translate-y-1/4"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Community's Progress</h2>
          <p>Loading stats...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 bg-slate-900 text-white">
        {/* Glow effects for error state */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/15 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 translate-y-1/4"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Community's Progress</h2>
          <p className="text-red-500">
            Failed to load statistics. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (!stats) {
    return null;
  }

  const completedGames = stats.gamesByStatus?.COMPLETED || 0;
  const totalGamesInBacklog = stats.totalGames || 0;
  const totalHoursPlayed = Math.round(stats.totalHoursPlayed) || 0;
  const averageRating = stats.averageRating?.toFixed(1) || "N/A";

  return (
    <section className="relative py-20 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[1200px] h-[150px] bg-purple-500/15 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-50 h-50 bg-cyan-400/15 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 translate-y-1/4"></div>
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Community's Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <p className="text-5xl font-extrabold text-purple-400">
              {completedGames}
            </p>
            <p className="mt-2 text-gray-300">Games Completed</p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <p className="text-5xl font-extrabold text-cyan-400">
              {totalGamesInBacklog}
            </p>
            <p className="mt-2 text-gray-300">Total Games in Backlog</p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <p className="text-5xl font-extrabold text-green-400">
              {totalHoursPlayed}
            </p>
            <p className="mt-2 text-gray-300">Total Hours Played</p>
          </div>
          <div className="p-6 bg-slate-800 rounded-lg shadow-lg">
            <p className="text-5xl font-extrabold text-yellow-400">
              {averageRating}
            </p>
            <p className="mt-2 text-gray-300">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
