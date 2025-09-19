// contexts/CookieConsentContext.tsx
'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// The shape of the consent state
export type ConsentState = {
  analytics: boolean;
  advertising: boolean;
} | null;

// The context type
type CookieConsentContextType = {
  consent: ConsentState;
  setConsent: (newConsent: NonNullable<ConsentState>) => void;
  resetConsent: () => void;
};

// Create the context with sensible defaults
const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  setConsent: () => {},
  resetConsent: () => {},
});

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsentState] = useState<ConsentState>(null);

  // Load saved consent on first render
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

  // Save consent to state + localStorage
  const setConsent = (newConsent: NonNullable<ConsentState>) => {
    setConsentState(newConsent);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  // Clear consent completely
  const resetConsent = () => {
    setConsentState(null);
    localStorage.removeItem('cookie_consent');
  };

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// Hook for components to use
export const useCookieConsent = () => useContext(CookieConsentContext);
