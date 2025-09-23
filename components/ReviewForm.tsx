'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmitted?: () => void; // Callback after successful submission
}

export default function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const supabase = createClient();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!name || rating < 1) {
      setMessage('Please provide your name and a rating.');
      return;
    }

    const { error } = await supabase.from('reviews').insert({
      name,
      rating,
      comment,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Review submitted successfully!');
      setName('');
      setRating(0);
      setComment('');
      if (onSubmitted) onSubmitted(); // <-- notify parent to refresh
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full border px-3 py-2 rounded-md"
        required
      />

      <div>
        <label className="block text-gray-700 mb-1">Rating</label>
        <StarRating value={rating} editable={true} onChange={setRating} />
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review (optional)"
        className="w-full border px-3 py-2 rounded-md"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Submit Review
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}
