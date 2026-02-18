import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Lightbox from "../common/Lightbox";
import { useAuth } from "../../context/AuthContext";
import StarRatingInput from "../common/StarRatingInput";

const GamePage = ({ source }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  
  const [game, setGame] = useState(null);
  const [userGame, setUserGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Status states
  const [loadingUser, setLoadingUser] = useState(true);
  const [actionStatus, setActionStatus] = useState("idle");

  // Form states
  const [rating, setRating] = useState(0);
  const [hoursPlayed, setHoursPlayed] = useState("");

  // 1. Fetch Game Data
  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (source === "igdb") {
          url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/igdb/${id}`;
        } else {
          url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/games/${id}`;
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(url, { headers });
        
        if (!response.ok) throw new Error(source === "igdb" ? "Game not found in IGDB" : "Game not found locally");
        
        const data = await response.json();
        setGame(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id, source, token]);

  // 2. Fetch User Game Status
  useEffect(() => {
    const fetchUserGameStatus = async () => {
      if (!isAuthenticated || !game) { 
        setLoadingUser(false);
        return;
      }

      const checkId = source === "igdb" ? id : game.appId;
      if (!checkId) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const userGames = await response.json();
          const found = userGames.find((ug) => ug.appId.toString() === checkId.toString());
          
          if (found) {
            setUserGame(found);
            setRating(found.rating);
            setHoursPlayed(found.hoursPlayed || "");
          } else {
            setUserGame(null);
            setRating(0);
            setHoursPlayed("");
          }
        }
      } catch (e) {
        console.error("Failed to fetch user game status", e);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserGameStatus();
  }, [isAuthenticated, token, id, source, game]);

  const handleAction = async (actionType, payload = {}) => {
    setActionStatus("loading");
    try {
      let url, method, body;
      const gameIdentifier = source === "igdb" ? id : game.appId;

      switch (actionType) {
        case "ADD":
          url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`;
          method = "POST";
          body = JSON.stringify({ gameId: gameIdentifier, status: payload.status });
          break;
        case "UPDATE":
          url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${userGame.id}`;
          method = "PATCH";
          body = JSON.stringify(payload);
          break;
        case "DELETE":
          url = `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${userGame.id}`;
          method = "DELETE";
          break;
        default:
          return;
      }

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: body,
      });

      if (!res.ok) throw new Error("Action failed");

      if (actionType === "DELETE") {
        setUserGame(null);
        setRating(0);
        setHoursPlayed("");
      } else {
        const data = await res.json();
        setUserGame(data);
      }
      
      setActionStatus("success");
      setTimeout(() => setActionStatus("idle"), 2000);

    } catch (err) {
      console.error(err);
      setActionStatus("error");
    }
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  if (loading) return (
    <MainLayout>
      <div className="text-center py-20 text-4xl font-black uppercase italic text-black dark:text-white">Retrieving Data...</div>
    </MainLayout>
  );

  if (error) return (
    <MainLayout>
      <div className="text-center py-20 text-red-600 text-4xl font-black uppercase">System Error: {error}</div>
    </MainLayout>
  );

  if (!game) return null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 transition-colors duration-300">
        <div className="mb-12 neo-border-thick dark:border-white bg-white dark:bg-black neo-shadow-lg dark:neo-shadow-white overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 neo-border-r dark:border-white h-80 md:h-auto bg-black">
            <img src={game.headerImage} alt={game.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-black">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic text-black dark:text-white">
              {game.name}
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              {game.developers?.map((dev, i) => (
                <span key={i} className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 neo-border-thick dark:border-white font-black uppercase text-xl text-black">
                  {dev}
                </span>
              ))}
              {userGame && (
                <span className="bg-cyan-400 dark:bg-cyan-500 px-4 py-2 neo-border-thick dark:border-white font-black uppercase text-xl text-black">
                  {userGame.status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white">
              <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter underline decoration-8 decoration-yellow-400 dark:decoration-yellow-500 underline-offset-4 text-black dark:text-white">Intelligence</h2>
              <p className="text-xl font-bold leading-relaxed text-black dark:text-white">{game.about || "No intelligence data available."}</p>
            </div>

            <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white">
              <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter underline decoration-8 decoration-cyan-400 dark:decoration-cyan-500 underline-offset-4 text-black dark:text-white">Visual Evidence</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {game.screenshots?.map((url, index) => (
                  <div key={index} className="neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer overflow-hidden aspect-video">
                    <img
                      src={url}
                      alt={`Evidence ${index + 1}`}
                      onClick={() => openLightbox(index)}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white sticky top-28">
              <h2 className="text-3xl font-black uppercase mb-8 tracking-tight border-b-4 border-black dark:border-white pb-2 text-black dark:text-white">Operations</h2>
              
              <div className="space-y-6 text-xl font-bold uppercase mb-8 text-black dark:text-white">
                <p><span className="text-black/60 dark:text-white/60">Released:</span> {game.releaseDate || (game.first_release_date ? new Date(game.first_release_date * 1000).getFullYear() : "TBA")}</p>
                <p><span className="text-black/60 dark:text-white/60">Genre:</span> {game.genres?.join(", ") || "Unknown"}</p>
                <p><span className="text-black/60 dark:text-white/60">Pub:</span> {game.publishers?.join(", ") || "Unknown"}</p>
              </div>

              {isAuthenticated && !loadingUser && (
                <>
                  {!userGame ? (
                    <>
                      <button
                        onClick={() => handleAction("ADD", { status: "NOT_PLAYED" })}
                        disabled={actionStatus === "loading"}
                        className="w-full bg-emerald-400 dark:bg-emerald-500 text-black py-5 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white font-black uppercase text-2xl neo-transition mb-4"
                      >
                        {actionStatus === "loading" ? "Adding..." : "Add to Backlog"}
                      </button>
                      <button
                        onClick={() => handleAction("ADD", { status: "WISHLIST" })}
                        disabled={actionStatus === "loading"}
                        className="w-full bg-cyan-400 dark:bg-cyan-500 text-black py-5 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white font-black uppercase text-2xl neo-transition"
                      >
                        {actionStatus === "loading" ? "Adding..." : "Add to Wishlist"}
                      </button>
                    </>
                  ) : userGame.status === "WISHLIST" ? (
                    <>
                      <button
                        onClick={() => handleAction("UPDATE", { status: "NOT_PLAYED" })}
                        disabled={actionStatus === "loading"}
                        className="w-full bg-green-500 dark:bg-green-600 text-white py-5 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white font-black uppercase text-2xl neo-transition mb-4"
                      >
                        {actionStatus === "loading" ? "Moving..." : "Move to Backlog"}
                      </button>
                      <button
                        onClick={() => handleAction("DELETE")}
                        disabled={actionStatus === "loading"}
                        className="w-full bg-red-500 dark:bg-red-600 text-white py-5 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white font-black uppercase text-2xl neo-transition"
                      >
                        {actionStatus === "loading" ? "Removing..." : "Remove from Wishlist"}
                      </button>
                    </>
                  ) : (
                    <div className="neo-border-thick dark:border-white bg-yellow-50 dark:bg-black p-6 space-y-6">
                      <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">Your Data</h3>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">Rating</label>
                          <StarRatingInput
                            rating={parseInt(rating)}
                            onChange={(val) => setRating(val)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-black uppercase tracking-widest text-black dark:text-white">Hours Logged</label>
                          <input
                            type="number"
                            value={hoursPlayed}
                            onChange={(e) => setHoursPlayed(e.target.value)}
                            className="w-full neo-border-thick dark:border-white p-2 font-bold outline-none bg-white dark:bg-black text-black dark:text-white focus:bg-white dark:focus:bg-yellow-400 dark:focus:text-black"
                            placeholder="0"
                          />
                        </div>
                        
                        <button
                          onClick={() => {
                            const payload = {};
                            if (rating > 0) payload.rating = parseInt(rating);
                            const hours = parseFloat(hoursPlayed);
                            if (!isNaN(hours)) payload.hoursPlayed = hours;
                            handleAction("UPDATE", payload);
                          }}
                          disabled={actionStatus === "loading"}
                          className={`w-full py-3 neo-border-thick dark:border-white font-black uppercase neo-transition ${
                            actionStatus === "success" ? "bg-emerald-400" : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-yellow-400 dark:hover:text-black"
                          }`}
                        >
                          {actionStatus === "loading" ? "Saving..." : actionStatus === "success" ? "Saved!" : "Update Log"}
                        </button>
                      </div>

                      <button
                        onClick={() => handleAction("DELETE")}
                        disabled={actionStatus === "loading"}
                        className="w-full bg-red-500 dark:bg-red-600 text-white py-3 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white font-black uppercase text-sm neo-transition hover:bg-red-600 dark:hover:bg-red-700"
                      >
                        {actionStatus === "loading" ? "Removing..." : "Eject from Library"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          imageUrl={game.screenshots?.[selectedImageIndex]}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() => setSelectedImageIndex((i) => (i + 1) % game.screenshots.length)}
          onPrev={() => setSelectedImageIndex((i) => (i - 1 + game.screenshots.length) % game.screenshots.length)}
        />
      )}
    </MainLayout>
  );
};

export default GamePage;
