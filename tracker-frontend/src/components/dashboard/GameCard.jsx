import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const ItemTypes = {
  GAME_CARD: 'gamecard',
};

// --- Helper: Pobieranie kolorów na podstawie statusu ---
const getStatusColor = (status) => {
  switch (status) {
    case "DITCHED":
      return {
        bg: "bg-rose-500",
        text: "text-rose-400",
        border: "hover:border-rose-500/30",
      };
    case "NOT_PLAYED":
      return {
        bg: "bg-slate-500",
        text: "text-slate-300",
        border: "hover:border-slate-500/30",
      };
    case "PLAYING":
      return {
        bg: "bg-cyan-500",
        text: "text-cyan-400",
        border: "hover:border-cyan-500/30",
      };
    case "COMPLETED":
      return {
        bg: "bg-emerald-500",
        text: "text-emerald-400",
        border: "hover:border-emerald-500/30",
      };
    default:
      return {
        bg: "bg-slate-500",
        text: "text-slate-400",
        border: "border-white/5",
      };
  }
};

const GameCard = React.memo(({ game, onRemove, onMove }) => {
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const colors = getStatusColor(game.status);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.GAME_CARD,
      item: { id: game.id, status: game.status },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [game.id, game.status]
  );

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove(game.id);
  };

  const handleMove = (newStatus) => {
    onMove(game.id, newStatus);
    setIsMoveMenuOpen(false);
  };

  const availableStatuses = ["DITCHED", "NOT_PLAYED", "PLAYING", "COMPLETED"].filter(s => s !== game.status);

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`group bg-slate-800/80 hover:bg-slate-800 border border-white/5 ${colors.border} p-3 rounded-lg cursor-grab transition-all shadow-sm flex gap-3 relative`}
    >
      <button
        onClick={handleRemove}
        className="absolute top-1 right-1 p-1 text-slate-500 hover:text-rose-500 opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Remove game"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Mobile Move Menu Button */}
      <div className="md:hidden absolute top-8 right-1 z-10">
        <button
          onClick={() => setIsMoveMenuOpen(!isMoveMenuOpen)}
          className="p-1 text-slate-400 hover:text-white"
          aria-label="Move game"
        >
          <FaEllipsisV />
        </button>
        {isMoveMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-700 border border-slate-600 rounded-md shadow-lg">
            <p className="text-xs font-bold text-slate-300 p-2 border-b border-slate-600">Move to...</p>
            {availableStatuses.map(status => (
              <button
                key={status}
                onClick={() => handleMove(status)}
                className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image */}
      <Link to={`/games/${game.gameId}`} className="shrink-0">
        {game.headerImage ? (
          <img
            src={game.headerImage}
            alt={game.gameTitle}
            className="w-16 h-20 object-cover rounded bg-slate-950"
          />
        ) : (
          <div className="w-16 h-20 bg-slate-900 rounded flex items-center justify-center text-xs text-slate-600 font-bold text-center px-1">
            NO COVER
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden justify-center">
        <h4 className="font-bold text-slate-200 truncate group-hover:text-white text-sm">
          <Link to={`/games/${game.gameId}`}>{game.gameTitle}</Link>
        </h4>

        {/* Meta Info (Time) */}
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          {game.hoursPlayed > 0 && (
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {game.hoursPlayed}h
            </span>
          )}
        </div>

        {/* Variant: Completed Rating */}
        {game.status === "COMPLETED" && game.rating > 0 && (
          <div className="flex items-center mt-2 self-start bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {game.rating}/10
          </div>
        )}
      </div>
    </div>
  );
});

export default GameCard;
