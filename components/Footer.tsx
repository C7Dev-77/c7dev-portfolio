// components/Footer.tsx
import { Github, Linkedin, Terminal, Mail, ArrowRight, Heart, MessageCircle, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

// Ícono de TikTok personalizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  // WhatsApp link
  const whatsappNumber = '573244259132';
  const whatsappMessage = encodeURIComponent('¡Hola C7Dev! Me interesa trabajar contigo.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="relative border-t border-neon-gold/20 bg-cyber-black text-white overflow-hidden">
      {/* Background Grid - subtle overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 border border-neon-gold flex items-center justify-center bg-black/50 shadow-[0_0_10px_rgba(255,215,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300">
                <Terminal className="text-neon-gold w-5 h-5" />
              </div>
              <span className="text-2xl font-outfit font-bold tracking-wider">
                C7<span className="text-neon-gold">Dev_</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Potenciando la próxima generación de productos digitales con diseño de vanguardia y arquitectura de software robusta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-neon-gold"></span>
              EXPLORAR
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider">
                  Códigos
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider">
                  Portafolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials - Actualizados */}
          <div>
            <h4 className="font-outfit font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-neon-platinum"></span>
              CONECTAR
            </h4>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://www.tiktok.com/@c7dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:-translate-y-1 transition-all duration-300"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/c7dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-[#E4405F] hover:text-[#E4405F] hover:-translate-y-1 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@c7dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-[#FF0000] hover:text-[#FF0000] hover:-translate-y-1 transition-all duration-300"
                title="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-[#25D366] hover:text-[#25D366] hover:-translate-y-1 transition-all duration-300"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Cristian14og"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:-translate-y-1 transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/christiandev7/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 rounded bg-black/50 flex items-center justify-center text-gray-400 hover:border-[#0077B5] hover:text-[#0077B5] hover:-translate-y-1 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-widest text-neon-gold mb-2">Contacto Directo</h5>
              <a
                href="mailto:christian.dev.77@gmail.com"
                className="text-sm text-gray-300 hover:text-neon-gold transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                christian.dev.77@gmail.com
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-[#25D366] transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                +57 324 425 9132
              </a>
            </div>
          </div>

          {/* Newsletter (Funcional) */}
          <NewsletterForm />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs uppercase tracking-widest text-center md:text-left">
            © {year} C7Dev_. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-widest">
            Codeado con <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> & C7Dev_
          </p>
        </div>
      </div>
    </footer>
  );
}