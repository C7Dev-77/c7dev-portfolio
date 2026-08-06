'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Play, Star, Eye, Code } from 'lucide-react';
import { MonetizationProduct } from '@/types';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';

interface ProductCardProps {
  producto: MonetizationProduct;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { config } = useConfig();
  const lang = (config?.language as 'es' | 'en') || 'es';
  const t = translations[lang] || translations.es;

  const [imageError, setImageError] = useState(false);
  const [totalViews, setTotalViews] = useState<number>(100);

  useEffect(() => {
    const updateViews = () => {
      try {
        const allStats = localStorage.getItem('projectStats');
        if (allStats) {
          const parsed = JSON.parse(allStats);
          if (parsed[producto.id] && typeof parsed[producto.id].views === 'number') {
            setTotalViews(100 + parsed[producto.id].views);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
      setTotalViews(100);
    };

    updateViews();

    window.addEventListener('statsUpdated', updateViews);
    window.addEventListener('storage', updateViews);

    return () => {
      window.removeEventListener('statsUpdated', updateViews);
      window.removeEventListener('storage', updateViews);
    };
  }, [producto.id]);

  const handleIncrementView = () => {
    try {
      const allStats = localStorage.getItem('projectStats');
      let projectStats: any = {};
      if (allStats) {
        projectStats = JSON.parse(allStats);
      }
      if (!projectStats[producto.id]) {
        const randomRating = (Math.random() * (5.0 - 3.9) + 3.9).toFixed(1);
        projectStats[producto.id] = {
          views: 0,
          downloads: 0,
          rating: parseFloat(randomRating)
        };
      }
      projectStats[producto.id].views += 1;
      localStorage.setItem('projectStats', JSON.stringify(projectStats));
      window.dispatchEvent(new Event('statsUpdated'));
    } catch (e) {
      console.error(e);
    }
  };

  const formattedVisitas = totalViews >= 1000 
    ? `${(totalViews / 1000).toFixed(1)}k` 
    : `${totalViews}`;

  return (
    <div className="bg-[#09090b]/90 border border-gray-800/80 hover:border-neon-gold/60 transition-all duration-300 hover:-translate-y-1.5 group rounded-2xl flex flex-col backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">
      {/* Image Container - Clickeable */}
      <Link 
        href={`/tienda/${producto.id}`} 
        onClick={handleIncrementView}
        className="aspect-video overflow-hidden relative bg-[#050507] block rounded-t-2xl"
      >
        {!imageError && producto.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={producto.image_url}
            alt={producto.title || 'Producto'}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900/60">
            <Package className="w-10 h-10 text-gray-700" />
          </div>
        )}

        {/* Overlay de gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/30 pointer-events-none" />

        {/* Badge CÓDIGO en esquina */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <Code className="w-3 h-3 text-neon-gold" />
          <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
            {(producto as any).category || 'Código'}
          </span>
        </div>

        {/* Badge de Video Demo */}
        {producto.video_url && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neon-gold/30">
            <Play className="w-3 h-3 text-neon-gold fill-neon-gold" />
            <span className="text-[9px] text-white uppercase tracking-wider font-semibold">{t.demo}</span>
          </div>
        )}

        {/* Badge Destacado */}
        {/* @ts-ignore */}
        {producto.is_featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-neon-gold text-black px-2.5 py-1 rounded-full font-bold shadow-[0_0_12px_rgba(255,215,0,0.5)]">
            <Star className="w-3 h-3 fill-current" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-4 py-2 bg-neon-gold/10 border border-neon-gold/50 rounded-xl text-neon-gold text-xs font-bold uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            {t.details}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/tienda/${producto.id}`} onClick={handleIncrementView}>
          <h3 className="font-outfit text-base font-bold text-white mb-2 group-hover:text-neon-gold transition-colors line-clamp-1">
            {producto.title || 'Sin nombre'}
          </h3>
        </Link>

        <p className="text-gray-400 text-xs mb-4 line-clamp-2 flex-1 leading-relaxed">
          {/* @ts-ignore */}
          {producto.description || 'Sin descripción'}
        </p>

        {/* Tags */}
        {(producto as any).tags && (producto as any).tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(producto as any).tags.slice(0, 3).map((tag: string, idx: number) => (
              <span key={idx} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-400 font-mono">
                {tag}
              </span>
            ))}
            {(producto as any).tags.length > 3 && (
              <span className="text-[9px] text-gray-600 font-mono">+{(producto as any).tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Bottom Bar: Visitas & Ver más */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800/80">
          {/* Contador de Visitas */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-mono">
            <Eye className="w-3.5 h-3.5 text-neon-gold" />
            <span>{formattedVisitas}</span>
          </div>

          {/* Botón Ver más compacto */}
          <Link
            href={`/tienda/${producto.id}`}
            onClick={handleIncrementView}
            className="px-4 py-1.5 bg-gradient-to-r from-neon-gold to-amber-500 hover:from-amber-400 hover:to-neon-gold text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(255,215,0,0.2)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all transform hover:scale-105"
          >
            {t.viewMore}
          </Link>
        </div>
      </div>
    </div>
  );
}