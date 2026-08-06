'use client';

import Link from 'next/link';
import { Terminal } from 'lucide-react';
import ScrambleText from './ScrambleText';

export default function LogoWithSound() {
    return (
        <Link 
            href="/" 
            className="flex items-center gap-3 relative cursor-pointer group"
            aria-label="C7 Dev - Inicio"
        >
            {/* Icono del Logo */}
            <div className="w-10 h-10 border-2 border-neon-gold flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] group-hover:bg-neon-gold/10 transition-all rounded-lg">
                <Terminal className="w-5 h-5 text-neon-gold" />
            </div>

            {/* Texto del Logo */}
            <div className="text-neon-gold font-outfit font-bold text-xl tracking-wider group-hover:text-glow-gold transition-all flex items-baseline gap-1">
                <ScrambleText text="C7" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <ScrambleText text="Dev" className="text-neon-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                <span className="text-neon-gold animate-pulse">_</span>
            </div>
        </Link>
    );
}

