// app/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '../supabase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  // State to toggle between Login and Sign Up forms
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for our custom checkboxes
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // The main function to handle both login and signup
  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (isSigningUp) {
      // --- NEW, MORE ROBUST SIGN UP LOGIC ---
      if (!termsAccepted) {
        setError('You must accept the Terms and Conditions to sign up.');
        setIsLoading(false);
        return;
      }

      // Step 1: Sign up the user. The database trigger will automatically create their profile row.
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }
      
      // Step 2: If signup was successful AND the user opted-in for marketing,
      // we perform a separate UPDATE operation. This avoids race conditions.
      if (authData.user && marketingAccepted) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ marketing_consent: true }) // We explicitly set it to true
          .eq('id', authData.user.id);
        
        // This optional step failing shouldn't block the user. We just log it for our own info.
        if (profileError) {
            console.error("Signup succeeded, but updating marketing preference failed:", profileError);
        }
      }
      
      // This message is always shown on successful signup.
      setMessage('Signup successful! A confirmation email has been sent. Please verify your email before logging in.');

    } else {
      // --- LOGIN LOGIC (No changes here) ---
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    }
    setIsLoading(false);
  };

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
          
          {/* --- SIGN UP ONLY FIELDS --- */}
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