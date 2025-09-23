'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function AccountPage() {
  const supabase = createClient();
  const { resetConsent } = useCookieConsent();

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
    const subject = 'Account Deletion Request';
    const body = `Please delete my account and all associated data for the email address: ${email}. I understand this action is permanent.`;
    const supportEmail = 'support@babymealsplanner.com';

    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleManageConsent = () => {
    resetConsent();
    alert('Your cookie consent has been reset. You will see the consent banner again on your next page load.');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading account details...</div>;
  }

  return (
    <>
      <Head>
        <title>My Account | Baby Meals Planner</title>
        <meta
          name="description"
          content="Manage your Baby Meals Planner account, update preferences, and control marketing and cookie settings."
        />

        {/* Open Graph */}
        <meta property="og:title" content="My Account | Baby Meals Planner" />
        <meta
          property="og:description"
          content="Manage your Baby Meals Planner account, update preferences, and control marketing and cookie settings."
        />
        <meta property="og:url" content="https://www.babymealsplanner.com/account" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.babymealsplanner.com/social-preview.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Account | Baby Meals Planner" />
        <meta
          name="twitter:description"
          content="Manage your Baby Meals Planner account, update preferences, and control marketing and cookie settings."
        />
        <meta name="twitter:image" content="https://www.babymealsplanner.com/social-preview.png" />
      </Head>

      <main className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-10">
        {/* ...existing JSX for account page... */}
      </main>
    </>
  );
}
