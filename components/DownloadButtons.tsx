'use client';

import { Download, CreditCard, ChevronRight } from 'lucide-react';

interface DownloadButtonsProps {
    productId: string;
    linkFree: string;
    linkPaid: string;
    precio: string;
}

export default function DownloadButtons({ productId, linkFree, linkPaid, precio }: DownloadButtonsProps) {
    const handleDownload = (type: 'free' | 'paid') => {
        // Incrementar contador de descargas
        if (typeof window !== 'undefined' && (window as any)[`incrementDownload_${productId}`]) {
            (window as any)[`incrementDownload_${productId}`]();
        }

        // Abrir link
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
                    Comprar Ahora
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Botón Gratis */}
                <button
                    onClick={() => handleDownload('free')}
                    className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-green-500 text-green-500 font-bold uppercase tracking-wider rounded-xl hover:bg-green-500 hover:text-black transition-all"
                >
                    <Download className="w-5 h-5" />
                    Descargar Gratis (con anuncios)
                </button>
            </div>
        </div>
    );
}
