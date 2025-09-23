'use client';

import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import { useState } from 'react';

export default function ReviewPage() {
  // We'll use a state to trigger refresh in ReviewList
  const [refresh, setRefresh] = useState(false);

  const handleReviewSubmitted = () => {
    // Toggle refresh to signal ReviewList to reload
    setRefresh((prev) => !prev);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reviews & Ratings</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Your Review</h2>
        <ReviewForm onSubmitted={handleReviewSubmitted} />
      </section>

      <section>
        <ReviewList refresh={refresh} />
      </section>
    </main>
  );
}
