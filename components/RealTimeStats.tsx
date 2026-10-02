'use client';

import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatsProps {
    className?: string;
    initialStats?: {
        proyectos: number;
        assets: number;
        downloads: number;
    };
}

export default function RealTimeStats({ className, initialStats }: StatsProps) {
    // Target values — arrancan en 0, se actualizan con datos reales
    const [targets, setTargets] = useState({ proyectos: 0, assets: 0, downloads: 0 });

    // Números animados desde 0 → valor real
    const animProyectos = useCountUp(targets.proyectos, 1400);
    const animAssets    = useCountUp(targets.assets,    1600);
    const animDownloads = useCountUp(targets.downloads, 1500);

    useEffect(() => {
        // Inicializar con datos SSR si están disponibles (sin flash estático)
        if (initialStats) {
            setTargets({
                proyectos: initialStats.proyectos,
                assets:    initialStats.assets,
                downloads: initialStats.downloads,
            });
        }

        const loadStats = async () => {
            try {
                const res = await fetch('/api/stats', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setTargets({
                        proyectos: data.projectCount  || initialStats?.proyectos || 0,
                        assets:    data.totalViews    || initialStats?.assets    || 0,
                        downloads: data.totalDownloads|| initialStats?.downloads || 0,
                    });
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        loadStats();
        const interval = setInterval(loadStats, 3000);

        const handleCustomEvent = () => loadStats();
        window.addEventListener('statsUpdated', handleCustomEvent);

        return () => {
            clearInterval(interval);
            window.removeEventListener('statsUpdated', handleCustomEvent);
        };
    }, []);

    return (
        <div className={`flex items-center justify-center gap-8 md:gap-16 w-full ${className}`}>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all tabular-nums">
                    {animProyectos}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Proyectos</div>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all tabular-nums">
                    {animAssets}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Views</div>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all tabular-nums">
                    {animDownloads}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Descargas</div>
            </div>
        </div>
    );
}
