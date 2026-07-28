'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdBanner from '@/components/AdBanner';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

export default function DescargarPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkFree, setLinkFree] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [canDownload, setCanDownload] = useState(false);
  const [productName, setProductName] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('nombre, link_free')
          .eq('id', params.id)
          .single();

        if (error || !data) {
          throw new Error('Producto no encontrado');
        }

        if (!data.link_free) {
          throw new Error('Este producto no tiene versión gratuita.');
        }

        setProductName(data.nombre);
        setLinkFree(data.link_free);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (!loading && !error && linkFree) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCanDownload(true);
      }
    }
  }, [timeLeft, loading, error, linkFree]);

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 cyber-grid flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* AdBanner Top */}
        <div className="mb-8">
          <AdBanner dataAdSlot="INSERT_YOUR_AD_SLOT_TOP" />
        </div>

        <div className="glass-panel p-8 text-center border-l-4 border-neon-gold mb-8 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="w-12 h-12 text-neon-gold animate-spin mb-4" />
              <p className="text-gray-400 uppercase tracking-widest text-sm">Cargando recurso...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl text-red-500 font-outfit uppercase tracking-widest mb-2">Error</h2>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : (
            <div className="py-4">
              <h1 className="text-2xl md:text-3xl font-black text-white font-outfit uppercase tracking-tighter mb-4">
                Descargando: <GlitchText text={productName} className="text-neon-gold" />
              </h1>
              
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Tu enlace de descarga segura se está generando. Por favor, apoya nuestro trabajo viendo los anuncios o compartiendo el sitio.
              </p>

              {!canDownload ? (
                <div className="inline-flex flex-col items-center justify-center p-6 bg-black/50 border border-gray-800 rounded-xl min-w-[200px]">
                  <span className="text-4xl font-black text-neon-gold mb-2 font-mono">{timeLeft}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Segundos de espera</span>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in duration-500">
                  <a
                    href={linkFree!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-black font-bold text-lg uppercase hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all rounded-xl"
                  >
                    <Download className="w-6 h-6" />
                    ¡Obtener Enlace!
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AdBanner Bottom */}
        <div className="mt-8">
          <AdBanner dataAdSlot="INSERT_YOUR_AD_SLOT_BOTTOM" />
        </div>
      </div>
    </main>
  );
}
