import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics"; // <-- 1. ADDED THIS IMPORT

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Friendly Tip: You should update this metadata for your website!
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics /> {/* <-- 2. ADDED THE COMPONENT HERE */}
      </body>
    </html>
  );
}