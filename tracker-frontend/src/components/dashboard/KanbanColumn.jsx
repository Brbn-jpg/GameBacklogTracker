import React from "react";
import GameCard from "./GameCard";
import { useDrop } from "react-dnd";

const ItemTypes = {
  GAME_CARD: "gamecard",
};

const KanbanColumn = ({
  title,
  statusId,
  games,
  colorClass,
  badgeColor,
  onDrop,
  onRemove,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.GAME_CARD,
      drop: (item) => onDrop(item.id, statusId),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [statusId, onDrop]
  );

  return (
    <div
      ref={drop}
      className={`flex flex-col w-full min-w-[300px] h-full max-h-full rounded-xl bg-slate-900/50 border ${colorClass} ${
        isOver ? "bg-slate-700/50" : ""
      } overflow-hidden transition-colors duration-200`}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/30">
        <div className={`flex items-center space-x-2 font-bold ${badgeColor}`}>
          <span
            className={`w-3 h-3 rounded-full ${badgeColor.replace(
              "text-",
              "bg-"
            )}`}
          ></span>
          <span>{title}</span>
        </div>
        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">
          {games.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent min-h-0">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
