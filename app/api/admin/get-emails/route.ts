// app/api/admin/get-emails/route.ts

// REMOVED the old Supabase and cookies imports
// ADDED the new server client import
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  // UPDATED the client to use the new, simpler function
  const supabase = createClient();

  // The rest of your logic is exactly the same!
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
    const emails = data.map((item: { email: string }) => item.email);

    return NextResponse.json({ emails });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}