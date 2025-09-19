'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type ConsentState = {
  analytics: boolean;
  advertising: boolean;
} | null;

type CookieConsentContextType = {
  consent: ConsentState;
  setConsent: (newConsent: NonNullable<ConsentState>) => void;
  resetConsent: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  setConsent: () => {},
  resetConsent: () => {},
});

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsentState] = useState<ConsentState>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      try {
        setConsentState(JSON.parse(stored));
      } catch (err) {
        console.error('Invalid cookie consent in localStorage', err);
        localStorage.removeItem('cookie_consent');
      }
    }
  }, []);

  const setConsent = (newConsent: NonNullable<ConsentState>) => {
    setConsentState(newConsent);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));

    // Update Google Consent Mode immediately
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: newConsent.advertising ? 'granted' : 'denied',
      });
    }
  };

  const resetConsent = () => {
    setConsentState(null);
    localStorage.removeItem('cookie_consent');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => useContext(CookieConsentContext);
