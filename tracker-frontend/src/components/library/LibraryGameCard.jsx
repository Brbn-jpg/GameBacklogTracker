import React from 'react';
import { Link } from 'react-router-dom';

const LibraryGameCard = ({ game }) => {
  return (
    <Link to={`/games/${game.gameId}`} className="group block">
      <div className="bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:hover:shadow-none transition-all flex flex-col h-full overflow-hidden">
        {/* Cover Section */}
        <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-black">
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 left-2 bg-yellow-400 dark:bg-yellow-500 text-black px-2 py-1 neo-border border-black dark:border-white text-[10px] font-black uppercase">
            {game.status}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow bg-white dark:bg-black transition-colors">
          <h3 className="text-xl font-black uppercase italic leading-tight tracking-tighter group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 mb-4 text-black dark:text-white">
            {game.gameTitle}
          </h3>
          
          <div className="mt-auto space-y-2">
            <div className="flex justify-between items-center border-t-2 border-black dark:border-white pt-2">
              <span className="text-[10px] font-black uppercase text-black/60 dark:text-white/60">Logged</span>
              <span className="bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 text-xs font-black uppercase transition-colors">
                {game.hoursPlayed}H
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-black/60 dark:text-white/60">Rating</span>
              <span className="bg-cyan-400 dark:bg-cyan-500 text-black px-1.5 py-0.5 text-xs font-black uppercase neo-border border-black dark:border-white transition-colors">
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
