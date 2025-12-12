'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Producto } from '@/types/database';
import { Search, Filter, ShoppingBag, Loader2, AlertCircle, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import GlitchText from '@/components/GlitchText';

export default function TiendaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching productos:', fetchError);
        setError('Error al conectar con la base de datos');
        setProductos([]);
      } else {
        setProductos(data as Producto[] || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos por búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 cyber-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-outfit text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
            Digital <GlitchText text="CODES" className="text-neon-gold" />
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-sans text-sm">
            Explora herramientas de alto rendimiento diseñadas para el ecosistema moderno.
          </p>
        </div>

        {/* Barra de Búsqueda */}
        <div className="glass-panel p-4 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border-l-4 border-neon-gold">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="BUSCAR CÓDIGOS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cyber-black/50 border border-gray-800 p-3 pl-10 text-xs text-white outline-none focus:border-neon-gold transition-all rounded-lg"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto items-center">
            <span className="text-gray-500 text-xs">
              {filteredProductos.length} código{filteredProductos.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={fetchProductos}
              className="flex items-center justify-center gap-2 bg-white/5 border border-gray-800 text-gray-400 px-4 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all rounded-lg"
            >
              <Filter className="w-3 h-3" /> Filtrar
            </button>
          </div>
        </div>

        {/* Estado de Carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-transparent border-t-neon-gold rounded-full animate-spin"></div>
              <ShoppingBag className="w-6 h-6 text-neon-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-6 text-gray-500 text-sm uppercase tracking-widest animate-pulse">
              Cargando códigos...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass-panel p-8 text-center border border-red-500/30 bg-red-500/5">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 uppercase tracking-widest text-sm mb-4">{error}</p>
            <button
              onClick={fetchProductos}
              className="px-6 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Grid de Productos */}
        {!loading && !error && filteredProductos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProductos.map((prod) => (
              <ProductCard key={prod.id} producto={prod} />
            ))}
          </div>
        )}

        {/* Sin Productos */}
        {!loading && !error && productos.length === 0 && (
          <div className="text-center py-20 glass-panel">
            <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Los productos aparecerán aquí cuando se agreguen desde el panel de administración.
            </p>
          </div>
        )}

        {/* Sin resultados de búsqueda */}
        {!loading && !error && productos.length > 0 && filteredProductos.length === 0 && (
          <div className="text-center py-20 glass-panel">
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">Sin resultados</h3>
            <p className="text-gray-600 text-sm">
              No se encontraron productos que coincidan con "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </main>
  );
}