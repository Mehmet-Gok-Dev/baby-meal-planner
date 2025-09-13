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
            cookieStore.set(c.name, c.value, { path: c.path || '/' });
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
  }

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

    const selectedAllergies = allergies
      ? Object.keys(allergies).filter(k => allergies[k])
      : [];

    const allergyText = selectedAllergies.length
      ? `You've selected the following allergies: ${selectedAllergies.join(', ')}. While we've instructed the AI to avoid these, please always double-check the ingredients and preparation steps for safety.`
      : '';

    const allergyList = selectedAllergies.join(', ') || 'None';

    const prompt = `
${allergyText}

Create 3 distinct baby meals.
Baby's Age: ${age}
Ingredients available: ${ingredients}
Allergies to avoid: ${allergyList}

For each meal, provide:
- Meal Name
- Ingredients
- Simple Steps (use short bullet points or new lines, do NOT number)
- Quick Tip

Separate each meal with two newlines. Do NOT use numbered lists.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = response.choices?.[0]?.message?.content || '';

    // Split meals by double newlines
    const meals = text.split(/\n{2,}/).map(m => m.trim()).filter(Boolean);

    return NextResponse.json({ allergyText, mealIdeas: meals });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to generate meals.' }, { status: 500 });
  }
}
