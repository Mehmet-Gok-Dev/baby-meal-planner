import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import MealBookClient from './MealBookClient';

export default async function MealBookPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return (
      <p className="text-center mt-6 text-gray-700">
        Please log in to view saved meals.
      </p>
    );
  }

  const { data: meals, error } = await supabase
    .from('saved_meals')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <p className="text-center mt-6 text-red-600">
        Error loading saved meals.
      </p>
    );
  }

  return <MealBookClient initialMeals={meals || []} />;
}
