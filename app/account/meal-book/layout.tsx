import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Meal Book | Baby Meals Planner',
  description: 'View and manage all your saved meal ideas.',
};

export default function MealBookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}