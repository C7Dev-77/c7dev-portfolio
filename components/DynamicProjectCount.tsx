'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCountUp } from '@/hooks/useCountUp';

export default function DynamicProjectCount({ initialCount }: { initialCount?: number } = {}) {
    // Arranca en 0 — sin flash de valor estático
    const [target, setTarget] = useState<number>(0);

    // Anima desde 0 hasta el total real
    const animated = useCountUp(target, 1300);

    useEffect(() => {
        // Si llega valor SSR, úsalo como target inicial para que empiece a animar desde ya
        if (initialCount !== undefined) {
            setTarget(initialCount);
        }

        const fetchCount = async () => {
            try {
                const { count: proyectosCount } = await supabase
                    .from('proyectos')
                    .select('*', { count: 'exact', head: true });

                const { count: productosCount } = await (supabase.from('products_public' as any) as any)
                    .select('*', { count: 'exact', head: true });

                const total = (proyectosCount || 0) + (productosCount || 0);
                setTarget(total);
            } catch (e) {
                console.error(e);
            }
        };

        fetchCount();

        const handleUpdate = () => fetchCount();
        window.addEventListener('storage', handleUpdate);
        window.addEventListener('statsUpdated', handleUpdate);

        return () => {
            window.removeEventListener('storage', handleUpdate);
            window.removeEventListener('statsUpdated', handleUpdate);
        };
    }, []);

    return (
        <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
            {animated}+
        </span>
    );
}
