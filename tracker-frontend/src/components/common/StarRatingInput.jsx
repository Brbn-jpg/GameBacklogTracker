import React, { useState } from "react";

const StarRatingInput = ({ rating, onChange, maxRating = 10, starColor = "text-yellow-400" }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(maxRating)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`
              ${index <= (hover || rating) ? starColor : "text-gray-400"}
              text-2xl transition-colors duration-200 focus:outline-none
            `}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
