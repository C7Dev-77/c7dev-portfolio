'use client';

import { useEffect, useState } from 'react';

interface ProjectStatsProps {
    projectId: string;
    type?: 'portfolio' | 'product';
    className?: string;
}

export default function ProjectStats({ projectId, type = 'portfolio', className }: ProjectStatsProps) {
    const [stats, setStats] = useState({
        views: 77, // Base updated to 77
        downloads: 23, // Base updated to 23
        rating: 4.5
    });

    useEffect(() => {
        const loadProjectStats = () => {
            const allStats = localStorage.getItem('projectStats');
            let projectStats: any = {};

            if (allStats) {
                projectStats = JSON.parse(allStats);
            }

            // Si no existe este proyecto, inicializarlo
            if (!projectStats[projectId]) {
                // Generar rating aleatorio entre 3.9 y 5.0
                const randomRating = (Math.random() * (5.0 - 3.9) + 3.9).toFixed(1);

                projectStats[projectId] = {
                    views: 77,
                    downloads: 23,
                    rating: parseFloat(randomRating)
                };
            }

            // Incrementar vista
            projectStats[projectId].views += 1;

            // Guardar de vuelta
            localStorage.setItem('projectStats', JSON.stringify(projectStats));

            // Disparar evento para actualizar stats globales
            window.dispatchEvent(new Event('statsUpdated'));

            setStats(projectStats[projectId]);
        };

        loadProjectStats();
    }, [projectId]);

    // Función para incrementar descargas (solo para productos)
    const incrementDownloads = () => {
        const allStats = localStorage.getItem('projectStats');
        let projectStats: any = {};

        if (allStats) {
            projectStats = JSON.parse(allStats);
        }

        if (projectStats[projectId]) {
            projectStats[projectId].downloads += 1;
            localStorage.setItem('projectStats', JSON.stringify(projectStats));

            // Disparar evento para actualizar stats globales
            window.dispatchEvent(new Event('statsUpdated'));

            setStats(projectStats[projectId]);
        }
    };

    // Exponer función globalmente para que los botones de descarga puedan usarla
    useEffect(() => {
        if (type === 'product') {
            (window as any)[`incrementDownload_${projectId}`] = incrementDownloads;
        }
    }, [projectId, type]);

    // Renderizado según tipo
    if (type === 'portfolio') {
        // Portafolio: Solo Vistas y Rating
        return (
            <div className={`grid grid-cols-2 gap-4 ${className}`}>
                <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-neon-gold">{stats.views}+</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vistas</div>
                </div>
                <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-white">{stats.rating}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
                </div>
            </div>
        );
    }

    // Productos: Vistas, Descargas y Rating
    return (
        <div className={`grid grid-cols-3 gap-4 ${className}`}>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-neon-gold">{stats.views}+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vistas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-neon-platinum">{stats.downloads}+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Descargas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-white">{stats.rating}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
            </div>
        </div>
    );
}
