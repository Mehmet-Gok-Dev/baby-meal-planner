// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Header from '@/components/Header';

// --- NEW IMPORTS FOR COOKIE CONSENT ---
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AnalyticsAndAdScripts from '@/components/AnalyticsAndAdScripts';
// --- END NEW IMPORTS ---

export const metadata: Metadata = {
  title: "Baby Meal Planner | Instant, AI-Powered Meal Ideas",
  description: "Struggling with what to feed your baby? Get instant, personalized, and healthy meal plans for babies and toddlers. AI-powered and parent-approved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* The Provider wraps everything to manage the consent state globally */}
        <CookieConsentProvider>
          <Header />
          <main>{children}</main> {/* It's good practice to wrap page content in a <main> tag */}

          {/* The visible banner component. It will only render if consent has not been given. */}
          <CookieConsentBanner />

          {/* This new component replaces your old Analytics component. It will only load scripts if consent is granted. */}
          <AnalyticsAndAdScripts />
        </CookieConsentProvider>
      </body>
    </html>
  );
}