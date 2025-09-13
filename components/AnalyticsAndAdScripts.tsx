// components/AnalyticsAndAdScripts.tsx
'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/contexts/CookieConsentContext'; // Adjust path if needed
import { useEffect } from 'react';

export default function AnalyticsAndAdScripts() {
  const { consent } = useCookieConsent();

  // Replace with your actual IDs
  const GA_TRACKING_ID = 'G-XXXXXXXXXX';
  const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

  // We use useEffect to log the decision, which helps in debugging.
  // This is optional but very useful.
  useEffect(() => {
    if (consent) {
      console.log('Cookie Consent decision made:', consent);
    }
  }, [consent]);

  return (
    <>
      {/* Conditionally render Google Analytics script */}
      {consent?.analytics && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}

      {/* Conditionally render Google AdSense script */}
      {consent?.advertising && (
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}