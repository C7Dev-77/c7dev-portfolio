'use client';

import { useState, useCallback } from 'react';
import { Play, Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Star, Layers } from 'lucide-react';

interface ProductMediaGalleryProps {
    imagenUrl: string;
    videoUrl?: string;
    capturas?: string[];
    nombre: string;
    categoria?: string;
    destacado?: boolean;
    precio: string;
}

/**
 * Convierte cualquier URL de YouTube o Vimeo a su versión embed.
 * Soporta: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 *          vimeo.com/ID, player.vimeo.com/video/ID
 */
function getEmbedUrl(url: string): string {
    if (!url) return '';

    // Ya es embed de YouTube
    if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/')) {
        return url;
    }

    // youtube.com/watch?v=VIDEO_ID
    const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytWatch) {
        return `https://www.youtube.com/embed/${ytWatch[1]}?rel=0&modestbranding=1&playsinline=1`;
    }

    // Ya es embed de Vimeo
    if (url.includes('player.vimeo.com/video/')) {
        return url;
    }

    // vimeo.com/VIDEO_ID
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?color=FFD700&title=0&byline=0&portrait=0`;
    }

    // Devolver tal cual (puede ser embed custom u otro iframe)
    return url;
}

/** Detecta si una URL es de YouTube o Vimeo */
function isVideoUrl(url: string): boolean {
    return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

type MediaItem =
    | { type: 'video'; url: string }
    | { type: 'image'; url: string };

export default function ProductMediaGallery({
    imagenUrl,
    videoUrl,
    capturas = [],
    nombre,
    categoria = 'Código',
    destacado = false,
    precio,
}: ProductMediaGalleryProps) {
    // Construir lista ordenada de items: video primero (si existe), luego imagen principal, luego capturas
    const mediaItems: MediaItem[] = [
        ...(videoUrl ? [{ type: 'video' as const, url: videoUrl }] : []),
        ...(imagenUrl ? [{ type: 'image' as const, url: imagenUrl }] : []),
        ...capturas.filter(Boolean).map(url => ({ type: 'image' as const, url })),
    ];

    // El ítem activo en el visor principal (por defecto: video si hay, o imagen principal)
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const activeItem = mediaItems[activeIndex] ?? null;

    const openLightbox = useCallback((idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const lbPrev = useCallback(() => {
        setLightboxIndex(i => (i - 1 + mediaItems.length) % mediaItems.length);
    }, [mediaItems.length]);

    const lbNext = useCallback(() => {
        setLightboxIndex(i => (i + 1) % mediaItems.length);
    }, [mediaItems.length]);

    // Solo las imágenes pueden ir al lightbox (no video)
    const imageItems = mediaItems.filter(m => m.type === 'image');
    const imageIndexMap = mediaItems.map((m, i) => ({ m, i })).filter(({ m }) => m.type === 'image');

    return (
        <div className="space-y-4">
            {/* ── VISOR PRINCIPAL ── */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.6)] group bg-black">
                {activeItem?.type === 'video' ? (
                    <>
                        {/* Badge Demo en Vivo */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
                            <Play className="w-4 h-4 text-neon-gold fill-neon-gold" />
                            <span className="text-xs text-white uppercase tracking-wider font-semibold">Demo en Vivo</span>
                        </div>
                        <iframe
                            src={getEmbedUrl(activeItem.url)}
                            title={`Demo de ${nombre}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full border-0"
                        />
                    </>
                ) : activeItem?.type === 'image' ? (
                    <>
                        <img
                            src={activeItem.url}
                            alt={nombre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            // @ts-ignore
                            fetchPriority="high"
                            decoding="async"
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Badge Categoría */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
                            <Layers className="w-4 h-4 text-neon-gold" />
                            <span className="text-xs text-white uppercase tracking-wider">{categoria}</span>
                        </div>

                        {/* Badge Destacado */}
                        {destacado && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon-gold/90 text-black px-3 py-1.5 rounded-full pointer-events-none">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs font-bold uppercase">Destacado</span>
                            </div>
                        )}

                        {/* Precio */}
                        <div className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-xl rounded-xl shadow-lg pointer-events-none">
                            ${precio}
                        </div>

                        {/* Botón expandir lightbox */}
                        <button
                            onClick={() => {
                                const imgIdx = imageIndexMap.findIndex(({ i }) => i === activeIndex);
                                openLightbox(imgIdx >= 0 ? imgIdx : 0);
                            }}
                            className="absolute bottom-4 left-4 p-2 bg-black/60 hover:bg-black/80 rounded-xl text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                            title="Ver en grande"
                            aria-label="Abrir imagen en pantalla completa"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
                        <ImageIcon className="w-16 h-16 text-gray-700" />
                    </div>
                )}
            </div>

            {/* ── TIRA DE THUMBNAILS (solo si hay más de 1 item) ── */}
            {mediaItems.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
                    {mediaItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={item.type === 'video' ? 'Ver video demo' : `Ver captura ${idx + 1}`}
                            className={`
                                relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200
                                ${activeIndex === idx
                                    ? 'border-neon-gold shadow-[0_0_12px_rgba(255,215,0,0.5)] scale-105'
                                    : 'border-gray-700 hover:border-gray-500 hover:scale-[1.03] opacity-70 hover:opacity-100'
                                }
                            `}
                        >
                            {item.type === 'video' ? (
                                <>
                                    {/* Thumbnail de video: usa el thumbnail de YouTube si aplica */}
                                    {(() => {
                                        const ytMatch = item.url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                                        const vimeoMatch = item.url.match(/vimeo\.com\/(\d+)/);
                                        const thumbUrl = ytMatch
                                            ? `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`
                                            : null;
                                        return thumbUrl ? (
                                            <img src={thumbUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                <Play className="w-5 h-5 text-gray-500" />
                                            </div>
                                        );
                                    })()}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <Play className="w-4 h-4 text-white fill-white drop-shadow" />
                                    </div>
                                </>
                            ) : (
                                <img
                                    src={item.url}
                                    alt={`Miniatura ${idx + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {/* Indicador activo */}
                            {activeIndex === idx && (
                                <div className="absolute inset-0 ring-2 ring-inset ring-neon-gold/60 rounded-lg pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* ── LIGHTBOX ── */}
            {lightboxOpen && imageItems.length > 0 && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Botón cerrar */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors z-10"
                        aria-label="Cerrar"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Contador */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-black/50 px-3 py-1 rounded-full">
                        {lightboxIndex + 1} / {imageItems.length}
                    </div>

                    {/* Flechas */}
                    {imageItems.length > 1 && (
                        <>
                            <button
                                onClick={e => { e.stopPropagation(); lbPrev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-neon-gold/20 rounded-xl text-white hover:text-neon-gold transition-all z-10"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); lbNext(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-neon-gold/20 rounded-xl text-white hover:text-neon-gold transition-all z-10"
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Imagen activa en lightbox */}
                    <div
                        className="max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center px-16"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            key={lightboxIndex}
                            src={(imageItems[lightboxIndex] as { type: 'image'; url: string }).url}
                            alt={`${nombre} - captura ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
                        />
                    </div>

                    {/* Tira de thumbs en lightbox */}
                    {imageItems.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                            {imageItems.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                                    className={`w-10 h-7 rounded overflow-hidden border-2 transition-all ${i === lightboxIndex ? 'border-neon-gold scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    aria-label={`Ver imagen ${i + 1}`}
                                >
                                    <img
                                        src={(img as { type: 'image'; url: string }).url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
