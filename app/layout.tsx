// app/layout.tsx

import type { Metadata } from "next";
// --- UPDATED FONT IMPORTS ---
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// ---
import "./globals.css";
import Analytics from "@/components/Analytics";
import { Suspense } from 'react';

// --- DELETED old font declarations; they are no longer needed ---

export const metadata: Metadata = {
  title: "Baby Meal Planner",
  description: "Get instant, AI-powered meal ideas for your baby.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // --- UPDATED className to use the new font variables ---
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}