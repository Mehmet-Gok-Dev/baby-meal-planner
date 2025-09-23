'use client';

import { useState } from 'react';

interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  editable?: boolean;
}

export default function StarRating({ value = 0, onChange, editable = true }: StarRatingProps) {
  const [rating, setRating] = useState(value);

  const handleClick = (index: number) => {
    if (!editable) return;
    setRating(index);
    if (onChange) onChange(index);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-yellow-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
