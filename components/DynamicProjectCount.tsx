'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function DynamicProjectCount() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const { count: proyectosCount } = await supabase
                    .from('proyectos')
                    .select('*', { count: 'exact', head: true });

                const { count: productosCount } = await (supabase.from('products_public' as any) as any)
                    .select('*', { count: 'exact', head: true });

                const total = (proyectosCount || 0) + (productosCount || 0);
                setCount(total);
            } catch (e) {
                console.error(e);
                setCount(0);
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
        <span className="text-3xl md:text-4xl font-bold text-white">
            {count !== null ? `${count}+` : '...'}
        </span>
    );
}
