'use client';
import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

export default function GenerarDescargaPage({ params }: { params: { id: string } }) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initClaim = async () => {
      try {
        const res = await fetch('/api/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: params.id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al generar la descarga');
        
        // Redirigir al usuario a Work.ink
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    initClaim();
  }, [params.id]);

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 cyber-grid flex flex-col items-center">
      <div className="glass-panel p-8 text-center border-l-4 border-neon-gold mb-8 max-w-lg w-full">
        {error ? (
          <div className="flex flex-col items-center py-10">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-xl text-red-500 font-outfit uppercase tracking-widest mb-2">Error</h2>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-10">
            <Loader2 className="w-12 h-12 text-neon-gold animate-spin mb-6" />
            <h1 className="text-xl md:text-2xl text-white font-outfit uppercase tracking-tighter mb-3">
              <GlitchText text="Preparando Enlace..." className="text-neon-gold" />
            </h1>
            <p className="text-gray-400 text-sm">
              Estamos configurando tu descarga segura.<br/>Serás redirigido en un momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
