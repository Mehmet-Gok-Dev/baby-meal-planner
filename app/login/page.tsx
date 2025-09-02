// app/login/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react'; // 1. Added useEffect
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  // --- All your state variables are fine ---
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // V V V THIS IS THE NEW DEBUGGING CODE V V V
  // This hook sets up a listener to see if the Supabase client ever
  // recognizes a change in the authentication state.
  useEffect(() => {
    console.log('--- Setting up Auth State Listener on Login Page ---');
    console.log('Supabase URL being used:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // This will fire for EVERY auth event. We are hoping to see 'SIGNED_IN'.
      console.log('>>> Supabase Auth Event:', event);
      if (session) {
        console.log('>>> Session detected by listener:', session);
      }
    });

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);


  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (isSigningUp) {
      // --- Your existing sign-up logic is perfect ---
      if (!termsAccepted) {
        setError('You must accept the Terms and Conditions to sign up.');
        setIsLoading(false);
        return;
      }
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        if (authData.user && marketingAccepted) {
            await supabase.from('profiles').update({ marketing_consent: true }).eq('id', authData.user.id);
        }
        setMessage('Signup successful! You can now log in.');
      }
      
    } else {
      // --- Login Logic to test the listener ---
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // We know the login is successful in the network.
        // We will wait and see if our listener in the useEffect hook fires.
        setMessage('Login successful in network. Waiting for redirect...');
        router.push('/');
      }
    }
    setIsLoading(false);
  };

  // Your JSX is fine, no changes needed
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          {isSigningUp ? 'Create Your Account' : 'Welcome Back!'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded text-gray-900" />
          </div>
          <div>
            <input id="password" type="password" placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded text-gray-900" />
          </div>
          
          {isSigningUp && (
            <div className="space-y-3 pt-2">
              <label htmlFor="terms" className="flex items-start space-x-2 cursor-pointer">
                <input id="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" />
                <span className="text-xs text-gray-600">
                  I have read and agree to the <Link href="/terms" target="_blank" className="underline text-blue-600 hover:text-blue-800">Terms and Conditions</Link> and <Link href="/privacy" target="_blank" className="underline text-blue-600 hover:text-blue-800">Privacy Policy</Link>.
                </span>
              </label>
              <label htmlFor="marketing" className="flex items-center space-x-2 cursor-pointer">
                <input id="marketing" type="checkbox" checked={marketingAccepted} onChange={(e) => setMarketingAccepted(e.target.checked)} />
                <span className="text-xs text-gray-600">I would like to receive marketing emails and newsletters.</span>
              </label>
            </div>
          )}
          
          <button type="submit" disabled={isLoading} className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50">
            {isLoading ? 'Processing...' : (isSigningUp ? 'Sign Up' : 'Log In')}
          </button>
          
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          {message && <p className="text-green-500 text-xs text-center">{message}</p>}
        </form>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => { setIsSigningUp(!isSigningUp); setError(''); setMessage(''); }} className="text-blue-600 font-semibold ml-1 hover:underline">
            {isSigningUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}