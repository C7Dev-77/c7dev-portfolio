'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface StatsProps {
    className?: string;
}

export default function RealTimeStats({ className }: StatsProps) {
    const [stats, setStats] = useState({
        proyectos: 10, // Base 10
        assets: 70,    // Base 70
        downloads: 23 // Base 23
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Contar proyectos del portafolio
                const { count: proyectosCount } = await supabase
                    .from('proyectos')
                    .select('*', { count: 'exact', head: true })
                    .eq('activo', true);

                // Contar productos de la tienda
                const { count: productosCount } = await supabase
                    .from('productos')
                    .select('*', { count: 'exact', head: true })
                    .eq('activo', true);

                // Calcular total de proyectos: Base 10 + Portafolio + Tienda
                const totalProyectos = 10 + (proyectosCount || 0) + (productosCount || 0);

                // 1. Calcular descargas totales sumando TODOS los contadores de proyecto del localStorage
                const allProjectStats = localStorage.getItem('projectStats');
                let totalAdditionalDownloads = 0;
                let totalAdditionalViews = 0;

                if (allProjectStats) {
                    const statsMap = JSON.parse(allProjectStats);
                    // Sumar todas las descargas registradas en proyectos individuales
                    Object.values(statsMap).forEach((p: any) => {
                        if (p.downloads && typeof p.downloads === 'number') {
                            // Sumamos el total completo de descargas del proyecto
                            totalAdditionalDownloads += p.downloads;
                        }
                        if (p.views && typeof p.views === 'number') {
                            // Sumamos el total completo de vistas del proyecto
                            totalAdditionalViews += p.views;
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

                // Lógica de conteo final
                setStats({
                    proyectos: totalProyectos,
                    assets: 70 + totalAdditionalViews,
                    downloads: 23 + totalAdditionalDownloads + siteDownloads
                });

            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        // Cargar inmediatamente
        loadStats();

        // 1. Intervalo corto para asegurar actualización
        const interval = setInterval(loadStats, 2000);

        // 2. Escuchar evento storage (pestañas cruzadas)
        const handleStorageChange = () => loadStats();
        window.addEventListener('storage', handleStorageChange);

        // 3. Escuchar evento personalizado 'statsUpdated' (dentro de la misma pestaña)
        const handleCustomEvent = () => loadStats();
        window.addEventListener('statsUpdated', handleCustomEvent);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
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
