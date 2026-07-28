'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, Loader2, AlertCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontró el identificador de la sesión de pago.');
      setLoading(false);
      return;
    }

    const verifyAndGetDownload = async () => {
      try {
        const res = await fetch('/api/download/paid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error verificando el pago');
        }

        setDownloadLink(data.link);
        
        // Descarga automática opcional
        // if (data.link) {
        //   window.location.href = data.link;
        // }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    verifyAndGetDownload();
  }, [sessionId]);

  return (
    <div className="glass-panel max-w-lg mx-auto p-8 text-center border-t-4 border-t-neon-gold">
      {loading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 text-neon-gold animate-spin mb-4" />
          <h2 className="text-xl text-white font-outfit uppercase tracking-widest">Validando pago...</h2>
          <p className="text-gray-500 mt-2 text-sm">Por favor espera, estamos procesando tu descarga.</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl text-red-500 font-outfit uppercase tracking-widest mb-2">Error</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <a href="/tienda" className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm uppercase">
            Volver a la tienda
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl text-white font-outfit uppercase font-bold mb-2">
            ¡Pago <GlitchText text="Exitoso" className="text-green-500" />!
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Tu pago ha sido procesado correctamente. Gracias por tu compra.
          </p>

          {downloadLink && (
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-4 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-lg uppercase hover:shadow-lg hover:shadow-neon-gold/25 transition-all flex items-center justify-center gap-3 rounded-xl mb-4"
            >
              <Download className="w-6 h-6" />
              Descargar Archivo
            </a>
          )}
          
          <a href="/tienda" className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
            Volver a explorar productos
          </a>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-4 cyber-grid flex items-center justify-center">
      <Suspense fallback={<div className="text-neon-gold text-center">Cargando...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
