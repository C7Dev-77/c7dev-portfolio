'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';

export default function LanguageSelector() {
  const { config, updateConfig } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config?.language) {
      setLang(config.language as 'es' | 'en');
    }
  }, [config?.language]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (selectedLang: 'es' | 'en') => {
    setLang(selectedLang);
    setIsOpen(false);
    if (config) {
      updateConfig({
        ...config,
        language: selectedLang
      });
    }
  };

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Botón Selector de Idioma */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold text-white font-bold text-xs rounded-lg transition-all shadow-md group cursor-pointer"
        aria-label="Seleccionar idioma"
      >
        <Globe className="w-3.5 h-3.5 text-neon-gold group-hover:rotate-12 transition-transform" />
        <span className="uppercase tracking-wider">{lang === 'es' ? 'ES' : 'EN'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-neon-gold' : ''}`} />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#0a0a0a] border border-neon-gold/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
          <button
            onClick={() => handleSelectLanguage('es')}
            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
              lang === 'es'
                ? 'text-neon-gold bg-neon-gold/10'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Español</span>
            {lang === 'es' && <span className="w-1.5 h-1.5 rounded-full bg-neon-gold shadow-[0_0_8px_#FFD700]" />}
          </button>
          <button
            onClick={() => handleSelectLanguage('en')}
            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
              lang === 'en'
                ? 'text-neon-gold bg-neon-gold/10'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>English</span>
            {lang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-neon-gold shadow-[0_0_8px_#FFD700]" />}
          </button>
        </div>
      )}
    </div>
  );
}
