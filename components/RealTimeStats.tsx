'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface StatsProps {
    className?: string;
}

export default function RealTimeStats({ className }: StatsProps) {
    const [stats, setStats] = useState({
        proyectos: 19, // Base 14 + 5 adicional solicitado
        assets: 77,    // Base inicial solicitada
        downloads: 100 // Base inicial solicitada
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Contar proyectos reales desde Supabase
                const { count: proyectosCount } = await supabase
                    .from('proyectos')
                    .select('*', { count: 'exact', head: true })
                    .eq('activo', true);

                // Contar productos/assets desde Supabase
                const { count: assetsCount } = await supabase
                    .from('productos')
                    .select('*', { count: 'exact', head: true })
                    .eq('activo', true);

                // 1. Calcular descargas totales sumando TODOS los contadores de proyecto del localStorage
                const allProjectStats = localStorage.getItem('projectStats');
                let totalAdditionalDownloads = 0;
                let totalAdditionalViews = 0;

                if (allProjectStats) {
                    const statsMap = JSON.parse(allProjectStats);
                    // Sumar todas las descargas registradas en proyectos individuales
                    Object.values(statsMap).forEach((p: any) => {
                        if (p.downloads && typeof p.downloads === 'number') {
                            // Restamos 23 (base por proyecto) para sumar solo las interacciones reales nuevas
                            const realInteractions = Math.max(0, p.downloads - 23);
                            totalAdditionalDownloads += realInteractions;
                        }
                        if (p.views && typeof p.views === 'number') {
                            const realViews = Math.max(0, p.views - 23);
                            totalAdditionalViews += realViews;
                        }
                    });
                }

                // Obtener contador global del sitio
                const savedSiteStats = localStorage.getItem('siteStats');
                let siteDownloads = 0;
                if (savedSiteStats) {
                    const parsed = JSON.parse(savedSiteStats);
                    siteDownloads = Math.max(0, (parsed.downloads || 100) - 100);
                }

                setStats({
                    proyectos: (proyectosCount || 0) + 14 + 5, // Base 14 + 5 extra + reales
                    assets: 77 + totalAdditionalViews,         // Base 77 + vistas sumadas de proyectos
                    downloads: 100 + totalAdditionalDownloads + siteDownloads // Base 100 + descargas reales + contador global
                });

            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        loadStats();

        // Escuchar eventos de storage para actualizar en tiempo real si cambian
        const handleStorageChange = () => {
            loadStats();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);

    }, []);

    return (
        <div className={`flex items-center justify-center gap-8 md:gap-16 py-4 px-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-neon-gold/30 transition-colors ${className}`}>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.proyectos}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Proyectos</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.assets}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Views</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
            <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">
                    {stats.downloads}+
                </div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Descargas</div>
            </div>
        </div>
    );
}
