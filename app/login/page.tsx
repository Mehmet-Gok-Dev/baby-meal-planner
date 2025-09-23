import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | Baby Meals Planner',
  description:
    'Sign in to your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies.',

  // Open Graph metadata
  openGraph: {
    title: 'Login | Baby Meals Planner',
    description:
      'Sign in to your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies.',
    url: 'https://www.babymealsplanner.com/login',
    siteName: 'Baby Meals Planner',
    images: [
      {
        url: 'https://www.babymealsplanner.com/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Baby Meals Planner - Healthy meal ideas for your baby',
      },
    ],
    type: 'website',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Login | Baby Meals Planner',
    description:
      'Sign in to your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies.',
    images: ['https://www.babymealsplanner.com/social-preview.png'],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
