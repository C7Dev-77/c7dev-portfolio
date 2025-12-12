// app/tienda/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Download,
    CreditCard,
    Play,
    Calendar,
    Tag,
    ChevronRight,
    Star,
    Eye,
    Code2,
    Layers,
    Package,
    Check,
    Sparkles
} from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import ProjectStats from '@/components/ProjectStats';
import DownloadButtons from '@/components/DownloadButtons';

interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen_url: string;
    link_free: string;
    link_paid: string;
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
    const { data: producto } = await (supabase.from('productos') as any)
        .select('*')
        .eq('id', params.id)
        .single();

    if (!producto) {
        return { title: 'Producto no encontrado - C7Dev' };
    }

    return {
        title: `${producto.nombre} - C7Dev Digital Codes`,
        description: producto.descripcion,
        openGraph: {
            title: producto.nombre,
            description: producto.descripcion,
            images: [producto.imagen_url],
        },
    };
}

export default async function ProductoDetallePage({ params }: { params: { id: string } }) {
    const { data: producto, error } = await (supabase.from('productos') as any)
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !producto) {
        notFound();
    }

    // Obtener productos relacionados (misma categoría)
    const { data: relacionados } = await (supabase.from('productos') as any)
        .select('id, nombre, imagen_url, precio, tags')
        .neq('id', params.id)
        .eq('categoria', producto.categoria || 'Código')
        .limit(3);

    const allImages = [producto.imagen_url, ...(producto.capturas || [])];
    const fechaFormateada = new Date(producto.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Formatear precio
    const formatPrice = (precio: number) => {
        if (typeof precio !== 'number' || isNaN(precio)) return '0.00';
        return precio.toFixed(2);
    };

    // Características del producto (puedes personalizar)
    const caracteristicas = [
        'Código fuente completo',
        'Documentación incluida',
        'Actualizaciones gratuitas',
        'Soporte por email',
        'Uso comercial permitido'
    ];

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 cyber-grid">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-8">
                    <Link
                        href="/tienda"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-gold transition-colors text-sm uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la Tienda
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* ========== COLUMNA IZQUIERDA: MEDIA ========== */}
                    <div className="space-y-6">

                        {/* Video Demo (si existe) */}
                        {producto.video_url && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-neon-gold/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <Play className="w-4 h-4 text-neon-gold" />
                                    <span className="text-xs text-white uppercase tracking-wider">Demo en Vivo</span>
                                </div>
                                <iframe
                                    src={producto.video_url}
                                    title={`Demo de ${producto.nombre}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        )}

                        {/* Imagen Principal (si NO hay video) */}
                        {!producto.video_url && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 group">
                                <img
                                    src={producto.imagen_url}
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay con efecto */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Badge de categoría */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <Layers className="w-4 h-4 text-neon-gold" />
                                    <span className="text-xs text-white uppercase tracking-wider">{producto.categoria || 'Código'}</span>
                                </div>

                                {/* Badge destacado */}
                                {producto.destacado && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon-gold/90 text-black px-3 py-1.5 rounded-full">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold uppercase">Destacado</span>
                                    </div>
                                )}

                                {/* Precio superpuesto */}
                                <div className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-xl rounded-xl shadow-lg">
                                    ${formatPrice(producto.precio)}
                                </div>
                            </div>
                        )}

                        {/* Galería de Capturas */}
                        {allImages.length > 1 && (
                            <div className="space-y-3">
                                <h3 className="text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Capturas del Código
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

                        {/* Características */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-sm text-neon-platinum uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                ¿Qué incluye?
                            </h3>
                            <ul className="space-y-3">
                                {caracteristicas.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ========== COLUMNA DERECHA: INFO ========== */}
                    <div className="space-y-8">

                        {/* Título y Meta */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {producto.destacado && (
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
                                <GlitchText text={producto.nombre} className="text-white" />
                            </h1>

                            {/* Tags */}
                            {producto.tags && producto.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {producto.tags.map((tag: string, idx: number) => (
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

                        {/* Precio y CTA con incremento de descargas */}
                        <DownloadButtons
                            productId={producto.id}
                            linkFree={producto.link_free}
                            linkPaid={producto.link_paid}
                            precio={formatPrice(producto.precio)}
                        />

                        {/* Descripción */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-sm text-neon-platinum uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                Sobre este Código
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {producto.descripcion}
                            </p>
                        </div>

                        {/* Estadísticas reales del producto */}
                        <ProjectStats projectId={producto.id} type="product" />
                    </div>
                </div>

                {/* ========== PRODUCTOS RELACIONADOS ========== */}
                {relacionados && relacionados.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-outfit text-2xl font-bold text-white uppercase tracking-wider">
                                Códigos Similares
                            </h2>
                            <Link
                                href="/tienda"
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
                                    href={`/tienda/${rel.id}`}
                                    className="group glass-panel rounded-xl overflow-hidden hover:border-neon-gold/50 transition-all"
                                >
                                    <div className="aspect-video overflow-hidden relative">
                                        <img
                                            src={rel.imagen_url}
                                            alt={rel.nombre}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-sm rounded-lg">
                                            ${formatPrice(rel.precio)}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-semibold group-hover:text-neon-gold transition-colors">
                                            {rel.nombre}
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
