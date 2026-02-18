import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { FaTrash, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

const ItemTypes = {
  GAME_CARD: "gamecard",
};

const GameCard = React.memo(({ game, onRemove, onMove, readOnly = false }) => {
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.GAME_CARD,
      item: { id: game.id, status: game.status },
      canDrag: !readOnly,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [game.id, game.status, readOnly]
  );

  const availableStatuses = ["DITCHED", "NOT_PLAYED", "PLAYING", "COMPLETED"].filter((s) => s !== game.status);

  // Portal for Mobile Menu to escape stacking context
  const MobileMenu = () => {
    if (!isMoveMenuOpen) return null;
    
    return createPortal(
      <div 
        className="fixed inset-0 bg-black/80 dark:bg-black/90 z-[9999] flex items-end md:items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out] transition-colors"
        onClick={() => setIsMoveMenuOpen(false)}
      >
        <div 
          className="bg-white dark:bg-black neo-border-thick dark:border-white w-full max-w-sm p-6 neo-shadow-lg dark:neo-shadow-white animate-[slideUp_0.3s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6 border-b-4 border-black dark:border-white pb-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">Relocate Asset</h3>
            <button onClick={() => setIsMoveMenuOpen(false)} className="bg-black dark:bg-white text-white dark:text-black p-2 neo-border dark:border-white">
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-3">
            {availableStatuses.map((status) => (
              <button
                key={status}
                onClick={() => { onMove(game.id, status); setIsMoveMenuOpen(false); }}
                className="w-full py-4 bg-white dark:bg-black neo-border-thick dark:border-white font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 text-black dark:text-white hover:text-black neo-shadow dark:neo-shadow-white transition-all text-left px-6"
              >
                Move to {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div
        ref={!readOnly ? drag : null}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className={`group bg-white dark:bg-black neo-border-thick dark:border-white p-4 neo-shadow dark:neo-shadow-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col gap-4 relative ${
          readOnly ? 'cursor-default' : 'cursor-grab'
        }`}
      >
        {!readOnly && (
          <button
            onClick={() => onRemove(game.id)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white neo-border border-black dark:border-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
            aria-label="Eject"
          >
            <FaTrash size={12} />
          </button>
        )}

        <div className="flex gap-4 items-center">
          <Link to={`/games/${game.gameId}`} className="shrink-0 neo-border-thick dark:border-white overflow-hidden w-16 h-20 bg-black">
            {game.headerImage ? (
              <img src={game.headerImage} alt={game.gameTitle} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            ) : (
              <div className="w-full h-full bg-black text-white flex items-center justify-center text-[10px] font-black text-center uppercase p-1">No Visual</div>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <h4 className="font-black uppercase tracking-tighter text-sm truncate leading-tight group-hover:text-yellow-500 dark:group-hover:text-yellow-400 text-black dark:text-white transition-colors">
              <Link to={`/games/${game.gameId}`}>{game.gameTitle}</Link>
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {game.hoursPlayed > 0 && (
                <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase px-1.5 py-0.5 transition-colors">
                  {game.hoursPlayed}H
                </span>
              )}
              {game.status === "COMPLETED" && game.rating > 0 && (
                <span className="bg-yellow-400 dark:bg-yellow-500 text-black text-[10px] font-black uppercase px-1.5 py-0.5 neo-border border-black dark:border-white transition-colors">
                  {game.rating}/10
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Actions Trigger */}
        {!readOnly && (
          <div className="md:hidden pt-4 border-t-2 border-black dark:border-white mt-2">
            <button
              onClick={() => setIsMoveMenuOpen(true)}
              className="w-full py-2 bg-white dark:bg-black neo-border dark:border-white font-black uppercase text-xs hover:bg-cyan-400 dark:hover:bg-cyan-500 text-black dark:text-white hover:text-black transition-colors"
            >
              Relocate Asset
            </button>
          </div>
        )}
      </div>
      <MobileMenu />
    </>
  );
});

export default GameCard;
