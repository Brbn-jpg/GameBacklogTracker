import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const IgdbGameCard = ({ game, existingUserGameId, onActionSuccess }) => {
  const { token, isAuthenticated } = useAuth();
  const [status, setStatus] = useState("idle");

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (existingUserGameId) {
      performRemove();
    } else {
      performAdd();
    }
  };

  const performAdd = async () => {
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameId: game.appId || game.id,
            status: "NOT_PLAYED",
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to add game");
      setStatus("success");
      if (onActionSuccess) onActionSuccess();
    } catch (err) {
      setStatus("error");
    }
  };

  const performRemove = async () => {
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/usergames/${existingUserGameId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to remove game");
      setStatus("success");
      if (onActionSuccess) onActionSuccess();
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white neo-border-thick neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col group overflow-hidden">
      <Link
        to={`/igdb-games/${game.appId || game.id}`}
        className="relative aspect-video border-b-4 border-black block"
      >
        <img
          src={
            game.headerImage ||
            "https://via.placeholder.com/460x215?text=NO+IMAGE"
          }
          alt={game.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow bg-white">
        <Link to={`/igdb-games/${game.appId || game.id}`}>
          <h3 className="text-2xl font-black uppercase mb-2 line-clamp-1 italic tracking-tighter group-hover:text-yellow-500 transition-colors">
            {game.name}
          </h3>
        </Link>
        <p className="text-black/60 font-black uppercase text-xs mb-6 tracking-widest">
          {game.developers?.join(", ") || "Unknown Studio"}
        </p>

        <div className="mt-auto">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="w-full block py-3 bg-white neo-border-thick text-center font-black uppercase text-lg hover:bg-yellow-400 transition-colors"
            >
              Enlist to Add
            </Link>
          ) : (
            <button
              onClick={handleAction}
              disabled={status === "loading"}
              className={`w-full py-3 neo-border-thick font-black uppercase text-lg neo-transition ${
                existingUserGameId
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              } ${status === "error" ? "bg-black text-white" : ""}`}
            >
              {status === "loading"
                ? "Syncing..."
                : existingUserGameId
                  ? "Remove from Library"
                  : "Add to Library"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IgdbGameCard;
