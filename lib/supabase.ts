// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Cliente para uso en cliente (browser)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Cliente para uso en servidor (con service role key para operaciones admin)
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    // Fallback al cliente normal si no hay service key
    return supabase;
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Helper functions para productos
export async function getProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching productos:', error);
    return [];
  }

  return data;
}

export async function getProductoById(id: string) {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching producto:', error);
    return null;
  }

  return data;
}

// ============================================
// Helper functions para PROYECTOS (Portafolio)
// ============================================
export async function getProyectos() {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching proyectos:', error);
    return [];
  }

  return data;
}

export async function getProyectoById(id: string) {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching proyecto:', error);
    return null;
  }

  return data;
}