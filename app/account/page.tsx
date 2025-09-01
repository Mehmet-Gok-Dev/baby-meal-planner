// app/account/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';

// Best practice: Initialize the client directly in the file that needs it.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const router = useRouter();

  // This function fetches the user's profile data. It's safe to use useCallback.
  const getProfile = useCallback(async (currentSession: Session) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('marketing_consent')
      .eq('id', currentSession.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setMessage('Could not load your profile data.');
      setMessageType('error');
    }
    if (data) {
      setMarketingConsent(data.marketing_consent);
    }
  }, []);

  // ▼▼▼ THE MAJOR FIX IS HERE ▼▼▼
  // Use onAuthStateChange for robust session management.
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // User is logged in
          setSession(session);
          await getProfile(session);
          setIsLoading(false);
        } else {
          // User is not logged in, redirect them
          setIsLoading(false);
          router.push('/login');
        }
      }
    );

    // This is the cleanup function that runs when the component unmounts.
    // It's crucial for preventing memory leaks.
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, getProfile]);

  // (The rest of your functions: handleUpdatePreferences, handleDeleteAccount, etc. remain the same)
  const handleUpdatePreferences = async () => { /* ... your existing code ... */ };
  const handleDeleteAccount = () => { /* ... your existing code ... */ };
  // Make sure to copy your existing handleUpdatePreferences and handleDeleteAccount functions here.
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading account details...</div>;
  }

  // --- JSX for the page ---
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-10">
        {/* ... Paste your entire existing JSX return block here ... */}
        {/* It starts with <div className="w-full max-w-lg..."> */}
    </main>
  );
}