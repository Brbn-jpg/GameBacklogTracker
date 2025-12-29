import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import KanbanColumn from "../dashboard/KanbanColumn";
import StatsCard from "../dashboard/StatsCard";
import { toast } from "react-hot-toast";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FriendProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      setLoading(true);
      setError(null);
      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(`http://localhost:8080/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load user profile");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFriendProfile();
    }
  }, [userId]);

  const games = profileData?.userGames || [];

  // Helper to calculate stats from games array since backend endpoint is just for current user
  const stats = useMemo(() => {
    if (!games.length) return null;
    const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0);
    const ratedGames = games.filter(g => g.rating > 0);
    const avgRating = ratedGames.length 
        ? ratedGames.reduce((acc, g) => acc + g.rating, 0) / ratedGames.length 
        : 0;
    
    return {
        totalHoursPlayed: Math.round(totalHours * 10) / 10,
        averageRating: avgRating
    };
  }, [games]);

  const ditchedGames = useMemo(() => games.filter((g) => g.status === "DITCHED"), [games]);
  const notPlayedGames = useMemo(() => games.filter((g) => g.status === "NOT_PLAYED"), [games]);
  const playingGames = useMemo(() => games.filter((g) => g.status === "PLAYING"), [games]);
  const completedGames = useMemo(() => games.filter((g) => g.status === "COMPLETED"), [games]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">Loading profile...</div>;
  }

  if (error) {
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 space-y-4">
           <div className="text-red-500">Error: {error}</div>
           <button onClick={() => navigate(-1)} className="text-cyan-400 hover:underline">Go Back</button>
        </div>
     )
  }

  if (!profileData) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen w-full bg-slate-950 text-slate-300 font-sans p-6 flex flex-col">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center space-x-4">
          <button 
              onClick={() => navigate(-1)} 
              className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-white"
              title="Go Back"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
          </button>
          <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl border-2 border-white/20">
                  {profileData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                  <h1 className="text-3xl font-bold text-white">{profileData.username}'s Library</h1>
                  <p className="text-slate-400">Viewing user profile</p>
              </div>
          </div>
        </div>

        {profileData.isPublic === false ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-300 mb-2">This profile is private</h2>
            <p className="text-slate-500">The user has chosen to keep their game library private.</p>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <section className="shrink-0 max-w-[1600px] mx-auto w-full mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Games"
                  value={games.length}
                  color={{ bg: "bg-purple-500/20" }}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <StatsCard
                  title="Average Rating"
                  value={stats ? stats.averageRating.toFixed(2) : "0"}
                  subtext="/10"
                  color={{ bg: "bg-yellow-500/20" }}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  }
                />
              </div>
            </section>

            {/* Kanban Board - Read Only */}
            <main className="flex-1 w-full max-w-[1600px] mx-auto overflow-x-auto pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-4 h-full min-w-[1000px] lg:min-w-0">
                <KanbanColumn
                  title="Ditched"
                  statusId="DITCHED"
                  games={ditchedGames}
                  colorClass="border-rose-900/30"
                  badgeColor="text-rose-400"
                  readOnly={true}
                />
                <KanbanColumn
                  title="Not Played"
                  statusId="NOT_PLAYED"
                  games={notPlayedGames}
                  colorClass="border-slate-700/30"
                  badgeColor="text-slate-300"
                  readOnly={true}
                />
                <KanbanColumn
                  title="Playing"
                  statusId="PLAYING"
                  games={playingGames}
                  colorClass="border-cyan-900/30"
                  badgeColor="text-cyan-400"
                  readOnly={true}
                />
                <KanbanColumn
                  title="Completed"
                  statusId="COMPLETED"
                  games={completedGames}
                  colorClass="border-emerald-900/30"
                  badgeColor="text-emerald-400"
                  readOnly={true}
                />
              </div>
            </main>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default FriendProfile;
