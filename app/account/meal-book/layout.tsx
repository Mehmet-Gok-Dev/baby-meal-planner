import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Meal Book | Baby Meals Planner',
  description: 'View and manage all your saved meal ideas.',
};

export default function MealBookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">📖 My Meal Book</h1>
          <p className="text-gray-700">
            Here you can view, save, and manage all your favorite meal ideas for your little one.
          </p>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
