'use client';

import { Download, CreditCard, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

interface DownloadButtonsProps {
    productId: string;
    linkFree: string;
    linkPaid: string;
    precio: string;
}

export default function DownloadButtons({ productId, linkFree, linkPaid, precio }: DownloadButtonsProps) {
    const { config } = useConfig();
    const lang = (config?.language as 'es' | 'en') || 'es';
    const t = translations[lang] || translations.es;

    const handleDownload = (type: 'free' | 'paid') => {
        if (typeof window !== 'undefined' && (window as any)[`incrementDownload_${productId}`]) {
            (window as any)[`incrementDownload_${productId}`]();
        }
        const link = type === 'free' ? linkFree : linkPaid;
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border-2 border-neon-gold/30">
            <div className="flex items-end gap-4 mb-6">
                <div className="text-5xl font-black text-neon-gold">
                    ${precio}
                </div>
                <span className="text-gray-500 text-sm pb-2">USD</span>
            </div>

            <div className="flex flex-col gap-3">
                {/* Botón Pago */}
                <button
                    onClick={() => handleDownload('paid')}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all group"
                >
                    <CreditCard className="w-5 h-5" />
                    {t.buyNow || 'Comprar Ahora'}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Botón Gratis */}
                <button
                    onClick={() => handleDownload('free')}
                    className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-green-500 text-green-500 font-bold uppercase tracking-wider rounded-xl hover:bg-green-500 hover:text-black transition-all"
                >
                    <Download className="w-5 h-5" />
                    {t.downloadFree || 'Descargar Gratis (con anuncios)'}
                </button>

                {/* Separador */}
                <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-gray-800" />
                    <span className="text-gray-700 text-[10px] uppercase tracking-widest">o</span>
                    <div className="h-px flex-1 bg-gray-800" />
                </div>

                {/* Botón Donación */}
                <Link
                    href="/donar"
                    className="flex items-center justify-center gap-2.5 px-6 py-3 border border-neon-gold/30 bg-neon-gold/5 text-neon-gold hover:bg-neon-gold/10 hover:border-neon-gold/60 font-semibold text-sm rounded-xl transition-all group"
                >
                    <Heart className="w-4 h-4 fill-neon-gold group-hover:scale-110 transition-transform" />
                    {t.donateBtnText || 'Apoya el Desarrollo'}
                </Link>
            </div>
        </div>
    );
}
