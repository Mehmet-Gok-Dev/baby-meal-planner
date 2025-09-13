// contexts/CookieConsentContext.tsx
'use client'; // This is a client-side context provider

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the consent object
type ConsentState = {
  analytics: boolean;
  advertising: boolean;
};

// Define the shape of the context value, including the reset function
type CookieConsentContextType = {
  consent: ConsentState | null;
  setConsent: (newConsent: ConsentState) => void;
  resetConsent: () => void;
};

// Create the context with a default value that matches the type
const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  setConsent: () => {},
  resetConsent: () => {},
});

// Create the provider component
export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  // On initial load, try to get the consent from localStorage
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem('cookie_consent');
      if (storedConsent) {
        setConsentState(JSON.parse(storedConsent));
      }
    } catch (error)      {
      console.error("Could not parse cookie consent from localStorage", error);
    }
  }, []);

  // This function is called by the banner to save the user's choice
  const setConsent = (newConsent: ConsentState) => {
    setConsentState(newConsent);
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
  };

  // This function is called to reset the user's choice
  const resetConsent = () => {
    setConsentState(null);
    localStorage.removeItem('cookie_consent');
  };

  return (
    // Pass the functions down to all child components
    <CookieConsentContext.Provider value={{ consent, setConsent, resetConsent }}>
      {children}
    </CookieConsentContext.Provider> // <-- THIS LINE IS NOW CORRECT
  );
};

// Create a custom hook for easy access to the context
export const useCookieConsent = () => useContext(CookieConsentContext);