import React from "react";
import { Link } from "react-router-dom";

const WishlistGameCard = ({ game, onRemove }) => {
  return (
    <div className="relative group bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2">
      <Link to={`/games/${game.gameId}`} className="block">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="p-4 relative">
          <h3 className="text-white text-lg font-bold truncate group-hover:text-cyan-400 transition-colors">
            {game.gameTitle}
          </h3>
        </div>
      </Link>
      <button
        onClick={() => onRemove(game.id)}
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove from wishlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default WishlistGameCard;
