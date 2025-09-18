'use client';

import { useState } from 'react';

interface Meal {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
}

export default function MealBookClient({ initialMeals }: { initialMeals: Meal[] }) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);

  async function handleRemove(id: string) {
    const res = await fetch('/api/remove-meal', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMeals(meals.filter(m => m.id !== id)); // update UI without reload
    } else {
      alert('Failed to remove meal.');
    }
  }

  if (meals.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-700">
        No saved meals yet.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-indigo-700 mb-2">📖 My Meal Book</h1>
      <p className="text-gray-600 mb-6">
        Here you can view, save, and manage all your favorite meal ideas for your little one.
      </p>

      <div className="space-y-6">
        {meals.map(meal => (
          <div
            key={meal.id}
            className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-900">{meal.title}</h2>
              <button
                onClick={() => handleRemove(meal.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            <p className="font-semibold text-gray-800">Ingredients:</p>
            <ul className="list-disc list-inside mb-2 text-gray-800">
              {meal.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <p className="font-semibold text-gray-800">Steps:</p>
            <ul className="list-disc list-inside text-gray-800">
              {meal.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
