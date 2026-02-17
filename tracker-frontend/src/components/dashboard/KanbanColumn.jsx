import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { useDrop } from "react-dnd";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
  readOnly = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Reset collapse state on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.GAME_CARD,
      canDrop: () => !readOnly && !isCollapsed,
      drop: (item) => !readOnly && onDrop && onDrop(item.id, statusId),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [statusId, onDrop, readOnly, isCollapsed]
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      ref={!readOnly ? drop : null}
      className={`flex flex-col w-full bg-white neo-border-thick transition-all duration-300 ${
        isOver && !readOnly && !isCollapsed ? "bg-yellow-50" : ""
      } ${isCollapsed ? "h-auto md:h-full" : "min-h-[150px] md:min-h-[500px] h-full"}`}
    >
      <div 
        className={`p-4 border-b-4 border-black flex items-center justify-between ${badgeColor} md:cursor-default cursor-pointer hover:opacity-90 md:hover:opacity-100 transition-opacity`}
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-3">
          <button className="text-sm focus:outline-none md:hidden">
            {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </button>
          <h3 className="text-xl font-black uppercase tracking-tighter italic select-none">{title}</h3>
        </div>
        <span className="bg-black text-white text-xs font-black px-2 py-1 neo-shadow-none">
          {games.length}
        </span>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar animate-[fadeIn_0.3s_ease-out] ${isCollapsed ? "hidden md:block" : "block"}`}>
        {games.length === 0 ? (
          <div className="h-full flex items-center justify-center border-4 border-dashed border-black/10 p-10">
            <span className="text-xs font-black uppercase text-black/20 italic text-center">No Data in Sector</span>
          </div>
        ) : (
          games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onRemove={onRemove} 
              onMove={onDrop} 
              readOnly={readOnly}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
