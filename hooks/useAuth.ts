'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Demo user for testing without Supabase
const DEMO_USER: User = {
  id: 'demo-user-123',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'demo@example.com',
  user_metadata: { full_name: 'Demo User' },
  app_metadata: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  identities: [],
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const isDemoMode = supabase === null;

  const checkUser = useCallback(async () => {
    try {
      setLoading(true);
      if (isDemoMode) {
        // In demo mode, check localStorage for demo user
        const stored = localStorage.getItem('demo_user');
        setUser(stored ? DEMO_USER : null);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check auth'));
    } finally {
      setLoading(false);
    }
  }, [supabase, isDemoMode]);

  useEffect(() => {
    checkUser();

    if (!isDemoMode && supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [supabase, checkUser, isDemoMode]);

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      try {
        setLoading(true);
        if (isDemoMode) {
          // In demo mode, just store user and redirect
          localStorage.setItem('demo_user', JSON.stringify({ email, fullName }));
          setUser(DEMO_USER);
          router.push('/dashboard');
          return { user: DEMO_USER, session: null };
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });

        if (error) throw error;
        return data;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign up failed'));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [supabase, isDemoMode, router],
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        if (isDemoMode) {
          // In demo mode, just store user and redirect
          localStorage.setItem('demo_user', JSON.stringify({ email }));
          setUser(DEMO_USER);
          router.push('/dashboard');
          return { user: DEMO_USER, session: null };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push('/dashboard');
        return data;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign in failed'));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [supabase, isDemoMode, router],
  );

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      if (isDemoMode) {
        localStorage.removeItem('demo_user');
        setUser(null);
        router.push('/');
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, isDemoMode, router]);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
}
