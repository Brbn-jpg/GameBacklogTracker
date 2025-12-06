import React from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  MOCK_CARD: 'mock_card',
};

const MockGameCard = ({ id, fromColumn }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MOCK_CARD,
    item: { id, fromColumn },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`h-20 bg-slate-700/50 rounded transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    ></div>
  );
};

export default MockGameCard;
