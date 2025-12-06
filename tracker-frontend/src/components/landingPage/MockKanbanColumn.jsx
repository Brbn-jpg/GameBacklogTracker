import React from "react";
import { useDrop } from "react-dnd";
import MockGameCard, { ItemTypes } from "./MockGameCard";

const MockKanbanColumn = ({ title, cards, statusId, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.MOCK_CARD,
    drop: (item) => onDrop(item.id, statusId, item.fromColumn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-64 flex-shrink-0 h-full bg-slate-800/50 rounded-lg p-3 flex flex-col space-y-3 transition-colors ${
        isOver ? "bg-slate-700/60" : ""
      }`}
    >
      <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-2"></div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {cards.map((card) => (
          <MockGameCard key={card.id} id={card.id} fromColumn={statusId} />
        ))}
      </div>
    </div>
  );
};

export default MockKanbanColumn;
