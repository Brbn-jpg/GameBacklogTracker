import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const WishlistGameCard = ({ game, onRemove }) => {
  return (
    <div className="group relative bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col h-full overflow-hidden">
      <Link to={`/games/${game.gameId}`} className="block flex-grow">
        <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-black">
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 left-2 bg-cyan-400 dark:bg-cyan-500 text-black px-2 py-1 neo-border border-black dark:border-white text-[10px] font-black uppercase">
            Wishlist
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-black transition-colors">
          <h3 className="text-xl font-black uppercase italic leading-tight tracking-tighter group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 text-black dark:text-white">
            {game.gameTitle}
          </h3>
        </div>
      </Link>
      
      <button
        onClick={() => onRemove(game.id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 neo-border border-black dark:border-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Remove from wishlist"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default WishlistGameCard;
