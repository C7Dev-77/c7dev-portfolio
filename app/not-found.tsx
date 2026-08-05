'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Activar glitch aleatorio
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    // Countdown de redirección
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.href = '/';
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        }}
      />

      {/* Animated background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Terminal header */}
        <div className="mb-8 inline-flex items-center gap-3 bg-black/80 border border-neon-gold/30 rounded-xl px-6 py-3">
          <Terminal className="w-5 h-5 text-neon-gold animate-pulse" />
          <span className="text-neon-gold font-mono text-sm tracking-widest uppercase">Error 404 — Sector no encontrado</span>
        </div>

        {/* Huge 404 */}
        <div className="relative mb-6">
          <h1
            className={`font-outfit text-[10rem] md:text-[14rem] font-black leading-none select-none transition-all duration-100 ${
              glitchActive ? 'translate-x-1 text-red-500' : 'text-white'
            }`}
            style={{
              textShadow: glitchActive
                ? '-2px 0 #FFD700, 2px 2px #ff0080'
                : '0 0 40px rgba(255,215,0,0.15), 0 0 80px rgba(255,215,0,0.05)',
            }}
          >
            404
          </h1>
          {/* Ghost layers for glitch effect */}
          {glitchActive && (
            <>
              <h1 className="absolute inset-0 font-outfit text-[10rem] md:text-[14rem] font-black leading-none text-neon-gold opacity-50 translate-x-[-3px] translate-y-[2px] select-none pointer-events-none">
                404
              </h1>
              <h1 className="absolute inset-0 font-outfit text-[10rem] md:text-[14rem] font-black leading-none text-purple-400 opacity-30 translate-x-[3px] translate-y-[-2px] select-none pointer-events-none">
                404
              </h1>
            </>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Esta página no existe en la{' '}
            <span className="text-neon-gold text-glow-gold">matriz</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            El sector que buscas ha sido eliminado, movido o nunca existió.
            Restableciendo conexión al nodo principal...
          </p>
        </div>

        {/* Progress bar + countdown */}
        <div className="mb-8 max-w-sm mx-auto">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span className="font-mono">Redirigiendo en</span>
            <span className="text-neon-gold font-mono font-bold">{countdown}s</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-gold to-amber-500 rounded-full transition-all duration-1000"
              style={{ width: `${((10 - countdown) / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-700 text-gray-400 font-bold uppercase tracking-wider rounded-xl hover:border-white hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Página anterior
          </button>
        </div>

        {/* Decorative code lines */}
        <div className="mt-12 font-mono text-xs text-gray-800 space-y-1 text-left max-w-xs mx-auto">
          <p><span className="text-gray-700">{'>'}</span> <span className="text-red-800">ERROR</span>: Route not found</p>
          <p><span className="text-gray-700">{'>'}</span> <span className="text-yellow-800">STATUS</span>: 404</p>
          <p><span className="text-gray-700">{'>'}</span> <span className="text-green-800">ACTION</span>: Redirecting to /...</p>
          <p className="animate-pulse"><span className="text-gray-700">{'>'}</span> <span className="text-neon-gold/40">_</span></p>
        </div>
      </div>
    </main>
  );
}
