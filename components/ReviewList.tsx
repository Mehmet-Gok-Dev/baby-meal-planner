'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import StarRating from './StarRating';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewListProps {
  refresh?: boolean; // Added prop to trigger reload
}

export default function ReviewList({ refresh }: ReviewListProps) {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setReviews(data);

        const total = data.reduce((acc, r) => acc + r.rating, 0);
        const avg = data.length ? total / data.length : 0;
        setAverageRating(parseFloat(avg.toFixed(1)));
      }

      if (error) console.error(error);
    };

    fetchReviews();
  }, [supabase, refresh]); // <-- depend on `refresh`

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">User Reviews</h2>

      {reviews.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <StarRating value={averageRating} editable={false} />
          <span className="text-gray-700 font-semibold">
            {averageRating} / 5 ({reviews.length} reviews)
          </span>
        </div>
      )}

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div key={review.id} className="p-4 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">{review.name}</span>
            <StarRating value={review.rating} editable={false} />
          </div>
          {review.comment && <p className="mt-2 text-gray-600">{review.comment}</p>}
          <p className="text-xs text-gray-400 mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
