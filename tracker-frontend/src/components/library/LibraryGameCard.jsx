import React from 'react';
import { Link } from 'react-router-dom';

const LibraryGameCard = ({ game }) => {
  return (
    <Link to={`/games/${game.gameId}`} className="block group">
      <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2">
        <img
          src={game.headerImage}
          alt={game.gameTitle}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="p-4 relative">
          <h3 className="text-white text-lg font-bold truncate group-hover:text-cyan-400 transition-colors">
            {game.gameTitle}
          </h3>
          <div className="mt-2 text-sm text-gray-300">
            <p><span className="font-semibold">Status:</span> {game.status}</p>
            <p><span className="font-semibold">Hours:</span> {game.hoursPlayed}</p>
            <p><span className="font-semibold">Rating:</span> {game.rating}/10</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryGameCard;
