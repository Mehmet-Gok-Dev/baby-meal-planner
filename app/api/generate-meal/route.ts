// app/api/generate-meal/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing environment variable OPENAI_API_KEY");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { age, ingredients, allergies } = body;
    const preferences = body.preferences || [];

    if (!ingredients) {
      return NextResponse.json({ error: 'Ingredients are required.' }, { status: 400 });
    }

    // --- PROMPT HAS BEEN IMPROVED FOR RELIABILITY ---
    const prompt = `
      You are an assistant who generates baby meal ideas.
      Generate THREE (3) distinct meal ideas based on the following details:
      - Baby's Age: ${age}
      - Available Ingredients: "${ingredients}"
      - Allergies to AVOID: ${allergies.length > 0 ? allergies.join(', ') : 'None'}
      - Dietary Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'None'}

      For each of the three meal ideas, you must provide:
      1. Meal Name: [A creative name]
      2. Ingredients: [List of ingredients]
      3. Simple Steps: [3-4 easy steps]
      4. Quick Tip: [A helpful tip]

      This is the most important rule: You MUST separate each of the three complete meal ideas with the exact string "--- MEAL IDEA SEPARATOR ---".
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const singleStringResponse = completion.choices[0]?.message?.content;
    
    // --- THIS IS THE NEW DEBUGGING CODE ---
    // It will show us exactly what the AI sent back in our terminal.
    console.log('----------- RAW AI RESPONSE -----------');
    console.log(singleStringResponse);
    console.log('------------------------------------');

    if (!singleStringResponse) {
      throw new Error('Could not get a response from the AI.');
    }

    const mealIdeas = singleStringResponse.split('--- MEAL IDEA SEPARATOR ---').map(idea => idea.trim());

    // --- MORE DEBUGGING ---
    console.log('----------- PROCESSED MEAL IDEAS ARRAY -----------');
    console.log(mealIdeas);
    console.log('---------------------------------------------');


    return NextResponse.json({ mealIdeas });

  } catch (error: any) {
    console.error("Error in generate-meal API:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate meal idea.' }, { status: 500 });
  }
}