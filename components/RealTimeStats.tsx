'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface StatsProps {
    className?: string;
}

export default function RealTimeStats({ className }: StatsProps) {
    const [stats, setStats] = useState({
        proyectos: 4,
        assets: 400,
        downloads: 400
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await fetch('/api/stats', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        proyectos: data.projectCount || 4,
                        assets: data.totalViews || 400,
                        downloads: data.totalDownloads || 400
                    });
                }
            } catch (error) {
                console.error('Error loading stats from server:', error);
            }
        };

        // Cargar inmediatamente
        loadStats();

        // Intervalo corto de 3s para sincronización en vivo entre navegadores
        const interval = setInterval(loadStats, 3000);

        // Escuchar eventos en vivo locales
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
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.proyectos}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Proyectos</div>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.assets}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Views</div>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.downloads}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Descargas</div>
            </div>
        </div>
    );
}
