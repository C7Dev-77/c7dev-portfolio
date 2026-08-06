'use client';

import { useState } from 'react';
import { Copy, Check, Heart, ArrowLeft, QrCode, Sparkles, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import ParticleNetwork from '@/components/ParticleNetwork';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

export default function DonarPage() {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);

  const lang = (config?.language as 'es' | 'en') || 'es';
  const t = translations[lang] || translations.es;

  const nuKey = config.donations?.nuKey || '@UDS891';
  const qrCodeUrl = config.donations?.qrCodeUrl || '/donaciones-qr.png';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(nuKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo de partículas a pantalla completa */}
      <ParticleNetwork />

      {/* Overlay gradiente de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1] pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Back button */}
        <div className="pt-24 px-6">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-gold transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Digital CODES
          </Link>
        </div>

        {/* Hero section */}
        <section className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">

            {/* Badge superior */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 border border-neon-gold/50 bg-neon-gold/5 text-neon-gold px-5 py-2 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <Heart className="w-3.5 h-3.5 fill-neon-gold animate-pulse" />
                {t.donateTag}
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Título Hero */}
            <div className="text-center mb-10">
              <h1 className="font-outfit text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                {t.donateTitle}
              </h1>
              <p className="font-outfit text-2xl md:text-3xl font-bold text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] mb-5">
                {t.donateTitleHighlight}
              </p>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                {t.donateSub}
              </p>
            </div>

            {/* Card principal de donación */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* Columna izquierda — QR grande */}
              <div className="glass-panel border border-neon-gold/30 rounded-3xl p-8 text-center hover:border-neon-gold/60 transition-all duration-300 shadow-[0_0_50px_rgba(255,215,0,0.05)]">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
                  <QrCode className="w-4 h-4 text-neon-gold" />
                  Escanea con Bre-B o Nequi
                </p>

                {/* QR grande */}
                <div className="w-52 h-52 mx-auto bg-white rounded-2xl p-3 shadow-[0_0_30px_rgba(255,215,0,0.2)] mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrCodeUrl}
                    alt="QR Bre-B / Nu @UDS891"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const parent = (e.currentTarget as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="flex flex-col items-center justify-center w-full h-full text-black gap-2"><div class="font-black text-[11px] text-purple-700 tracking-wide">Bre-B | nu</div><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Bre-B+Nu+%40UDS891&color=5B21B6&bgcolor=ffffff" class="w-40 h-40" alt="QR generado"/><span class="text-[9px] text-purple-900 font-bold">@UDS891</span></div>`;
                      }
                    }}
                  />
                </div>

                <p className="text-gray-500 text-xs">
                  Cualquier banco · Sin costo · Instantáneo
                </p>
              </div>

              {/* Columna derecha — Llave + info */}
              <div className="flex flex-col gap-5">

                {/* Llave de transferencia */}
                <div className="glass-panel border border-gray-800 rounded-2xl p-6 hover:border-neon-gold/40 transition-all duration-300">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{t.nuKeyLabel}</p>
                  <p className="text-white font-mono text-2xl font-bold tracking-wider mb-5">{nuKey}</p>

                  <button
                    onClick={handleCopy}
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                      copied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                        : 'bg-gradient-to-r from-neon-gold to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black shadow-[0_0_20px_rgba(255,215,0,0.25)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        ¡Llave copiada al portapapeles!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        {t.copyKey}
                      </>
                    )}
                  </button>
                </div>

                {/* Transferencia Directa por Banco */}
                <div className="glass-panel border border-gray-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Transfiere desde tu banco</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Nequi', url: 'https://www.nequi.com.co', color: 'hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10' },
                      { name: 'Daviplata', url: 'https://www.daviplata.com', color: 'hover:border-red-500 hover:text-red-400 hover:bg-red-500/10' },
                      { name: 'Bancolombia', url: 'https://www.bancolombia.com', color: 'hover:border-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10' },
                      { name: 'Nu Colombia', url: 'https://nu.com.co', color: 'hover:border-purple-600 hover:text-purple-300 hover:bg-purple-600/10' },
                    ].map((bank) => (
                      <a
                        key={bank.name}
                        href={bank.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-2.5 border border-gray-800 text-gray-300 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 text-center flex items-center justify-center gap-1.5 ${bank.color}`}
                      >
                        {bank.name} ↗
                      </a>
                    ))}
                  </div>
                </div>

                {/* Features / Garantías */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: 'Seguro' },
                    { icon: Zap, label: 'Instantáneo' },
                    { icon: Heart, label: 'Sin comisión' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="glass-panel border border-gray-800/60 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                      <Icon className="w-4 h-4 text-neon-gold" />
                      <span className="text-gray-400 text-[10px] uppercase tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer de agradecimiento */}
            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm">
                {t.donateFooter}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
