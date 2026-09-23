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

  // Extraer el token de acceso de las cookies de Supabase
  // Supabase almacena el JWT en cookies con formato:
  //   sb-<project-ref>-auth-token (valor JSON) o chunked (.0, .1, etc.)
  const cookieHeader = request.headers.get('cookie') || '';
  
  // Buscar la cookie de auth-token de Supabase
  let accessToken: string | null = null;

  try {
    // Intentar encontrar la cookie del token de sesión
    const cookies = parseCookies(cookieHeader);
    
    // Buscar cookies de Supabase (formato explícito o el de supabase-js)
    accessToken = cookies['sb-access-token'] || null;

    if (!accessToken) {
      const authCookieName = Object.keys(cookies).find(
        (name) => /^sb-.+-auth-token$/.test(name)
      );

      if (authCookieName) {
      // El valor de la cookie puede ser un JSON con access_token
      let cookieValue = cookies[authCookieName];
      
      // Si la cookie está chunked (sb-xxx-auth-token.0, .1, etc.), reconstruir
      if (!cookieValue || cookieValue === '') {
        const chunks: string[] = [];
        let i = 0;
        while (cookies[`${authCookieName}.${i}`] !== undefined) {
          chunks.push(cookies[`${authCookieName}.${i}`]);
          i++;
        }
        if (chunks.length > 0) {
          cookieValue = chunks.join('');
        }
      }

      if (cookieValue) {
        try {
          const parsed = JSON.parse(decodeURIComponent(cookieValue));
          accessToken = parsed?.access_token || parsed?.[0]?.access_token || null;
        } catch {
          // Si no es JSON, intentar usar el valor directamente
          accessToken = cookieValue;
        }
      }
    }
  } catch (e) {
    // Error parseando cookies — redirigir a login
    console.error('[middleware] Error parsing cookies:', e);
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
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // Si faltan variables, fallback seguro: denegar acceso
      console.error('[middleware] Missing Supabase env vars for auth validation');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Crear un cliente de Supabase con service_role para verificar el JWT
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
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

// Helper para parsear cookies de forma segura
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach((cookie) => {
    const eqIndex = cookie.indexOf('=');
    if (eqIndex === -1) return;
    const name = cookie.substring(0, eqIndex).trim();
    const value = cookie.substring(eqIndex + 1).trim();
    cookies[name] = value;
  });

  return cookies;
}

export const config = {
  matcher: ['/admin/:path*'],
};
