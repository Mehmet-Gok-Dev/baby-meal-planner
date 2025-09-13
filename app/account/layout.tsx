// app/account/layout.tsx
import type { Metadata } from 'next';

// This is a Server Component, so exporting metadata here is the correct pattern.
export const metadata: Metadata = {
  title: 'My Account | Baby Meals Planner',
  description: 'Manage your account details and preferences for Baby Meals Planner.',
};

// The layout receives the page component as a `children` prop
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Render the page content
}