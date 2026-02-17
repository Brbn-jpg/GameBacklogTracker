import React, { useEffect, useState } from "react";

const SocialProof = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/allstats`
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
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black uppercase mb-8">Fetching Intelligence...</h2>
          <div className="w-full max-w-md mx-auto h-8 neo-border-thick overflow-hidden">
            <div className="h-full bg-yellow-400 animate-[pulse_1s_infinite]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 text-center text-red-600">
          <div className="inline-block p-8 neo-border-thick neo-shadow bg-white">
            <h2 className="text-4xl font-black uppercase mb-4">Sync Error</h2>
            <p className="text-xl font-bold uppercase">Community data currently offline.</p>
          </div>
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
    <section className="relative py-24 bg-white overflow-hidden border-b-4 border-black">
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-20 tracking-tighter">
          Global <span className="bg-yellow-400 px-4">Stats</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="p-8 bg-emerald-400 neo-border-thick neo-shadow-lg rotate-[-1deg] group hover:rotate-0 transition-transform">
            <p className="text-7xl font-black text-black leading-none mb-2">
              {completedGames}
            </p>
            <p className="text-xl font-black uppercase tracking-tight border-t-4 border-black pt-4">Completed</p>
          </div>
          
          {/* Stat 2 */}
          <div className="p-8 bg-cyan-400 neo-border-thick neo-shadow-lg rotate-[1deg] group hover:rotate-0 transition-transform">
            <p className="text-7xl font-black text-black leading-none mb-2">
              {totalGamesInBacklog}
            </p>
            <p className="text-xl font-black uppercase tracking-tight border-t-4 border-black pt-4">Backlogged</p>
          </div>

          {/* Stat 3 */}
          <div className="p-8 bg-yellow-400 neo-border-thick neo-shadow-lg rotate-[-2deg] group hover:rotate-0 transition-transform">
            <p className="text-7xl font-black text-black leading-none mb-2">
              {totalHoursPlayed}
            </p>
            <p className="text-xl font-black uppercase tracking-tight border-t-4 border-black pt-4">Hours Logged</p>
          </div>

          {/* Stat 4 */}
          <div className="p-8 bg-white neo-border-thick neo-shadow-lg rotate-[2deg] group hover:rotate-0 transition-transform">
            <p className="text-7xl font-black text-black leading-none mb-2">
              {averageRating}
            </p>
            <p className="text-xl font-black uppercase tracking-tight border-t-4 border-black pt-4">Avg Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
