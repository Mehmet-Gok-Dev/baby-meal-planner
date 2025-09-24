'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import type { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function AccountPage() {
  const supabase = createClient();
  const { resetConsent } = useCookieConsent();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const getProfile = useCallback(async (currentSession: Session) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('marketing_consent')
      .eq('id', currentSession.user.id)
      .single();

    if (error) {
      setMessage('Could not load your profile data.');
      setMessageType('error');
    } else if (data) {
      setMarketingConsent(data.marketing_consent);
    }
  }, [supabase]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setSession(session);
        await getProfile(session);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        router.push('/login');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [getProfile, router, supabase]);

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
    if (!session?.user.email) return;
    const email = session.user.email;
    const subject = 'Account Deletion Request';
    const body = `Please delete my account and all associated data for the email: ${email}.`;
    window.location.href = `mailto:support@babymealsplanner.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleManageConsent = () => {
    resetConsent();
    alert('Cookie consent has been reset. You will see the banner again on next load.');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading account details...</div>;
  }

  return (
    <>
      <Head>
        <title>My Account | Baby Meals Planner</title>
        <meta name="description" content="Manage your Baby Meals Planner account, update preferences, and control marketing and cookie settings." />
      </Head>

      <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

          {/* Email */}
          <div>
            <p className="text-gray-700"><strong>Email:</strong> {session?.user.email}</p>
          </div>

          {/* Marketing Preferences */}
          <div className="pt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-800">Receive marketing emails and newsletters</span>
            </label>
            <button
              onClick={handleUpdatePreferences}
              className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              Save Preferences
            </button>
          </div>

          {/* Cookie Consent */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-700">Privacy Settings</h2>
            <button
              onClick={handleManageConsent}
              className="mt-4 py-2 px-4 border border-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-100"
            >
              Manage Cookie Consent
            </button>
          </div>

          {/* Account Deletion */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-700">Account Management</h2>
            <button
              onClick={handleDeleteAccount}
              className="mt-4 py-2 px-4 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50"
            >
              Request Account Deletion
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
