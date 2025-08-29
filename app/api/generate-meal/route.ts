// app/api/generate-meal/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Data is received from the frontend HERE
    const { age, ingredients, allergies, preferences } = await request.json();

    if (!ingredients) {
      return NextResponse.json({ error: 'Ingredients are required.' }, { status: 400 });
    }

    // CORRECT: The prompt is now defined INSIDE the function,
    // so it has access to the 'age', 'ingredients', etc. variables.
    const prompt = `
      You are a helpful assistant specializing in safe and creative baby meal ideas.
      A parent needs simple recipes for their ${age} baby.
      The parent has these ingredients available: "${ingredients}".
      The baby has the following allergies (ensure the recipe STRICTLY AVOIDS these): ${allergies.length > 0 ? allergies.join(', ') : 'None'}.
      The family has the following dietary preferences (ensure the recipe RESPECTS these): ${preferences.length > 0 ? preferences.join(', ') : 'None'}.

      Please generate a list of THREE (3) distinct meal ideas.
      
      For each idea, provide the following in a clear, structured format:
      1.  A creative and friendly "Meal Name".
      2.  A list of "Ingredients" needed.
      3.  A "Simple Steps" section with easy-to-follow instructions.
      4.  A helpful "Quick Tip".

      Format the entire response clearly, using headings and numbering for each of the three ideas (e.g., "Idea 1:", "Idea 2:", "Idea 3:").
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const mealIdea = completion.choices[0]?.message?.content;

    if (!mealIdea) {
      throw new Error('Could not get a response from the AI.');
    }

    return NextResponse.json({ mealIdea });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate meal idea.' }, { status: 500 });
  }
}