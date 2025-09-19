'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsAndAdScripts() {
  const { consent } = useCookieConsent();
  const pathname = usePathname();

  const GA_TRACKING_ID = 'G-WTWV94YMYT';
  const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your AdSense ID if you use ads

  // Debug log whenever consent changes
  useEffect(() => {
    if (consent) {
      console.log('Cookie Consent decision made:', consent);
    }
  }, [consent]);

  // Track page views when the route changes (Next.js client navigation)
  useEffect(() => {
    if (consent?.analytics && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_TRACKING_ID, {
        page_path: pathname,
      });
      console.log('GA pageview tracked:', pathname);
    }
  }, [pathname, consent]);

  return (
    <>
      {/* Google Analytics */}
      {consent?.analytics && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            onLoad={() => console.log('Google Analytics script loaded')}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              console.log('Google Analytics initialized with ID: ${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}

      {/* Google AdSense */}
      {consent?.advertising && (
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          onLoad={() => console.log('Google AdSense script loaded')}
        />
      )}
    </>
  );
}
