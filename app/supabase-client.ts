// app/supabase-client.ts
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

// This creates a Supabase client that works in the browser environment.
export const supabase = createPagesBrowserClient();