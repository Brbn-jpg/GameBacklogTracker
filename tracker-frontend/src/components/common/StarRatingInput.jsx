import React, { useState } from "react";

const StarRatingInput = ({ rating, onChange, maxRating = 10 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-wrap gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hover || rating);
        
        return (
          <button
            type="button"
            key={starValue}
            className={`
              w-8 h-8 neo-border font-black text-xs transition-all
              ${isActive ? "bg-yellow-400 text-black translate-x-[1px] translate-y-[1px] neo-shadow-none" : "bg-white text-black/20 hover:bg-gray-100 neo-shadow"}
            `}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            {starValue}
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
