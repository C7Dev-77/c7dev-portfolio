// app/portafolio/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ExternalLink, Github, Folder, Play, Star, Filter, Search, ChevronRight, Layers } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

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

  // Agrupar por categoría para filtros
  const categorias: string[] = proyectos
    ? Array.from(new Set(proyectos.map((p: Proyecto) => p.categoria || 'Otros')))
    : [];

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

        {/* Filtros por Categoría */}
        {categorias.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            <button className="flex items-center gap-2 px-4 py-2 bg-neon-gold text-black rounded-lg text-xs font-bold uppercase tracking-wider">
              <Filter className="w-3 h-3" />
              Todos
            </button>
            {categorias.map((cat: string) => (
              <button
                key={cat}
                className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:border-neon-platinum hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid de Proyectos */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {proyectos.map((proy: Proyecto, idx: number) => (
              <Link
                key={proy.id}
                href={`/portafolio/${proy.id}`}
                className="glass-panel group relative overflow-hidden flex flex-col md:flex-row hover:border-neon-gold/50 transition-all duration-300"
              >
                {/* Imagen con overlay de video si existe */}
                <div className="md:w-1/2 aspect-square overflow-hidden relative">
                  <img
                    src={proy.imagen_url}
                    alt={proy.titulo}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                  />

                  {/* Badge de Video */}
                  {proy.video_url && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Play className="w-3 h-3 text-neon-gold fill-neon-gold" />
                      <span className="text-[10px] text-white uppercase tracking-wider">Video Demo</span>
                    </div>
                  )}

                  {/* Badge Destacado */}
                  {proy.destacado && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon-gold/90 text-black px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                  <div>
                    {/* Categoría y número */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3 text-neon-platinum" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          {proy.categoria || 'Proyecto'}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-600">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-outfit text-xl md:text-2xl text-white mb-4 group-hover:text-neon-gold transition-colors leading-tight">
                      {proy.titulo}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proy.tags?.slice(0, 4).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] border border-gray-700 px-2 py-1 text-gray-400 uppercase tracking-tighter rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {proy.tags && proy.tags.length > 4 && (
                        <span className="text-[9px] text-gray-600">+{proy.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Descripción corta */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {proy.descripcion}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                      {proy.repo_url && (
                        <span className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Github className="w-4 h-4" />
                        </span>
                      )}
                      {proy.demo_url && (
                        <span className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-neon-gold">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    <span className="flex items-center gap-2 text-neon-gold text-[10px] uppercase font-bold tracking-widest group-hover:gap-4 transition-all">
                      Ver Proyecto
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {proyectos && proyectos.length > 0 && (
          <div className="mt-20 text-center">
            <div className="glass-panel inline-flex flex-col items-center p-8 rounded-2xl">
              <p className="text-gray-400 mb-4">¿Te interesa alguno de estos proyectos?</p>
              <Link
                href="/#contacto"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
              >
                Contáctame
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}