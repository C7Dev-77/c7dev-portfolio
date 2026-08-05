'use client';

import { useEffect, useState } from 'react';
import ScrambleText from './ScrambleText';
import ParticleNetwork from './ParticleNetwork';
import FloatingCode from './FloatingCode';

export default function StartupAnimation() {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + 2; // Adjust speed here
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <ParticleNetwork />
                <FloatingCode />
            </div>

            {/* Loading Content */}
            <div className="w-64 mb-8 relative z-10">
                <h1 className="text-4xl md:text-6xl font-black text-center mb-2 tracking-tighter">
                    <span className="text-white">C7</span>
                    <span className="text-neon-gold">DEV</span>
                    <span className="text-neon-gold animate-pulse">_</span>
                </h1>
                <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-neon-gold transition-all duration-100 ease-out shadow-[0_0_10px_#FFD700]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-neon-gold/70">
                    <ScrambleText text="INITIALIZING SYSTEM..." />
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
}
