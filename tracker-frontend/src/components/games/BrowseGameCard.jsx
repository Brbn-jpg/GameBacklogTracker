import React from "react";
import { Link } from "react-router-dom";

const BrowseGameCard = ({ game }) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group relative bg-slate-800/40 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1"
    >
      <img
        src={game.headerImage}
        alt={game.name}
        className="w-full h-auto aspect-[3/4] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-bold text-lg">{game.name}</h3>
        <p className="text-gray-300 text-sm mt-1">
          Release: {game.releaseDate}
        </p>
        <p className="text-gray-400 text-sm">Developer: {game.developers}</p>
        <p className="text-gray-400 text-sm">Publisher: {game.publishers}</p>
        <p className="text-cyan-400 font-bold mt-2">
          {game.price === 0 ? "free" : game.price + " $"}
        </p>
      </div>
    </Link>
  );
};

export default BrowseGameCard;
