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
          cookiesToSet.forEach(c => cookieStore.set(c.name, c.value));
        },
      },
    }
  );

  // ✅ Check session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 });
  }

  // ✅ Check OpenAI key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is missing.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const { age, ingredients, allergies } = await req.json();
    if (!age || !ingredients) {
      return NextResponse.json({ error: 'Missing age or ingredients.' }, { status: 400 });
    }

    const allergyList = allergies
      ? Object.keys(allergies).filter(k => allergies[k]).join(', ')
      : 'None';

    // ✅ Force GPT to output valid JSON
    const prompt = `
Create 3 different simple, safe, healthy baby meals.

Baby's Age: ${age}
Ingredients available: ${ingredients}
Allergies to avoid: ${allergyList || 'None'}

Return the response in **valid JSON only**, as an array of objects like this:

[
  {
    "title": "Meal name",
    "ingredients": ["ingredient1", "ingredient2"],
    "steps": ["step 1", "step 2"]
  }
]

Do NOT include any text outside the JSON.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }, // ✅ ensures valid JSON
    });

    let meals: any[] = [];
    try {
      const raw = completion.choices?.[0]?.message?.content || '[]';
      const parsed = JSON.parse(raw);

      // Ensure it's an array
      meals = Array.isArray(parsed) ? parsed : parsed.meals || [];
    } catch (err) {
      console.error('JSON parse error:', err);
    }

    return NextResponse.json({ mealIdeas: meals });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Failed to generate meals.' }, { status: 500 });
  }
}
