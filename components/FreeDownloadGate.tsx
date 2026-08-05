'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export default function FreeDownloadGate() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl text-red-500 font-outfit uppercase tracking-widest mb-2">Error</h2>
        <p className="text-gray-400 text-sm">No se encontró el token de descarga.</p>
      </div>
    );
  }

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch(`/api/claims/${token}/download`, { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Error al generar la descarga');
      
      // Abrir o redirigir a la URL firmada de Supabase Storage
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-8 w-full">
        <AdBanner dataAdSlot="INSERT_YOUR_AD_SLOT_TOP" />
      </div>
      
      <div className="glass-panel p-8 text-center border-l-4 border-neon-gold mb-8 relative z-10 w-full max-w-lg">
        {error ? (
           <div className="flex flex-col items-center justify-center py-10">
             <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
             <h2 className="text-xl text-red-500 font-outfit uppercase tracking-widest mb-2">Error</h2>
             <p className="text-gray-400 text-sm">{error}</p>
           </div>
        ) : secondsLeft > 0 ? (
           <div className="py-8">
             <h2 className="text-xl md:text-2xl text-white font-bold mb-6 font-outfit uppercase tracking-tighter">
               Desbloqueando Enlace
             </h2>
             <div className="inline-flex flex-col items-center justify-center p-6 bg-black/50 border border-gray-800 rounded-xl min-w-[200px]">
               <span className="text-4xl font-black text-neon-gold mb-2 font-mono">{secondsLeft}</span>
               <span className="text-xs text-gray-500 uppercase tracking-widest">Segundos de espera</span>
             </div>
             <p className="text-gray-400 mt-6 text-sm max-w-sm mx-auto">
               Apoya mi trabajo interactuando con los anuncios mientras preparamos tu descarga.
             </p>
           </div>
        ) : (
           <div className="py-8 animate-in fade-in zoom-in duration-500">
             <h2 className="text-xl md:text-2xl text-white font-bold mb-6 font-outfit uppercase tracking-tighter">
               ¡Enlace Listo!
             </h2>
             <button
               onClick={handleDownload}
               disabled={downloading}
               className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-black font-bold text-lg uppercase hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {downloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
               {downloading ? 'Generando Archivo...' : '¡Descargar Archivo!'}
             </button>
           </div>
        )}
      </div>

      <div className="mt-8 w-full">
        <AdBanner dataAdSlot="INSERT_YOUR_AD_SLOT_BOTTOM" />
      </div>
    </div>
  );
}
