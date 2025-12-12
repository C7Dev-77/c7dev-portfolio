// app/portafolio/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Play,
    Calendar,
    Tag,
    ChevronLeft,
    ChevronRight,
    Star,
    Eye,
    Code2,
    Layers
} from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import ProjectStats from '@/components/ProjectStats';

interface Proyecto {
    id: string;
    titulo: string;
    descripcion: string;
    imagen_url: string;
    repo_url?: string;
    demo_url?: string;
    video_url?: string;
    capturas?: string[];
    tags?: string[];
    categoria?: string;
    destacado?: boolean;
    created_at: string;
}

export const dynamic = 'force-dynamic';

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data: proyecto } = await (supabase.from('proyectos') as any)
        .select('*')
        .eq('id', params.id)
        .single();

    if (!proyecto) {
        return { title: 'Proyecto no encontrado - C7Dev' };
    }

    return {
        title: `${proyecto.titulo} - C7Dev Portfolio`,
        description: proyecto.descripcion,
        openGraph: {
            title: proyecto.titulo,
            description: proyecto.descripcion,
            images: [proyecto.imagen_url],
        },
    };
}

export default async function ProyectoDetallePage({ params }: { params: { id: string } }) {
    const { data: proyecto, error } = await (supabase.from('proyectos') as any)
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !proyecto) {
        notFound();
    }

    // Obtener proyectos relacionados (misma categoría)
    const { data: relacionados } = await (supabase.from('proyectos') as any)
        .select('id, titulo, imagen_url, tags')
        .neq('id', params.id)
        .eq('categoria', proyecto.categoria || 'Web')
        .limit(3);

    const allImages = [proyecto.imagen_url, ...(proyecto.capturas || [])];
    const fechaFormateada = new Date(proyecto.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-8">
                    <Link
                        href="/portafolio"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-gold transition-colors text-sm uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Portafolio
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* ========== COLUMNA IZQUIERDA: MEDIA ========== */}
                    <div className="space-y-6">

                        {/* Video Demo (si existe) */}
                        {proyecto.video_url && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-neon-gold/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <Play className="w-4 h-4 text-neon-gold" />
                                    <span className="text-xs text-white uppercase tracking-wider">Demo en Vivo</span>
                                </div>
                                <iframe
                                    src={proyecto.video_url}
                                    title={`Demo de ${proyecto.titulo}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        )}

                        {/* Imagen Principal (si NO hay video) */}
                        {!proyecto.video_url && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 group">
                                <img
                                    src={proyecto.imagen_url}
                                    alt={proyecto.titulo}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay con efecto */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Badge de categoría */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <Layers className="w-4 h-4 text-neon-platinum" />
                                    <span className="text-xs text-white uppercase tracking-wider">{proyecto.categoria || 'Proyecto'}</span>
                                </div>

                                {/* Badge destacado */}
                                {proyecto.destacado && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon-gold/90 text-black px-3 py-1.5 rounded-full">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold uppercase">Destacado</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Galería de Capturas */}
                        {allImages.length > 1 && (
                            <div className="space-y-3">
                                <h3 className="text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Capturas del Proyecto
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {allImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-video rounded-lg overflow-hidden border border-gray-800 hover:border-neon-gold/50 transition-colors cursor-pointer group"
                                        >
                                            <img
                                                src={img}
                                                alt={`Captura ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ========== COLUMNA DERECHA: INFO ========== */}
                    <div className="space-y-8">

                        {/* Título y Meta */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {proyecto.destacado && (
                                    <span className="flex items-center gap-1 bg-neon-gold/10 text-neon-gold px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                        <Star className="w-3 h-3 fill-current" />
                                        Destacado
                                    </span>
                                )}
                                <span className="flex items-center gap-1 text-gray-500 text-xs">
                                    <Calendar className="w-3 h-3" />
                                    {fechaFormateada}
                                </span>
                            </div>

                            <h1 className="font-outfit text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                                <GlitchText text={proyecto.titulo} className="text-white" />
                            </h1>

                            {/* Tags */}
                            {proyecto.tags && proyecto.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {proyecto.tags.map((tag: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="flex items-center gap-1 text-xs border border-gray-700 px-3 py-1.5 rounded-lg text-gray-400 hover:border-neon-gold hover:text-neon-gold transition-colors"
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-sm text-neon-platinum uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                Sobre el Proyecto
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {proyecto.descripcion}
                            </p>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {proyecto.demo_url && (
                                <a
                                    href={proyecto.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all group"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Ver Demo en Vivo
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                        </div>

                        {/* Estadísticas reales del proyecto */}
                        <ProjectStats projectId={proyecto.id} type="portfolio" />
                    </div>
                </div>

                {/* ========== PROYECTOS RELACIONADOS ========== */}
                {relacionados && relacionados.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-outfit text-2xl font-bold text-white uppercase tracking-wider">
                                Proyectos Similares
                            </h2>
                            <Link
                                href="/portafolio"
                                className="text-sm text-gray-400 hover:text-neon-gold transition-colors flex items-center gap-2"
                            >
                                Ver todos
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relacionados.map((rel: any) => (
                                <Link
                                    key={rel.id}
                                    href={`/portafolio/${rel.id}`}
                                    className="group glass-panel rounded-xl overflow-hidden hover:border-neon-gold/50 transition-all"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={rel.imagen_url}
                                            alt={rel.titulo}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-semibold group-hover:text-neon-gold transition-colors">
                                            {rel.titulo}
                                        </h3>
                                        <div className="flex gap-2 mt-2">
                                            {rel.tags?.slice(0, 2).map((tag: string, i: number) => (
                                                <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
