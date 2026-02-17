import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import KanbanColumn from "../dashboard/KanbanColumn";
import StatsCard from "../dashboard/StatsCard";
import { toast } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaArrowLeft, FaThList } from "react-icons/fa";
import Footer from "../common/Footer";

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

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

  const stats = useMemo(() => {
    if (!games.length) return null;
    const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0);
    const ratedGames = games.filter((g) => g.rating > 0);
    const avgRating = ratedGames.length
      ? ratedGames.reduce((acc, g) => acc + g.rating, 0) / ratedGames.length
      : 0;

    return {
      totalHoursPlayed: Math.round(totalHours * 10) / 10,
      averageRating: avgRating,
    };
  }, [games]);

  const ditchedGames = useMemo(
    () => games.filter((g) => g.status === "DITCHED"),
    [games],
  );
  const notPlayedGames = useMemo(
    () => games.filter((g) => g.status === "NOT_PLAYED"),
    [games],
  );
  const playingGames = useMemo(
    () => games.filter((g) => g.status === "PLAYING"),
    [games],
  );
  const completedGames = useMemo(
    () => games.filter((g) => g.status === "COMPLETED"),
    [games],
  );

  if (loading) {
    return (
      <div className="text-center py-20 font-black uppercase italic">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-600 p-8 neo-border-thick text-center">
          <h2 className="text-2xl font-black uppercase mb-4">Error</h2>
          <p className="font-bold mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-6 py-3 font-black uppercase neo-border"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white text-black font-sans p-4 md:p-8 flex flex-col">
        <div className="max-w-[1600px] mx-auto w-full flex-grow">
          <div className="mb-12 flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="p-4 bg-white neo-border-thick neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              title="Back"
            >
              <FaArrowLeft />
            </button>

            <div className="flex-grow bg-white neo-border-thick p-6 neo-shadow flex items-center gap-6">
              <div className="w-16 h-16 bg-yellow-400 neo-border-thick flex items-center justify-center font-black text-3xl">
                {profileData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                  {profileData.username}
                </h1>
                <p className="font-bold uppercase text-black/40 tracking-widest text-sm">
                  User Profile
                </p>
              </div>
            </div>
          </div>

          {profileData.isPublic === false ? (
            <div className="p-20 neo-border-thick text-center bg-white neo-shadow-lg flex flex-col items-center">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center neo-border mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={3}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-black uppercase mb-2">
                Private Profile
              </h2>
              <p className="font-bold uppercase text-black/60">
                This user has restricted profile access.
              </p>
            </div>
          ) : (
            <>
              <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatsCard
                    title="Total Games"
                    value={games.length}
                    color={{ bg: "bg-emerald-400" }}
                    icon={<FaThList className="text-2xl" />}
                  />

                  <div className="bg-white neo-border-thick p-6 neo-shadow flex flex-col justify-center">
                    <p className="text-sm font-black uppercase tracking-widest text-black/40 mb-4 border-b-2 border-black pb-2">
                      Status Breakdown
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-tighter">
                      <div className="flex items-center justify-between">
                        <span>Playing</span>{" "}
                        <span className="bg-cyan-400 px-1 neo-border">
                          {playingGames.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Done</span>{" "}
                        <span className="bg-emerald-400 px-1 neo-border">
                          {completedGames.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Idle</span>{" "}
                        <span className="bg-yellow-400 px-1 neo-border">
                          {notPlayedGames.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ditched</span>{" "}
                        <span className="bg-red-500 text-white px-1 neo-border">
                          {ditchedGames.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <StatsCard
                    title="Hours Played"
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
                          strokeWidth={3}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  />
                  <StatsCard
                    title="Avg Rating"
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

              <main className="w-full overflow-x-auto pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-w-[1000px] lg:min-w-0">
                  <KanbanColumn
                    title="Ditched"
                    statusId="DITCHED"
                    games={ditchedGames}
                    colorClass="neo-border-thick"
                    badgeColor="bg-red-500 text-white"
                    readOnly={true}
                  />
                  <KanbanColumn
                    title="Not Played"
                    statusId="NOT_PLAYED"
                    games={notPlayedGames}
                    colorClass="neo-border-thick"
                    badgeColor="bg-yellow-400 text-black"
                    readOnly={true}
                  />
                  <KanbanColumn
                    title="Playing"
                    statusId="PLAYING"
                    games={playingGames}
                    colorClass="neo-border-thick"
                    badgeColor="bg-cyan-400 text-black"
                    readOnly={true}
                  />
                  <KanbanColumn
                    title="Completed"
                    statusId="COMPLETED"
                    games={completedGames}
                    colorClass="neo-border-thick"
                    badgeColor="bg-emerald-400 text-black"
                    readOnly={true}
                  />
                </div>
              </main>
            </>
          )}
        </div>
      </div>
      <Footer />
    </DndProvider>
  );
};

export default FriendProfile;
