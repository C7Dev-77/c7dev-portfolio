'use client';

import { useEffect, useState } from 'react';

interface ProjectStatsProps {
    projectId: string;
    type?: 'portfolio' | 'product';
    className?: string;
}

export default function ProjectStats({ projectId, type = 'portfolio', className }: ProjectStatsProps) {
    const [stats, setStats] = useState({
        views: 0,
        downloads: 0,
        rating: 4.8
    });

    const loadAndIncrementView = async () => {
        try {
            // Incrementar vista en Supabase vía API
            const res = await fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, action: 'view' }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.projectMetric) {
                    setStats(prev => ({
                        ...prev,
                        views: data.projectMetric.views || 0,
                        downloads: data.projectMetric.downloads || 0,
                    }));
                }
                window.dispatchEvent(new Event('statsUpdated'));
            }
        } catch (error) {
            console.error('Error recording view:', error);
        }
    };

    const fetchCurrentStats = async () => {
        try {
            const res = await fetch('/api/stats', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                const metric = data.projectStats?.[projectId] || { views: 0, downloads: 0 };
                setStats(prev => ({
                    ...prev,
                    views: metric.views || 0,
                    downloads: metric.downloads || 0,
                }));
            }
        } catch (error) {
            console.error('Error fetching project stats:', error);
        }
    };

    useEffect(() => {
        // Rating consistente derivado del ID
        let hash = 0;
        for (let i = 0; i < projectId.length; i++) {
            hash = projectId.charCodeAt(i) + ((hash << 5) - hash);
        }
        const calculatedRating = parseFloat((4.3 + (Math.abs(hash) % 7) / 10).toFixed(1));
        setStats(prev => ({ ...prev, rating: calculatedRating }));

        loadAndIncrementView();

        const interval = setInterval(fetchCurrentStats, 3000);
        window.addEventListener('statsUpdated', fetchCurrentStats);

        return () => {
            clearInterval(interval);
            window.removeEventListener('statsUpdated', fetchCurrentStats);
        };
    }, [projectId]);

    const incrementDownloads = async () => {
        try {
            const res = await fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, action: 'download' }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.projectMetric) {
                    setStats(prev => ({
                        ...prev,
                        downloads: data.projectMetric.downloads || 0,
                        views: data.projectMetric.views || 0,
                    }));
                }
                window.dispatchEvent(new Event('statsUpdated'));
            }
        } catch (error) {
            console.error('Error incrementing download:', error);
        }
    };

    useEffect(() => {
        (window as any)[`incrementDownload_${projectId}`] = incrementDownloads;
    }, [projectId]);

    // Regla: Todo proyecto inicia en 100 vistas y 100 descargas
    const displayViews = 100 + (stats.views || 0);
    const displayDownloads = 100 + (stats.downloads || 0);

    // Renderizado según tipo
    if (type === 'portfolio') {
        // Portafolio: Solo Vistas y Rating
        return (
            <div className={`grid grid-cols-2 gap-4 ${className}`}>
                <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-neon-gold">{displayViews}</div>
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
                <div className="text-2xl font-bold text-neon-gold">{displayViews}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vistas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-neon-platinum">{displayDownloads}+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Descargas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-white">{stats.rating}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
            </div>
        </div>
    );
}
