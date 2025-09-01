// app/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabase-client';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link'; // IMPORTED Link component

export default function HomePage() {
  // --- AUTHENTICATION STATE ---
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setSession(data.session);
        setIsLoadingUser(false);
      }
    };
    getSession();
  }, [router]);

  // --- APPLICATION STATE (Your Meal Generator) ---
  const [age, setAge] = useState('6-8 months');
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [mealIdea, setMealIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- HANDLER FUNCTIONS ---
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAllergies([...allergies, e.target.value]);
    } else {
      setAllergies(allergies.filter((allergy) => allergy !== e.target.value));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setMealIdea('');
    try {
      const response = await fetch('/api/generate-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, ingredients, allergies, preferences }),
      });
      if (!response.ok) throw new Error('Failed to generate meal idea.');
      const data = await response.json();
      setMealIdea(data.mealIdea);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  
  // --- RENDER LOGIC ---
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        
        {/* --- UPDATED HEADER SECTION --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">👶 AI Baby Meal Ideas</h1>
          {session && (
            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
                My Account
              </Link>
              <button onClick={handleSignOut} className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
                Sign Out
              </button>
            </div>
          )}
        </div>
        
        {/* --- FORM JSX (No changes needed) --- */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Baby's Age</label>
            <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
              <option>6-8 months</option>
              <option>9-12 months</option>
              <option>12+ months</option>
            </select>
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients You Have</label>
            <input type="text" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="e.g., chicken, sweet potato, broccoli" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900" />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Allergies</span>
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
            {isLoading ? 'Generating...' : 'Generate Meal Idea'}
          </button>
        </form>

        {/* --- RESULTS JSX (No changes needed, disclaimer is gone) --- */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {mealIdea && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Meal Ideas!</h2>
            <div className="whitespace-pre-wrap text-gray-700">{mealIdea}</div>
            <div className="mt-6 text-center">
              <button type="button" onClick={handleSubmit} disabled={isLoading} className="py-2 px-5 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50">
                {isLoading ? 'Generating...' : 'Regenerate'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}