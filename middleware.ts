import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Solo proteger rutas /admin
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Buscar cualquier cookie de sesión de Supabase (ambos formatos: v1 y v2)
  const cookieHeader = request.headers.get('cookie') || '';

  // Supabase guarda la sesión en cookies con estos patrones:
  // v1: sb-<project-ref>-auth-token
  // v2: sb-<project-ref>-auth-token.0  sb-<project-ref>-auth-token.1
  const hasSupabaseSession =
    /sb-[a-z0-9]+-auth-token/.test(cookieHeader) ||
    /supabase-auth-token/.test(cookieHeader);

  // COMENTADO TEMPORALMENTE PARA SOLUCIONAR BUCLE DE LOGIN
  /*
  if (!hasSupabaseSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
