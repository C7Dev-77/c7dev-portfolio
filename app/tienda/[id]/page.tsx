// app/tienda/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import {
    ArrowLeft,
    Calendar,
    Tag,
    ChevronRight,
    Code2,
    Check,
    Sparkles,
    ShieldCheck,
    Clock,
    Star
} from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import ProjectStats from '@/components/ProjectStats';
import DownloadButtons from '@/components/DownloadButtons';
import ProductMediaGallery from '@/components/ProductMediaGallery';

// Revalidar cada 10 segundos (ISR — bots de IA y CDN siempre ven datos frescos)
export const revalidate = 10;

// Consulta en caché para evitar llamadas duplicadas entre generateMetadata y la Página
const getProduct = cache(async (idOrSlug: string) => {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    let raw: any = null;

    // 1. Intentar en products_public
    if (isUUID) {
        const { data } = await (supabase.from('products_public' as any) as any)
            .select('*')
            .eq('id', idOrSlug)
            .single();
        raw = data;
    } else {
        const { data } = await (supabase.from('products_public' as any) as any)
            .select('*')
            .eq('slug', idOrSlug)
            .single();
        raw = data;
    }

    // Fallback: si no encontró por slug (o por id), intentar la otra columna
    if (!raw) {
        const fallbackCol = isUUID ? 'slug' : 'id';
        const { data } = await (supabase.from('products_public' as any) as any)
            .select('*')
            .eq(fallbackCol, idOrSlug)
            .single();
        raw = data;
    }

    // 2. Fallback a la tabla products directamente
    if (!raw) {
        const { data: direct } = await (supabase.from('products' as any) as any)
            .select('*')
            .eq(isUUID ? 'id' : 'slug', idOrSlug)
            .single();
        raw = direct;
    }

    // 3. Fallback a la tabla legacy si no existe en products_public
    if (!raw) {
        const { data: legacy } = await (supabase.from('productos' as any) as any)
            .select('*')
            .eq(isUUID ? 'id' : 'slug', idOrSlug)
            .single();
        raw = legacy;
    }

    return raw;
});

// Consulta de productos relacionados
const getRelatedProducts = cache(async (excludeId: string) => {
    const { data: relRaw } = await (supabase.from('products_public' as any) as any)
        .select('id, title, nombre, image_url, imagen_url, price_cents, precio, tags, slug')
        .neq('id', excludeId)
        .limit(3);

    return (relRaw || []).map((r: any) => ({
        id: r.id,
        slug: r.slug,
        nombre: r.title || r.nombre || 'Producto',
        imagen_url: r.image_url || r.imagen_url || '',
        precio: typeof r.price_cents === 'number' ? r.price_cents / 100 : (r.precio || 0),
        tags: r.tags || []
    }));
});

// Generar metadata dinámica para SEO (usa getProduct memorizado)
export async function generateMetadata({ params }: { params: { id: string } }) {
    const raw = await getProduct(params.id);

    if (!raw) {
        return { title: 'Producto no encontrado - C7Dev' };
    }

    const title = raw.title || raw.nombre || 'Producto';
    const description = raw.description || raw.descripcion || '';
    const imageUrl = raw.image_url || raw.imagen_url || '';
    const canonicalSlug = raw.slug || raw.id;

    return {
        title: `${title} - C7Dev Digital Codes`,
        description,
        alternates: {
            canonical: `/tienda/${canonicalSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://c7dev-portfolio.vercel.app/tienda/${canonicalSlug}`,
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

export default async function ProductoDetallePage({ params }: { params: { id: string } }) {
    const [raw, relacionados] = await Promise.all([
        getProduct(params.id),
        getRelatedProducts(params.id)
    ]);

    if (!raw) {
        notFound();
    }

    // Normalizar objeto producto
    const producto = {
        id: raw.id,
        slug: raw.slug || '',
        nombre: raw.title || raw.nombre || 'Sin nombre',
        descripcion: raw.description || raw.descripcion || 'Sin descripción',
        precio: typeof raw.price_cents === 'number' ? raw.price_cents / 100 : (raw.precio || 0),
        imagen_url: raw.image_url || raw.imagen_url || '',
        link_free: raw.link_free || raw.download_url || raw.free_download_url || (raw.has_free_version ? `/descargar/${raw.id}` : ''),
        link_paid: raw.link_paid || raw.external_product_id || raw.paid_url || raw.checkout_url || '',
        video_url: raw.video_url || undefined,
        capturas: (Array.isArray(raw.capturas) ? raw.capturas : []).filter(Boolean) as string[],
        tags: raw.tags || [],
        categoria: raw.category || raw.categoria || 'Código',
        destacado: raw.is_featured || raw.destacado || false,
        display_order: raw.display_order ?? raw.orden ?? 0,
        created_at: raw.created_at || new Date().toISOString()
    };

    const fechaFormateada = new Date(producto.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Características del producto
    const caracteristicas = [
        'Código fuente completo y estructurado',
        'Documentación y guías de uso incluidas',
        'Uso comercial y personal permitido',
        'Actualizaciones y soporte directo por email',
        'Descarga directa de recursos y código fuente'
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

                        {/* Galería interactiva: video + imagen principal + capturas */}
                        <ProductMediaGallery
                            imagenUrl={producto.imagen_url}
                            videoUrl={producto.video_url}
                            capturas={producto.capturas}
                            nombre={producto.nombre}
                            categoria={producto.categoria}
                            destacado={producto.destacado}
                        />

                        {/* Características y Especificaciones de Descarga */}
                        <div className="glass-panel p-6 rounded-2xl space-y-6">
                            <div>
                                <h3 className="text-sm text-neon-platinum uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    ¿Qué incluye?
                                </h3>
                                <ul className="space-y-3">
                                    {caracteristicas.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Especificación sobre la descarga gratuita */}
                            <div className="pt-4 border-t border-gray-800/80">
                                <div className="flex items-start gap-2.5 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 p-3.5 rounded-xl">
                                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                                    <div>
                                        <span className="font-bold block text-emerald-300">Descarga Gratuita</span>
                                        Haz clic en <span className="text-white font-medium">Descargar Gratis</span> para acceder al enlace de descarga directa del código fuente listo para implementar.
                                    </div>
                                </div>
                            </div>
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

                        {/* Descarga gratuita y Apoyo con incremento de descargas */}
                        <DownloadButtons
                            productId={producto.id}
                            linkFree={producto.link_free}
                            linkPaid={producto.link_paid}
                        />

                        {/* Descripción */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-sm text-neon-platinum uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                Sobre este Código
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
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
                                    href={`/tienda/${rel.slug || rel.id}`}
                                    className="group glass-panel rounded-xl overflow-hidden hover:border-neon-gold/50 transition-all"
                                >
                                    <div className="aspect-video overflow-hidden relative">
                                        <img
                                            src={rel.imagen_url}
                                            alt={rel.nombre}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-lg backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                            Gratis
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
