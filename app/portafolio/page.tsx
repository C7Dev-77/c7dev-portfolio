// app/portafolio/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import GlitchText from '@/components/GlitchText';
import PortfolioGrid from '@/components/PortfolioGrid';
import { Folder, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  repo_url?: string;
  demo_url?: string;
  video_url?: string;
  tags?: string[];
  categoria?: string;
  destacado?: boolean;
  orden?: number;
}

export default async function PortfolioPage() {
  const { data: proyectos, error } = await (supabase.from('proyectos') as any)
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 border-l-4 border-neon-platinum pl-6">
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
            <GlitchText text="Portafolio" className="text-white" />
          </h1>
          <p className="text-gray-500 font-sans tracking-tighter">
            Explorando las fronteras entre el diseño y el código puro.
          </p>
        </div>

        {/* Grid de Proyectos con Filtros */}
        {error ? (
          <div className="text-red-500 text-center p-10 glass-panel uppercase text-xs tracking-widest">
            Error al cargar los proyectos. Intenta recargar la página.
          </div>
        ) : !proyectos || proyectos.length === 0 ? (
          <div className="text-center p-20 glass-panel">
            <Folder className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 uppercase tracking-widest text-sm mb-2">
              No hay proyectos disponibles
            </p>
            <p className="text-gray-600 text-sm">
              Los proyectos aparecerán aquí cuando los agregues desde el panel de administración.
            </p>
          </div>
        ) : (
          <PortfolioGrid proyectos={proyectos} />
        )}

        {/* Call to Action */}
        {proyectos && proyectos.length > 0 && (
          <div className="mt-20 text-center">
            <div className="glass-panel inline-flex flex-col items-center p-8 rounded-2xl">
              <p className="text-gray-400 mb-4">¿Te interesa alguno de estos proyectos?</p>
              <a
                href="https://wa.me/573244259132?text=Hola,%20me%20interesan%20tus%20proyectos,%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
              >
                Contáctame
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}