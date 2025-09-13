// app/account/AccountForm.tsx
'use client'; // <-- This component is interactive

import { useCookieConsent } from '@/contexts/CookieConsentContext';
import type { User } from '@supabase/supabase-js';

// We pass the user data down from the server component
export default function AccountForm({ user }: { user: User }) {
  const { resetConsent } = useCookieConsent();

  const handleManageConsent = () => {
    resetConsent();
    // Give the user feedback that something happened
    alert('Your cookie consent has been reset. You will see the consent banner again on your next page load.');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">Account</h1>
      <p className="text-gray-600 mb-6">Welcome back, {user.email}!</p>

      {/* --- NEW SECTION FOR PRIVACY SETTINGS --- */}
      <div className="border-t pt-6 mt-6">
        <h2 className="text-lg font-semibold mb-2">Privacy Settings</h2>
        <p className="text-sm text-gray-500 mb-4">
          This will reset your cookie preferences and show the consent banner again, allowing you to make a new choice.
        </p>
        <button
          onClick={handleManageConsent}
          className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Manage Cookie Consent
        </button>
      </div>
      {/* --- END NEW SECTION --- */}

      <div className="border-t pt-6 mt-6">
        <form action="/auth/sign-out" method="post">
          <button className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}