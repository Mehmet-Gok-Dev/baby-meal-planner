// components/CookieConsentBanner.tsx
'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/contexts/CookieConsentContext'; // Adjust path if needed

export default function CookieConsentBanner() {
  const { consent, setConsent } = useCookieConsent();

  // If the user has already made a choice, don't show the banner
  if (consent) {
    return null;
  }

  const handleAcceptAll = () => {
    setConsent({ analytics: true, advertising: true });
  };

  const handleRejectAll = () => {
    setConsent({ analytics: false, advertising: false });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies to enhance your experience and for analytics and advertising.
          By clicking "Accept All", you agree to our use of cookies.
          Learn more in our{' '}
          <Link href="/cookies" className="font-semibold text-white underline hover:text-gray-200">
            Cookie Policy
          </Link>.
        </p>
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}