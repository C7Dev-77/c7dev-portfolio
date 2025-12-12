'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, CreditCard, Package, Play, Star } from 'lucide-react';
import { Producto } from '@/types/database';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const placeholderImage = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400';

  // Formatear precio de forma segura
  const formatPrice = (precio: number | undefined | null) => {
    if (typeof precio !== 'number' || isNaN(precio)) return '0.00';
    return precio.toFixed(2);
  };

  return (
    <div className="bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold transition-all duration-300 hover:-translate-y-1 group overflow-hidden rounded-xl flex flex-col">
      {/* Image Container - Clickeable */}
      <Link href={`/tienda/${producto.id}`} className="aspect-video overflow-hidden relative bg-gray-900 block">
        {!imageError && producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre || 'Producto'}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Package className="w-12 h-12 text-gray-600" />
          </div>
        )}

        {/* Badge de Video */}
        {producto.video_url && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <Play className="w-3 h-3 text-neon-gold fill-neon-gold" />
            <span className="text-[10px] text-white uppercase tracking-wider">Demo</span>
          </div>
        )}

        {/* Badge Destacado */}
        {producto.destacado && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-neon-gold/90 text-black px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-sm rounded-lg shadow-lg">
          ${formatPrice(producto.precio)}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
            Ver Detalles
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Categoría */}
        {producto.categoria && (
          <span className="text-[10px] text-neon-platinum uppercase tracking-widest mb-2">
            {producto.categoria}
          </span>
        )}

        <Link href={`/tienda/${producto.id}`}>
          <h3 className="font-outfit text-lg text-white mb-2 group-hover:text-neon-gold transition-colors">
            {producto.nombre || 'Sin nombre'}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {producto.descripcion || 'Sin descripción'}
        </p>

        {/* Tags */}
        {producto.tags && producto.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {producto.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
                {tag}
              </span>
            ))}
            {producto.tags.length > 3 && (
              <span className="text-[9px] text-gray-600">+{producto.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          {/* Free Download Button */}
          <a
            href={producto.link_free || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 px-4 py-3 border-2 border-green-500 text-green-500 text-center font-bold text-sm uppercase hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Gratis
          </a>

          {/* Purchase Button */}
          <a
            href={producto.link_paid || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold text-sm uppercase hover:shadow-lg hover:shadow-neon-gold/25 transition-all flex items-center justify-center gap-2 rounded-lg"
          >
            <CreditCard className="w-4 h-4" />
            ${formatPrice(producto.precio)}
          </a>
        </div>
      </div>
    </div>
  );
}