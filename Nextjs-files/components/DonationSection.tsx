'use client';

import { useState } from 'react';
import { Copy, Check, Heart, QrCode } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

export default function DonationSection() {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(true);

  const lang = (config?.language as 'es' | 'en') || 'es';
  const t = translations[lang] || translations.es;

  const nuKey = config.donations?.nuKey || '@UDS891';
  const qrCodeUrl = config.donations?.qrCodeUrl || '/donaciones-qr.png';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(nuKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-4 px-4 relative z-10">
      {/* Contenedor Glassmorphism elegante */}
      <div className="glass-panel border border-neon-gold/30 hover:border-neon-gold/60 transition-all duration-300 rounded-2xl p-5 md:p-6 shadow-[0_0_30px_rgba(255,215,0,0.06)]">
        {/* Header Compacto */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-800/80">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2 bg-neon-gold/10 border border-neon-gold/30 rounded-xl text-neon-gold">
              <Heart className="w-5 h-5 fill-neon-gold animate-pulse" />
            </div>
            <div>
              <h2 className="font-outfit text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                {t.donateTitle} <span className="text-neon-gold">{t.donateTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                {t.donateSub}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-gray-800 hover:border-neon-gold text-xs text-gray-300 rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            <QrCode className="w-3.5 h-3.5 text-neon-gold" />
            <span>{showQr ? t.hideQrBtn : t.showQrBtn}</span>
          </button>
        </div>

        {/* Detalle con QR y Llave */}
        {showQr && (
          <div className="bg-black/60 border border-gray-800/90 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center">
            {/* QR Code Container */}
            <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="QR Bre-B / Nu"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const parent = (e.currentTarget as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="flex flex-col items-center justify-center text-center text-black p-1"><div class="font-bold text-[10px] text-purple-700">Bre-B | nu</div><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Bre-B%20Nu%20@UDS891" class="w-24 h-24 my-0.5"/><span class="text-[8px] text-purple-900 font-semibold">@UDS891</span></div>`;
                  }
                }}
              />
            </div>

            {/* Datos de transferencia */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-widest">{t.nuKeyLabel}</p>
              <p className="text-white font-mono text-lg font-bold mb-3 tracking-wider">{nuKey}</p>

              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-gradient-to-r from-neon-gold to-amber-500 hover:from-amber-400 hover:to-neon-gold text-black shadow-md'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.copiedKey}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.copyKey}
                  </>
                )}
              </button>

              <p className="text-gray-500 text-[11px] mt-2.5">
                {t.donateFooter}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


