'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretGate() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Shortcut: Ctrl + Shift + L
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyL') {
                e.preventDefault();
                router.push('/login');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null; // This component doesn't render anything visible
}
