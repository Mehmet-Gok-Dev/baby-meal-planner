// app/login/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login or Sign Up | Baby Meals Planner',
  description: 'Create a free account or log in to get instant, AI-powered meal ideas. Save your preferences and meal plans.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}