'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Store, Settings, Menu, X, Terminal, LogIn, User, Code, Music, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import LogoWithSound from './LogoWithSound';
import LanguageSelector from './LanguageSelector';
import { useMusic } from '@/context/MusicContext';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { isPlaying, toggleMusic } = useMusic();
  const { config } = useConfig();

  const lang = (config?.language as 'es' | 'en') || 'es';
  const t = translations[lang] || translations.es;

  useEffect(() => {
    // Verificar sesión inicial
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // Escuchar cambios de sesión (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: '/', label: t.navHome, icon: Home },
    { href: '/tienda', label: t.navCodes, icon: Code },
    { href: '/portafolio', label: t.navPortfolio, icon: Terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Contenedor con Botón de Música Aparte + Logo */}
          <div className="flex items-center gap-3">
            {/* Botón de música independiente */}
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center relative cursor-pointer group ${
                isPlaying 
                  ? 'bg-neon-gold/15 border-neon-gold text-neon-gold shadow-[0_0_15px_rgba(255,215,0,0.4)]' 
                  : 'bg-white/5 border-gray-800 text-gray-400 hover:text-neon-gold hover:border-neon-gold/50 hover:bg-white/10'
              }`}
              title={isPlaying ? 'Pausar música' : 'Reproducir música'}
              aria-label="Control de música"
            >
              <Music className={`w-5 h-5 transition-transform group-hover:scale-110 ${isPlaying ? 'text-neon-gold animate-bounce' : ''}`} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-gold"></span>
                </span>
              )}
            </button>

            {/* Logo */}
            <LogoWithSound />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-neon-gold transition-colors flex items-center gap-2 group"
              >
                <link.icon className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_#FFD700]" />
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Botón de Donación */}
            <Link
              href="/donar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neon-gold/40 bg-neon-gold/5 text-neon-gold hover:bg-neon-gold/15 hover:border-neon-gold transition-all duration-200 text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(255,215,0,0.1)] hover:shadow-[0_0_16px_rgba(255,215,0,0.25)] group"
            >
              <Heart className="w-3.5 h-3.5 fill-neon-gold group-hover:scale-110 transition-transform" />
              Donar
            </Link>

            {/* Language Selector en la derecha (punto blanco) */}
            <LanguageSelector />

            {/* Dynamic Auth Button */}
            {user && (
              <Link
                href="/admin"
                className="text-neon-platinum hover:text-white transition-colors flex items-center gap-2 group border border-neon-platinum/30 px-3 py-1 rounded bg-neon-platinum/5 hover:bg-neon-platinum/20"
              >
                <Settings className="w-4 h-4" />
                <span>Panel Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neon-gold p-2 hover:shadow-neon-gold transition-shadow"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neon-gold/20 animate-in slide-in-from-top bg-cyber-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-gray-400 hover:text-neon-gold py-2 transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}

            {user && (
              <div className="pt-4 border-t border-gray-800 mt-4">
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-neon-platinum hover:text-white py-2"
                >
                  <Settings className="w-5 h-5" />
                  <span>Ir al Panel</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}