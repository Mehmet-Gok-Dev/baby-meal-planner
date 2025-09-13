// app/api/generate/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(c => {
            // ✅ Fixed: no path here, just set name + value
            cookieStore.set(c.name, c.value);
          });
        },
      },
    }
  );

  // Check user session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
  }

  // Check OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is missing.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const body = await req.json();
    const { age, ingredients, allergies } = body;

    if (!age || !ingredients) {
      return NextResponse.json({ error: 'Missing age or ingredients.' }, { status: 400 });
    }

    const allergyList = allergies
      ? Object.keys(allergies).filter(k => allergies[k]).join(', ')
      : 'None';

    const prompt = `Create 3 different simple, safe, healthy baby meals. 
Baby's Age: ${age}.
Ingredients available: ${ingredients}.
Allergies to avoid: ${allergyList || 'None'}.
Provide a short, creative name for each meal, followed by simple preparation steps.
Separate each meal with two newlines. Do NOT use numbered lists or labels like "Meal 1".`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 400,
    });

    const text = response.choices?.[0]?.message?.content || '';
    const meals = text.split(/\n{2,}/).map(m => m.trim()).filter(Boolean);

    return NextResponse.json({ mealIdeas: meals });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to generate meals.' }, { status: 500 });
  }
}
