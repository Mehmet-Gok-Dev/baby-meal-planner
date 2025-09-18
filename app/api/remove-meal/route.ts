import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not logged in.' }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: 'Missing meal ID.' }, { status: 400 });

    const { error } = await supabase
      .from('saved_meals')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Remove meal error:', err);
    return NextResponse.json({ error: 'Failed to remove meal.' }, { status: 500 });
  }
}
