// app/page.tsx
'use client';

import { useState } from 'react';

export default function HomePage() {
  // === STATE MANAGEMENT ===
  const [age, setAge] = useState('6-8 months');
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);

  const [mealIdea, setMealIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // New state to control the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === HANDLER FUNCTIONS ===
  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAllergies([...allergies, e.target.value]);
    } else {
      setAllergies(allergies.filter((allergy) => allergy !== e.target.value));
    }
  };

  // This is the original AI-calling function, now simplified
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

      if (!response.ok) {
        throw new Error('Failed to generate meal idea. Please try again.');
      }

      const data = await response.json();
      setMealIdea(data.mealIdea);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // New function: triggered by the main form button to open the modal
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  
  // New function: triggered by the "Accept" button in the modal
  const handleAcceptAndGenerate = () => {
    setIsModalOpen(false); // First, close the modal
    handleSubmit();       // Then, call the AI
  };

  // === JSX - THE USER INTERFACE ===
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          👶 Instant Baby Meal Ideas
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Tell us what you have, and we'll whip up a yummy, safe meal idea for your little one.
        </p>

        {/* The form now calls handleFormSubmit to open the modal */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Age Selector */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Baby's Age</label>
            <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
              <option>6-8 months</option>
              <option>9-12 months</option>
              <option>12+ months</option>
            </select>
          </div>

          {/* Ingredients Input */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients You Have</label>
            <input type="text" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="e.g., chicken, sweet potato, broccoli" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900" />
          </div>

          {/* Allergies */}
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

        {/* --- Results Section --- */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {mealIdea && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Meal Ideas!</h2>
            <div className="whitespace-pre-wrap text-gray-700">{mealIdea}</div>

            {/* Regenerate button (no changes needed here) */}
            <div className="mt-6 text-center">
                <button 
                    type="button" 
                    onClick={handleAcceptAndGenerate} // This can also re-trigger the generation
                    disabled={isLoading}
                    className="py-2 px-5 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Regenerate with same ingredients'}
                </button>
            </div>
          </div>
        )}
      </div>

      {/* --- DISCLAIMER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer & Agreement</h2>
            <div className="text-sm text-gray-600 space-y-3 max-h-60 overflow-y-auto pr-2">
              <p>This AI tool is for informational purposes only and is **not a substitute for professional medical or nutritional advice.**</p>
              <p>Always consult with a qualified healthcare provider or pediatrician before making dietary changes for your baby. You are solely responsible for ensuring all food is prepared safely, is appropriate for your child's age to prevent choking, and is free of any allergens specific to your child.</p>
              <p>By clicking "Accept," you acknowledge and agree to these terms.</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleAcceptAndGenerate}
                className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
              >
                Accept & Generate
              </button>
            </div>
          </div>
        </div>
      )}
{/* --- FOOTER --- */}
<footer className="w-full max-w-2xl text-center py-4">
  <p className="text-xs text-gray-400">
    &copy; {new Date().getFullYear()} Baby Meal Planner. All rights reserved.
  </p>
</footer>
    </main>
  );
}