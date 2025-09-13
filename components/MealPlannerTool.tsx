'use client';

import { useState } from 'react';

export default function MealPlannerTool() {
  const [age, setAge] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [allergies, setAllergies] = useState({
    dairy: false,
    gluten: false,
    nuts: false,
    soy: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mealIdeas, setMealIdeas] = useState<string[]>([]);
  const [allergyText, setAllergyText] = useState<string>('');

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAllergies(prev => ({ ...prev, [name]: checked }));
  };

  const generateMeals = async () => {
    if (!age || !ingredients.trim()) {
      setError('Please enter age and ingredients.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMealIdeas([]);
    setAllergyText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, ingredients, allergies }),
      });

      if (!response.ok) {
        if (response.status === 401) setError('Your session has expired. Please log in again.');
        else setError('Something went wrong. Please try again later.');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      if (data.error) setError(data.error);
      else {
        // Bold selected allergies and keep background
        const selectedAllergies = (Object.keys(allergies) as (keyof typeof allergies)[])
          .filter(k => allergies[k]);
        const allergyNotice = selectedAllergies.length
          ? `You've selected the following allergies: ${selectedAllergies.map(a => `<strong>${a}</strong>`).join(', ')}. While we've instructed the AI to avoid these, please always double-check the ingredients and preparation steps for safety.`
          : '';
        setAllergyText(allergyNotice);

        // Remove any “Meal 1:”, “Meal 2:” etc. and split into array for separate boxes
        const mealsArray = (data.mealIdeas || [])
          .map((m: string) => m.replace(/Meal\s*\d+\s*:/gi, '').trim())
          .filter(Boolean);
        setMealIdeas(mealsArray);
      }

    } catch (err) {
      console.error(err);
      setError('Failed to generate meals. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        AI-Powered Meal Plans for Your Little One
      </h1>
      <p className="text-center text-gray-600 mt-2 mb-6">
        Get instant, healthy, and safe meal ideas based on the ingredients you provide.
      </p>

      <div className="space-y-4">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Baby's Age</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-md ${age ? 'text-black' : 'text-gray-500'}`}
          >
            <option value="" disabled>Choose age</option>
            <option>6-8 months</option>
            <option>9-11 months</option>
            <option>12+ months</option>
          </select>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients You Have</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className={`w-full p-2 border border-gray-300 rounded-md ${ingredients ? 'text-black' : 'text-gray-500'}`}
            placeholder=""
          />
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(allergies).map(allergy => (
              <label key={allergy} className="flex items-center space-x-2 text-black">
                <input
                  type="checkbox"
                  name={allergy}
                  checked={allergies[allergy as keyof typeof allergies]}
                  onChange={handleAllergyChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="capitalize">{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generateMeals}
          disabled={isLoading}
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isLoading ? 'Generating...' : 'Generate Meals'}
        </button>

        {/* Errors */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>
        )}

        {/* Allergy notice with background */}
        {allergyText && (
          <p
            className="mt-4 text-black text-sm bg-yellow-100 p-3 rounded-md"
            dangerouslySetInnerHTML={{ __html: allergyText }}
          />
        )}

        {/* Separate boxes for each meal */}
        {mealIdeas.length > 0 && mealIdeas.map((meal, idx) => (
          <div key={idx} className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-lg whitespace-pre-wrap text-gray-700">
            {meal}
          </div>
        ))}

        {/* Regenerate button */}
        {mealIdeas.length > 0 && !isLoading && (
          <button
            onClick={generateMeals}
            className="mt-4 w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Regenerate Meals
          </button>
        )}
      </div>
    </div>
  );
}
