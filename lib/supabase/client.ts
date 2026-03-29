import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if credentials are not configured - app will work in demo mode
  if (!url || !key) {
    console.warn('Supabase credentials not configured. Running in demo mode.');
    return null;
  }

  return createBrowserClient<Database>(url, key);
};
