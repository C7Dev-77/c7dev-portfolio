'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Store, Settings, Menu, X, Terminal, LogIn, User, Code } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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
    { href: '/', label: 'Home', icon: Home },
    { href: '/tienda', label: 'Códigos', icon: Code }, // Cambiado de 'Tienda' a 'Códigos'
    { href: '/portafolio', label: 'Portafolio', icon: Terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border-2 border-neon-gold flex items-center justify-center shadow-neon-gold">
              <Terminal className="w-4 h-4 text-neon-gold" />
            </div>
            <span className="text-neon-gold font-outfit font-bold text-xl tracking-wider cursor-blink group-hover:text-glow-gold transition-all">
              C7Dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neon-gold p-2 hover:shadow-neon-gold transition-shadow"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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