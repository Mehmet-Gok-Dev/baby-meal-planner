// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This useEffect logic is already correct and robust.
  useEffect(() => {
    const fetchInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    fetchInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    
    return () => {
        authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative z-10">
      <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-xl font-bold text-indigo-600">
          👶 Baby Meals Planner
        </Link>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-gray-700" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-gray-700" />
            )}
          </button>
        </div>

        {/* ================================================================== */}
        {/* ======================= DESKTOP LINKS (UPDATED) ================== */}
        {/* ================================================================== */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
          
          {session ? (
            <>
              <Link href="/account/meal-book" className="text-gray-600 hover:text-indigo-600">Meal Book</Link>
              <Link href="/account" className="text-gray-600 hover:text-indigo-600">My Account</Link>
              <button onClick={handleLogout} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
                Log Out
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================================================================== */}
      {/* ======================= MOBILE MENU (UPDATED) ==================== */}
      {/* ================================================================== */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center p-4 space-y-4">
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">About</Link>
          
          {session ? (
            <>
              <Link href="/account/meal-book" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">Meal Book</Link>
              <Link href="/account" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600">My Account</Link>
              <button onClick={handleLogout} className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                Log Out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}