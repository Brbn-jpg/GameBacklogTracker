import React from 'react';
import { Link } from 'react-router-dom';

const LibraryGameCard = ({ game }) => {
  return (
    <Link to={`/games/${game.gameId}`} className="group block">
      <div className="bg-white neo-border-thick neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col h-full overflow-hidden">
        {/* Cover Section */}
        <div className="relative aspect-video border-b-4 border-black overflow-hidden">
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 neo-border text-[10px] font-black uppercase">
            {game.status}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow bg-white">
          <h3 className="text-xl font-black uppercase italic leading-tight tracking-tighter group-hover:text-yellow-500 transition-colors line-clamp-2 mb-4">
            {game.gameTitle}
          </h3>
          
          <div className="mt-auto space-y-2">
            <div className="flex justify-between items-center border-t-2 border-black pt-2">
              <span className="text-[10px] font-black uppercase text-black/40">Logged</span>
              <span className="bg-black text-white px-1.5 py-0.5 text-xs font-black uppercase">
                {game.hoursPlayed}H
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-black/40">Rating</span>
              <span className="bg-cyan-400 text-black px-1.5 py-0.5 text-xs font-black uppercase neo-border">
                {game.rating}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryGameCard;
