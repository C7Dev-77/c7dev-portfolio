'use client';

import { useState } from 'react';
import { Copy, Check, Heart, QrCode } from 'lucide-react';

const BREB_KEY = 'cristian.dev'; // ← Reemplaza con tu llave Bre-B/Nu real

export default function DonationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(BREB_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-16 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-neon-gold text-xs uppercase tracking-widest mb-3 border border-neon-gold/30 px-4 py-1.5 rounded-full">
          <Heart className="w-3 h-3 fill-neon-gold" />
          Apóyame
        </div>
        <h2 className="font-outfit text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
          Si el código te sirvió,<br />
          <span className="text-neon-gold">invítame un café</span>
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          Transferencia directa vía <span className="text-white font-medium">Bre-B / Nequi</span>.
          Sin comisiones, sin redirección, sin intermediarios.
        </p>
      </div>

      {/* Card */}
      <div className="glass-panel border border-gray-800 hover:border-neon-gold/40 transition-colors duration-300 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* QR */}
        <div className="flex-shrink-0 w-36 h-36 bg-white rounded-xl overflow-hidden flex items-center justify-center">
          {/* Sube tu QR a /public/donaciones-qr.png */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/donaciones-qr.png"
            alt="QR Bre-B / Nequi de CristianDev"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Placeholder si aún no has subido el QR
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const parent = (e.currentTarget as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = `<div class="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><span class="text-[10px] text-center px-2">Sube<br/>donaciones-qr.png</span></div>`;
              }
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest text-xs">Llave Bre-B / Nequi</p>
          <p className="text-white font-mono text-lg font-bold mb-4">{BREB_KEY}</p>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-neon-gold/10 text-neon-gold border border-neon-gold/30 hover:bg-neon-gold/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar llave
              </>
            )}
          </button>

          <p className="text-gray-700 text-xs mt-4">
            Cualquier monto es bienvenido 🙏 Gracias por el apoyo.
          </p>
        </div>
      </div>
    </section>
  );
}
