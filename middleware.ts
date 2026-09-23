import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Email autorizado para el panel de administración
const ADMIN_EMAIL = 'christian.dev.77@gmail.com';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Solo proteger rutas /admin
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // ============================================================
  // VALIDACIÓN CRIPTOGRÁFICA DEL JWT (reemplaza la validación por regex)
  // ============================================================

  // Buscar la cookie de auth-token de Supabase
  let accessToken: string | null = null;
  const explicitCookie = request.cookies.get('sb-access-token');

  if (explicitCookie) {
    accessToken = explicitCookie.value;
  } else {
    // Buscar la cookie nativa de Supabase en caso de que exista (formato fallback)
    const allCookies = request.cookies.getAll();
    const authCookie = allCookies.find((c) => /^sb-.+-auth-token$/.test(c.name));
    
    if (authCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(authCookie.value));
        accessToken = parsed?.access_token || parsed?.[0]?.access_token || null;
      } catch {
        accessToken = authCookie.value;
      }
    }
  }

  // Si no se encontró un access_token, redirigir a login
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ============================================================
  // VERIFICACIÓN CRIPTOGRÁFICA con Supabase Auth API
  // ============================================================
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Usamos ANON_KEY en lugar de SERVICE_ROLE_KEY porque este último podría no estar configurado en Vercel,
    // y para verificar un JWT con getUser() el ANON_KEY es completamente suficiente.
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // Si faltan variables, fallback seguro: denegar acceso
      console.error('[middleware] Missing Supabase env vars for auth validation');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Crear un cliente de Supabase para verificar el JWT
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // getUser() valida criptográficamente el JWT contra Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.warn('[middleware] Invalid JWT token:', error?.message);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verificar que el email del usuario es el del administrador
    if (user.email !== ADMIN_EMAIL) {
      console.warn(`[middleware] Unauthorized email: ${user.email}`);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(loginUrl);
    }

    // ✅ JWT válido y email es el del admin — permitir acceso
    return NextResponse.next();

  } catch (err) {
    console.error('[middleware] Auth validation error:', err);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Helper removido porque request.cookies es nativo

export const config = {
  matcher: ['/admin/:path*'],
};
