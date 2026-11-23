'use client';

import { Download, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

interface DownloadButtonsProps {
    productId: string;
    linkFree: string;
    linkPaid?: string;
    precio?: string;
}

export default function DownloadButtons({ productId, linkFree, linkPaid, precio }: DownloadButtonsProps) {
    const { config } = useConfig();
    const lang = (config?.language as 'es' | 'en') || 'es';
    const t = translations[lang] || translations.es;

    const handleDownload = async (type: 'free' | 'paid') => {
        try {
            if (typeof window !== 'undefined' && (window as any)[`incrementDownload_${productId}`]) {
                (window as any)[`incrementDownload_${productId}`]();
            } else {
                await fetch('/api/stats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, action: 'download' }),
                });
                window.dispatchEvent(new Event('statsUpdated'));
            }
        } catch (e) {
            console.error('Error recording download:', e);
        }

        let targetUrl = type === 'free' ? linkFree : (linkPaid || linkFree);
        if (!targetUrl || targetUrl.trim() === '') {
            alert('No hay un enlace configurado para este botón en este momento.');
            return;
        }
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('/')) {
            targetUrl = `https://${targetUrl}`;
        }
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-gray-800/80 space-y-4">
            <div className="flex flex-col gap-3">
                {/* Botón Descarga Gratis (Ancho completo) */}
                <button
                    onClick={() => handleDownload('free')}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all group"
                >
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t.downloadFree || 'Descargar Gratis'}</span>
                </button>

                {/* Botón Donación / Apoyo al Creador */}
                <Link
                    href="/donar"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 border border-neon-gold/30 bg-neon-gold/5 text-neon-gold hover:bg-neon-gold/15 hover:border-neon-gold/60 font-semibold text-sm rounded-xl transition-all group"
                >
                    <Heart className="w-4 h-4 fill-neon-gold group-hover:scale-110 transition-transform" />
                    <span>{t.donateBtnText || 'Apoya el Desarrollo'}</span>
                </Link>
            </div>
        </div>
    );
}
