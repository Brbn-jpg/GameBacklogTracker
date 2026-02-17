import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const WishlistGameCard = ({ game, onRemove }) => {
  return (
    <div className="group relative bg-white neo-border-thick neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col h-full overflow-hidden">
      <Link to={`/games/${game.gameId}`} className="block flex-grow">
        <div className="relative aspect-video border-b-4 border-black overflow-hidden">
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 left-2 bg-cyan-400 text-black px-2 py-1 neo-border text-[10px] font-black uppercase">
            Wishlist
          </div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-xl font-black uppercase italic leading-tight tracking-tighter group-hover:text-yellow-500 transition-colors line-clamp-2">
            {game.gameTitle}
          </h3>
        </div>
      </Link>
      
      <button
        onClick={() => onRemove(game.id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 neo-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        aria-label="Remove from wishlist"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default WishlistGameCard;
