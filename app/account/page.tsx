// FILE: app/account/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function AccountPage() {
  const supabase = createClient();
  
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const router = useRouter();

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
  }, [supabase]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session);
          await getProfile(session);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          router.push('/login');
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, getProfile, supabase]);

  const handleUpdatePreferences = async () => {
    if (!session) return;
    setMessage('');
    
    const { error } = await supabase
      .from('profiles')
      .update({ marketing_consent: marketingConsent })
      .eq('id', session.user.id);
    
    if (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
    } else {
      setMessage('Preferences updated successfully!');
      setMessageType('success');
    }
  };
  
  const handleDeleteAccount = () => {
    if (!session?.user.email) {
        setMessage('Could not identify your user account. Please try again.');
        setMessageType('error');
        return;
    }
      
    const email = session.user.email;
    const subject = "Account Deletion Request";
    const body = `Please delete my account and all associated data for the email address: ${email}. I understand this action is permanent.`;
    
    const supportEmail = 'support@babymealplanner.com';
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading account details...</div>;
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
            <Link href="/" className="text-sm font-semibold text-indigo-600 hover:underline">
                &larr; Back to App
            </Link>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Details</h2>
          <div className="mt-2 p-4 bg-gray-50 rounded-md text-gray-900">
            <p><strong>Email:</strong> {session?.user.email}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Preferences</h2>
          <div className="mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="text-gray-800">Receive marketing emails and newsletters.</span>
            </label>
          </div>
          <button onClick={handleUpdatePreferences} className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Save Preferences
          </button>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-500 mt-2">To delete your account, you will be prompted to send an email request. This is a permanent action.</p>
          <button onClick={handleDeleteAccount} className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
            Request Account Deletion
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}