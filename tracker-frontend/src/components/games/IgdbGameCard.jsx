import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const IgdbGameCard = ({ game }) => {
  const { token } = useAuth();
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleAddGame = (e) => {
    e.preventDefault(); // Prevent navigating when clicking add button
    e.stopPropagation();
    performAdd();
  };

  const performAdd = async () => {
    setStatus("loading");
    try {
      // Step 1: Save the game to our backend database
      const gameResponse = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/games`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(game),
        }
      );

      if (!gameResponse.ok) throw new Error("Failed to save game to database");
      const savedGame = await gameResponse.json();

      // Step 2: Add the saved game to user's backlog
      const userGameResponse = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameId: savedGame.id,
            status: "NOT_PLAYED",
          }),
        }
      );

      if (!userGameResponse.ok) throw new Error("Failed to add game to backlog");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Link 
      to={`/igdb-games/${game.appId}`}
      className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col group"
    >
      <div className="relative aspect-video">
        <img
          src={game.headerImage || "https://via.placeholder.com/460x215?text=No+Image"}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">{game.name}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {game.developers?.join(", ") || "Unknown Developer"}
        </p>
        
        <div className="mt-auto">
          {status === "success" ? (
            <div className="w-full bg-green-600/20 text-green-400 border border-green-600/50 py-2 rounded-xl text-center font-semibold">
              Added to Library!
            </div>
          ) : (
            <button
              onClick={handleAddGame}
              disabled={status === "loading"}
              className={`w-full py-2 rounded-xl font-semibold transition-colors ${
                status === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {status === "loading" ? "Adding..." : status === "error" ? "Try Again" : "Add to Library"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default IgdbGameCard;
