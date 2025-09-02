// app/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function HomePage() {
  const supabase = createClient();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [age, setAge] = useState('6-8 months');
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [mealIdeas, setMealIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAllergies([...allergies, e.target.value]);
    } else {
      setAllergies(allergies.filter((allergy) => allergy !== e.target.value));
    }
  };

  const generateMeals = async () => {
    setIsLoading(true);
    setError('');
    setMealIdeas([]);
    try {
      const response = await fetch('/api/generate-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, ingredients, allergies }),
      });
      
      const data = await response.json();

      if (response.status !== 200 || data.error) {
        throw new Error(data.error || 'Failed to generate meal idea. Please try again.');
      }
      
      if (data.mealIdeas) {
        setMealIdeas(data.mealIdeas);
      } else {
        throw new Error('The AI did not return any meal ideas.');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateMeals();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg relative">

        <div className="w-full flex justify-end items-center space-x-4 mb-6">
          {session ? (
            <>
              <Link href="/account" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
                My Account
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
                Log Out
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
              Login
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          👶 Instant Baby Meal Ideas
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Tell us what you have, and we'll whip up some yummy, safe meal ideas for your little one.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-800">Baby's Age</label>
            <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800">
              <option>6-8 months</option>
              <option>9-12 months</option>
              <option>12+ months</option>
            </select>
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-800">Ingredients You Have</label>
            <input type="text" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="e.g., chicken, sweet potato, broccoli" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder:text-gray-800" />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-800">Allergies</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Dairy', 'Nuts', 'Gluten', 'Soy'].map((allergy) => (
                <label key={allergy} className="flex items-center space-x-2">
                  <input type="checkbox" value={allergy} onChange={handleAllergyChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                  <span className="text-gray-800">{allergy}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed">
            {isLoading ? 'Generating...' : 'Generate Meal Ideas'}
          </button>
        </form>

        {mealIdeas.length > 0 && (
          <div className="mt-8">
            
            {/* --- THIS IS THE NEW ALLERGY DISCLAIMER --- */}
            {allergies.length > 0 && (
              <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p>
                  You've selected the following allergies: <strong className="font-semibold">{allergies.join(', ')}</strong>.
                  While we've instructed the AI to avoid these, please always double-check the ingredients and preparation steps for safety.
                </p>
              </div>
            )}
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Your Meal Ideas!</h2>
            <div className="space-y-6">
              {mealIdeas.map((idea, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg whitespace-pre-wrap text-gray-700">
                  {idea}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button onClick={generateMeals} disabled={isLoading} className="py-3 px-6 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed">
                {isLoading ? 'Generating...' : 'Regenerate Ideas'}
              </button>
            </div>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}