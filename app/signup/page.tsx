import type { Metadata } from 'next';
import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up | Baby Meals Planner',
  description:
    'Create your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies. Free and easy to use.',

  // Open Graph metadata
  openGraph: {
    title: 'Sign Up | Baby Meals Planner',
    description:
      'Create your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies. Free and easy to use.',
    url: 'https://www.babymealsplanner.com/signup',
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
    title: 'Sign Up | Baby Meals Planner',
    description:
      'Create your Baby Meals Planner account to get healthy meal ideas for your baby based on age, ingredients, and allergies.',
    images: ['https://www.babymealsplanner.com/social-preview.png'],
  },
};

export default function SignUpPage() {
  return <SignUpForm />;
}
