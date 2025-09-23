'use client';

import { useState } from 'react';

interface StarRatingProps {
  value?: number; // e.g., 3.3
  onChange?: (value: number) => void;
  editable?: boolean;
  totalStars?: number;
}

export default function StarRating({
  value = 0,
  onChange,
  editable = true,
  totalStars = 5,
}: StarRatingProps) {
  const [rating, setRating] = useState(value);

  const handleClick = (index: number) => {
    if (!editable) return;
    setRating(index);
    if (onChange) onChange(index);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, i) => {
        const starNumber = i + 1;

        let fillPercentage = 0;
        if (starNumber <= Math.floor(rating)) fillPercentage = 100;
        else if (starNumber - rating < 1) fillPercentage = (rating - Math.floor(rating)) * 100;

        return (
          <div
            key={i}
            className="relative w-6 h-6 cursor-pointer text-yellow-400"
            onClick={() => handleClick(starNumber)}
          >
            {/* Empty star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute w-6 h-6 top-0 left-0 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>

            {/* Filled star */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 top-0 left-0 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
