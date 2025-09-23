'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if user already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router, supabase]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (!termsAccepted) {
      setMessage('You must agree to the Terms and Conditions to sign up.');
      setMessageType('error');
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { marketing_consent: marketingConsent },
        },
      });

      if (authError) {
        setMessage(authError.message);
        setMessageType('error');
        return;
      }

      setMessage('✅ Sign-up successful! Please check your email to confirm your account.');
      setMessageType('success');
      setEmail('');
      setPassword('');
      setTermsAccepted(false);
      setMarketingConsent(false);
    } catch (err) {
      setMessage('Unexpected error: ' + err);
      setMessageType('error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Password (min. 6 characters)"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                By creating an account, you agree to our{' '}
                <Link href="/terms" target="_blank" className="font-medium text-indigo-600 hover:underline">
                  Terms and Conditions
                </Link> and acknowledge you have read our{' '}
                <Link href="/privacy" target="_blank" className="font-medium text-indigo-600 hover:underline">
                  Privacy Policy
                </Link> and{' '}
                <Link href="/cookies" target="_blank" className="font-medium text-indigo-600 hover:underline">
                  Cookie Policy
                </Link>.
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="marketing"
                name="marketing"
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="marketing" className="ml-2 text-sm text-gray-600">
                I would like to receive marketing emails and newsletters.
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!termsAccepted}
            className="w-full py-3 px-4 text-base font-semibold text-white bg-indigo-600 
                       rounded-lg hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                       disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>

          {message && (
            <p
              className={`mt-2 text-center text-sm ${
                messageType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Log In Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
