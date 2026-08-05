'use client';

import { Suspense } from 'react';
import FreeDownloadGate from '@/components/FreeDownloadGate';

export default function DescargarRetornoPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-4 cyber-grid flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <Suspense 
          fallback={
            <div className="text-center text-neon-gold py-10 uppercase tracking-widest text-sm">
              Cargando tu sesión de descarga...
            </div>
          }
        >
          <FreeDownloadGate />
        </Suspense>
      </div>
    </main>
  );
}
