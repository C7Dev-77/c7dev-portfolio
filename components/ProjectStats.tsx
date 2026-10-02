'use client';

import { useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface ProjectStatsProps {
    projectId: string;
    type?: 'portfolio' | 'product';
    className?: string;
}

export default function ProjectStats({ projectId, type = 'portfolio', className }: ProjectStatsProps) {
    const [targets, setTargets] = useState({
        views: 100,
        downloads: 100,
        rating: 4.8
    });

    // Animar desde 0 → 100 + real
    // Los targets ya incluyen los 100 base, así el contador va de 0 al número final correcto
    const animViews     = useCountUp(targets.views,     1400, 0);
    const animDownloads = useCountUp(targets.downloads, 1500, 0);

    const loadAndIncrementView = async () => {
        try {
            const res = await fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, action: 'view' }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.projectMetric) {
                    setTargets(prev => ({
                        ...prev,
                        views:     100 + (data.projectMetric.views     || 0),
                        downloads: 100 + (data.projectMetric.downloads || 0),
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
                const metric = data.projectStats?.[projectId];
                if (metric) {
                    setTargets(prev => ({
                        ...prev,
                        views:     100 + (metric.views     || 0),
                        downloads: 100 + (metric.downloads || 0),
                    }));
                }
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
        setTargets(prev => ({ ...prev, rating: calculatedRating }));

        // Cargar inmediatamente métricas actuales
        fetchCurrentStats();

        // Registrar incremento de vista
        loadAndIncrementView();

        window.addEventListener('statsUpdated', fetchCurrentStats);

        return () => {
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
                    setTargets(prev => ({
                        ...prev,
                        downloads: 100 + (data.projectMetric.downloads || 0),
                        views:     100 + (data.projectMetric.views     || 0),
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

    // Renderizado según tipo
    if (type === 'portfolio') {
        return (
            <div className={`grid grid-cols-2 gap-4 ${className}`}>
                <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-neon-gold tabular-nums">{animViews}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vistas</div>
                </div>
                <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-white">{targets.rating}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
                </div>
            </div>
        );
    }

    // Productos: Vistas, Descargas y Rating
    return (
        <div className={`grid grid-cols-3 gap-4 ${className}`}>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-neon-gold tabular-nums">{animViews}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vistas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-neon-platinum tabular-nums">{animDownloads}+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Descargas</div>
            </div>
            <div className="text-center p-4 bg-[#111] rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-white">{targets.rating}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
            </div>
        </div>
    );
}

