// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Header from '@/components/Header';

// --- NEW IMPORTS FOR COOKIE CONSENT & GA ---
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AnalyticsAndAdScripts from '@/components/AnalyticsAndAdScripts';
// --- END NEW IMPORTS ---

export const metadata: Metadata = {
  title: "Baby Meal Planner | Instant, AI-Powered Meal Ideas",
  description: "Struggling with what to feed your baby? Get instant, personalized, and healthy meal plans for babies and toddlers. AI-powered and parent-approved.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* Wrap everything with the CookieConsentProvider */}
        <CookieConsentProvider>
          <Header />

          <main>{children}</main>

          {/* Cookie consent banner */}
          <CookieConsentBanner />

          {/* Analytics scripts (only loaded if user consents) */}
          <AnalyticsAndAdScripts />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
