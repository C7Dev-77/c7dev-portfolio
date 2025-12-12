'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Volume2, VolumeX } from 'lucide-react';
import ScrambleText from './ScrambleText';

export default function LogoWithSound() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Audio configuration
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = false;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleSound = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(err => {
                console.error('Error playing audio:', err);
            });
            setIsPlaying(true);

            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    return (
        <div className="flex items-center gap-3 relative">
            {/* Icono - Controla la música */}
            <button
                onClick={toggleSound}
                className="w-10 h-10 border-2 border-neon-gold flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:bg-neon-gold/10 transition-all cursor-pointer relative z-20 rounded-lg group"
                aria-label="Reproducir música"
            >
                <Terminal className="w-5 h-5 text-neon-gold" />

                {/* Sound indicator */}
                <div className="absolute -top-1 -right-1">
                    {isPlaying ? (
                        <Volume2 className="w-3 h-3 text-green-400 animate-pulse" />
                    ) : (
                        <VolumeX className="w-3 h-3 text-gray-500" />
                    )}
                </div>
            </button>

            {/* Texto - Link a inicio */}
            <Link href="/" className="text-neon-gold font-outfit font-bold text-xl tracking-wider cursor-pointer hover:text-glow-gold transition-all flex items-baseline gap-1 relative z-20 group">
                <ScrambleText text="C7" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <ScrambleText text="Dev" className="text-neon-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                <span className="text-neon-gold animate-pulse">_</span>
            </Link>

            {isPlaying && (
                <div className="absolute -bottom-6 left-0 text-[9px] text-green-400 font-mono animate-pulse uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded">
                    Playing...
                </div>
            )}
        </div>
    );
}
