// app/api/admin/get-emails/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  // First, check if the person making this request is an admin (you'd build this logic later)
  // For now, let's assume the check passes.

  try {
    // This is how you call a database function (RPC)
    const { data, error } = await supabase.rpc('get_marketing_emails');

    if (error) {
      throw error;
    }

    // The 'data' will be an array of objects, like:
    // [
    //   { email: 'user1@example.com' },
    //   { email: 'user2@example.com' },
    // ]
    
    // You can extract just the email strings
    const emails = data.map(item => item.email);

    return NextResponse.json({ emails });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}