import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () =>
            cookieStore.getAll().map(c => ({ name: c.name, value: c.value })),
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
    }

    const { title, ingredients, steps } = await req.json();

    const { error } = await supabase.from('saved_meals').insert([
      {
        user_id: session.user.id,
        title,
        ingredients,
        steps,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save meal.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Save Meal API error:', err);
    return NextResponse.json({ error: 'Failed to save meal.' }, { status: 500 });
  }
}
