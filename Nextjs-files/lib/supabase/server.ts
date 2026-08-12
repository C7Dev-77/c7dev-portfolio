// lib/supabase/server.ts
// Cliente con service_role — NUNCA importar desde componentes del browser.
// Solo para API routes y Server Components.
import { createClient } from '@supabase/supabase-js';

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
    throw new Error('Missing Supabase environment variables (URL or ANON_KEY)');
  }

  // Usar service role si está disponible, si no usar anon key como fallback
  const keyToUse = serviceRoleKey || anonKey;

  return createClient(supabaseUrl, keyToUse, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
