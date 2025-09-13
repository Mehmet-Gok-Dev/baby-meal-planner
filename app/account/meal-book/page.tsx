// app/account/meal-book/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

// Define a type for our saved meal object for better TypeScript support
type SavedMeal = {
  id: number;
  created_at: string;
  meal_content: string;
};

export default function MealBookPage() {
  const supabase = createClient();
  const [meals, setMeals] = useState<SavedMeal[]>([]);
  const [loading, setLoading] = useState(true);

  // --- THIS IS THE REWRITTEN AND CORRECTED useEffect LOGIC ---
  useEffect(() => {
    // This is an async function defined inside the hook so we can use await
    const fetchUserAndMeals = async () => {
      console.log('1. Starting to fetch user and meals...');

      // First, get the current user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setLoading(false); // Stop loading if we can't even get the session
        return;
      }

      // If there is no active session, the user is not logged in.
      if (!session) {
        console.log('2. No active session found. User is logged out.');
        setLoading(false); // Stop loading, the page will show the "please log in" message
        return;
      }

      console.log('2. Session found for user:', session.user.id);

      // Now that we have a valid session, fetch the meals for that user
      const { data, error } = await supabase
        .from('saved_meals')
        .select('*')
        .eq('user_id', session.user.id) // Ensure we only get this user's meals
        .order('created_at', { ascending: false });

      if (error) {
        console.error('3. Error fetching meals:', error);
      } else {
        console.log('3. Meals fetched successfully:', data);
        setMeals(data);
      }
      
      // CRITICAL: Whether the fetch succeeded or failed, we are done loading.
      console.log('4. Finished fetching. Setting loading to false.');
      setLoading(false);
    };

    fetchUserAndMeals();
  }, [supabase]); // The dependency array ensures this runs once on page load

  const handleDeleteMeal = async (mealId: number) => {
    const originalMeals = meals;
    setMeals(meals.filter(meal => meal.id !== mealId)); // Optimistic delete

    const { error } = await supabase.from('saved_meals').delete().eq('id', mealId);

    if (error) {
      setMeals(originalMeals); // Revert on error
      alert('Failed to delete meal.');
    }
  };

  // --- The JSX remains the same, but will now work correctly ---
  if (loading) {
    return <div className="text-center p-8">Loading your Meal Book...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Meal Book</h1>
        
        {meals.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600">You haven't saved any meals yet.</p>
            <Link href="/" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                Generate Some Ideas
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {meals.map((meal) => (
              <div key={meal.id} className="p-6 bg-white rounded-lg shadow-md relative">
                <p className="whitespace-pre-wrap text-gray-700">{meal.meal_content}</p>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="absolute top-3 right-3 px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}