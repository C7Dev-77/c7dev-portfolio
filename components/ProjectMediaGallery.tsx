'use client';

import { useState, useCallback, useMemo } from 'react';
import { Play, Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Star, Layers } from 'lucide-react';

interface ProjectMediaGalleryProps {
    imagenUrl: string;
    videoUrl?: string;
    capturas?: string[];
    titulo: string;
    categoria?: string;
    destacado?: boolean;
}

/**
 * Convierte cualquier URL de YouTube o Vimeo a su versión embed interactiva y segura.
 * Soporta: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 *          vimeo.com/ID, player.vimeo.com/video/ID
 */
function getEmbedUrl(url: string): string {
    if (!url) return '';

    // Si ya es embed de YouTube
    if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/')) {
        return url;
    }

    // youtube.com/watch?v=VIDEO_ID o youtu.be/VIDEO_ID
    const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytWatch) {
        return `https://www.youtube.com/embed/${ytWatch[1]}?rel=0&modestbranding=1&playsinline=1`;
    }

    // Si ya es embed de Vimeo
    if (url.includes('player.vimeo.com/video/')) {
        return url;
    }

    // vimeo.com/VIDEO_ID
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?color=FFD700&title=0&byline=0&portrait=0`;
    }

    // Devolver tal cual para otros iframes o URLs directas
    return url;
}

type MediaItem =
    | { type: 'video'; url: string; label: string }
    | { type: 'image'; url: string; label: string };

export default function ProjectMediaGallery({
    imagenUrl,
    videoUrl,
    capturas = [],
    titulo,
    categoria = 'Proyecto',
    destacado = false,
}: ProjectMediaGalleryProps) {
    // Normalizar lista de capturas
    const cleanCapturas = useMemo(() => {
        return (Array.isArray(capturas) ? capturas : []).filter(Boolean);
    }, [capturas]);

    // Construir lista unificada de medios: Video (si existe), Imagen Principal, y Capturas Adicionales
    const mediaItems: MediaItem[] = useMemo(() => {
        const items: MediaItem[] = [];

        if (videoUrl && videoUrl.trim()) {
            items.push({ type: 'video', url: videoUrl.trim(), label: 'Video Demo' });
        }

        if (imagenUrl && imagenUrl.trim()) {
            items.push({ type: 'image', url: imagenUrl.trim(), label: 'Portada Principal' });
        }

        cleanCapturas.forEach((url, i) => {
            // Evitar duplicar si la captura es idéntica a la imagen principal
            if (url !== imagenUrl) {
                items.push({ type: 'image', url, label: `Captura ${i + 1}` });
            }
        });

        return items;
    }, [videoUrl, imagenUrl, cleanCapturas]);

    // Índice activo en el visor principal (0 = video si existe, o imagen principal)
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const activeItem = mediaItems[activeIndex] ?? null;

    // Solo imágenes para el lightbox
    const imageItems = useMemo(() => mediaItems.filter(m => m.type === 'image'), [mediaItems]);

    const openLightbox = useCallback((itemUrl: string) => {
        const idx = imageItems.findIndex(m => m.url === itemUrl);
        setLightboxIndex(idx >= 0 ? idx : 0);
        setLightboxOpen(true);
    }, [imageItems]);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const prevMedia = useCallback(() => {
        setActiveIndex(curr => (curr - 1 + mediaItems.length) % mediaItems.length);
    }, [mediaItems.length]);

    const nextMedia = useCallback(() => {
        setActiveIndex(curr => (curr + 1) % mediaItems.length);
    }, [mediaItems.length]);

    const lbPrev = useCallback(() => {
        setLightboxIndex(i => (i - 1 + imageItems.length) % imageItems.length);
    }, [imageItems.length]);

    const lbNext = useCallback(() => {
        setLightboxIndex(i => (i + 1) % imageItems.length);
    }, [imageItems.length]);

    return (
        <div className="space-y-4">
            {/* ── SELECTOR RÁPIDO SUPERIOR (si hay video y también imágenes) ── */}
            {videoUrl && mediaItems.length > 1 && (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveIndex(0)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                            activeItem?.type === 'video'
                                ? 'bg-neon-gold text-black shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-gray-800'
                        }`}
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Video Demo
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveIndex(mediaItems.findIndex(m => m.type === 'image'))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                            activeItem?.type === 'image'
                                ? 'bg-neon-gold text-black shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-gray-800'
                        }`}
                    >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Imágenes ({imageItems.length})
                    </button>
                </div>
            )}

            {/* ── VISOR PRINCIPAL (GRANDE) ── */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.7)] group bg-black">
                {activeItem?.type === 'video' ? (
                    <>
                        {/* Badge Demo en Vivo */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none border border-neon-gold/30">
                            <Play className="w-3.5 h-3.5 text-neon-gold fill-neon-gold animate-pulse" />
                            <span className="text-xs text-white uppercase tracking-wider font-semibold">Demo en Vivo</span>
                        </div>
                        <iframe
                            src={getEmbedUrl(activeItem.url)}
                            title={`Demo de ${titulo}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full border-0"
                        />
                    </>
                ) : activeItem?.type === 'image' ? (
                    <>
                        <img
                            src={activeItem.url}
                            alt={titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            decoding="async"
                        />
                        {/* Overlay sutil inferior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                        {/* Badge Categoría */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none border border-white/10">
                            <Layers className="w-3.5 h-3.5 text-neon-platinum" />
                            <span className="text-xs text-white uppercase tracking-wider">{categoria}</span>
                        </div>

                        {/* Badge Destacado */}
                        {destacado && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon-gold text-black px-3 py-1.5 rounded-full pointer-events-none font-bold shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs uppercase tracking-wider">Destacado</span>
                            </div>
                        )}

                        {/* Botón expandir Lightbox */}
                        <button
                            type="button"
                            onClick={() => openLightbox(activeItem.url)}
                            className="absolute bottom-4 left-4 p-2.5 bg-black/70 hover:bg-black/90 rounded-xl text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20 hover:border-neon-gold"
                            title="Ver en pantalla completa"
                            aria-label="Abrir imagen en pantalla completa"
                        >
                            <Maximize2 className="w-4 h-4 text-neon-gold" />
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
                        <ImageIcon className="w-16 h-16 text-gray-700" />
                    </div>
                )}

                {/* Flechas de navegación rápida sobre el visor grande */}
                {mediaItems.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prevMedia}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white hover:text-neon-gold rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm border border-white/10 hover:border-neon-gold z-10"
                            aria-label="Medio anterior"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={nextMedia}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white hover:text-neon-gold rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm border border-white/10 hover:border-neon-gold z-10"
                            aria-label="Medio siguiente"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* ── TIRA DE CAPTURAS Y MEDIOS EN MINIATURA ── */}
            {mediaItems.length > 1 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-neon-gold" />
                            Capturas y Medios ({mediaItems.length})
                        </span>
                        <span className="text-[11px] text-gray-500">
                            Haz clic para visualizar en grande
                        </span>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800">
                        {mediaItems.map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                aria-label={item.label}
                                className={`
                                    relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200
                                    ${activeIndex === idx
                                        ? 'border-neon-gold shadow-[0_0_15px_rgba(255,215,0,0.5)] scale-105 ring-2 ring-neon-gold/50'
                                        : 'border-gray-800 hover:border-gray-600 hover:scale-[1.03] opacity-70 hover:opacity-100'
                                    }
                                `}
                            >
                                {item.type === 'video' ? (
                                    <>
                                        {/* Thumbnail de video si es YouTube */}
                                        {(() => {
                                            const ytMatch = item.url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                                            const thumbUrl = ytMatch
                                                ? `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`
                                                : null;
                                            return thumbUrl ? (
                                                <img src={thumbUrl} alt="Video Demo" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-gray-500" />
                                                </div>
                                            );
                                        })()}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                            <Play className="w-5 h-5 text-neon-gold fill-neon-gold drop-shadow" />
                                        </div>
                                        <span className="absolute bottom-1 left-1.5 text-[9px] bg-black/80 text-neon-gold font-bold px-1.5 py-0.5 rounded uppercase">
                                            Video
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={item.url}
                                            alt={item.label}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                        />
                                        {item.url === imagenUrl && (
                                            <span className="absolute bottom-1 left-1.5 text-[9px] bg-black/80 text-gray-300 font-medium px-1.5 py-0.5 rounded uppercase">
                                                Portada
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── MODAL LIGHTBOX (PANTALLA COMPLETA) ── */}
            {lightboxOpen && imageItems.length > 0 && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Botón Cerrar */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors z-20"
                        aria-label="Cerrar visor"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Contador */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-300 bg-black/70 border border-gray-800 px-4 py-1.5 rounded-full z-20">
                        {lightboxIndex + 1} / {imageItems.length}
                    </div>

                    {/* Flechas del Lightbox */}
                    {imageItems.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={e => { e.stopPropagation(); lbPrev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-neon-gold/20 rounded-xl text-white hover:text-neon-gold transition-all z-20"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                type="button"
                                onClick={e => { e.stopPropagation(); lbNext(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-neon-gold/20 rounded-xl text-white hover:text-neon-gold transition-all z-20"
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Imagen activa en lightbox */}
                    <div
                        className="max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center p-4 md:p-12"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            key={lightboxIndex}
                            src={imageItems[lightboxIndex]?.url}
                            alt={`${titulo} - captura ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
                        />
                    </div>

                    {/* Miniaturas en la base del Lightbox */}
                    {imageItems.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/70 backdrop-blur-sm border border-gray-800 p-2 rounded-2xl z-20 max-w-[90vw] overflow-x-auto">
                            {imageItems.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                                    className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                        i === lightboxIndex
                                            ? 'border-neon-gold scale-110 shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                    aria-label={`Ver imagen ${i + 1}`}
                                >
                                    <img
                                        src={img.url}
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
