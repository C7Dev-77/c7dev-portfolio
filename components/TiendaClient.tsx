'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import { MonetizationProduct } from '@/types';
import { Search, Filter, ShoppingBag, AlertCircle, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import GlitchText from '@/components/GlitchText';
import ParticleNetwork from '@/components/ParticleNetwork';
import { useConfig } from '@/context/ConfigContext';
import { translations } from '@/lib/i18n';
import { useCountUp } from '@/hooks/useCountUp';

const ITEMS_PER_PAGE = 6;

/** Ordena productos: destacados primero (por display_order), luego los demás (por display_order) */
function sortProducts(products: any[]): any[] {
  const featured = products
    .filter(p => p.is_featured)
    .sort((a, b) => (a.display_order ?? 9999) - (b.display_order ?? 9999));
  const rest = products
    .filter(p => !p.is_featured)
    .sort((a, b) => (a.display_order ?? 9999) - (b.display_order ?? 9999));
  return [...featured, ...rest];
}




interface TiendaClientProps {
  initialProducts?: MonetizationProduct[];
}

export default function TiendaClient({ initialProducts = [] }: TiendaClientProps) {
  const [productos, setProductos] = useState<MonetizationProduct[]>(() => sortProducts(initialProducts) as MonetizationProduct[]);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { config } = useConfig();
  const animProductCount = useCountUp(productos.length, 1000, 0);

  const lang = (config?.language as 'es' | 'en') || 'es';
  const t = translations[lang] || translations.es;

  // Si no llegaron productos del servidor por algún motivo, cargarlos en cliente
  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProductos();
    }
  }, []);

  // Resetear a página 1 cuando se busca
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('products_public' as any)
        .select('*')
        .order('is_featured' as any, { ascending: false })
        .order('display_order' as any, { ascending: true })
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching productos:', fetchError);
        setError('Error al conectar con la base de datos');
        if (productos.length === 0) setProductos([]);
      } else {
        setProductos(sortProducts((data as any[]) || []) as MonetizationProduct[]);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por búsqueda
  const filteredProductos = productos.filter(p =>
    (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    // @ts-ignore
    (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredProductos.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProductos = filteredProductos.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative">
      {/* Fondo de Red de Partículas / Constelaciones Animadas de toda la web */}
      <ParticleNetwork />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-outfit text-4xl md:text-6xl font-black uppercase tracking-tighter">
            <span className="text-white">{t.codesTitle} </span>
            <span className="relative inline-block">
              <span className="text-neon-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.7)] animate-pulse-gold">
                <GlitchText text="CODES" className="text-neon-gold" />
              </span>
            </span>
          </h1>
        </div>

        {/* Barra de Búsqueda Premium */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-10">
          {/* Input de búsqueda estilo Cyber Glass */}
          <div className="relative w-full sm:w-80 md:w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-gold/70 group-focus-within:text-neon-gold transition-colors" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090b]/90 border border-gray-800 hover:border-neon-gold/40 focus:border-neon-gold py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 outline-none transition-all duration-300 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] focus:shadow-[0_0_20px_rgba(255,215,0,0.15)] appearance-none"
            />
          </div>

          {/* Derecha: count + refresh */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="bg-[#09090b]/80 border border-gray-800/80 px-3.5 py-2 rounded-xl backdrop-blur-md">
              <span className="text-gray-400 text-xs font-mono">
                <span className="tabular-nums font-semibold text-white">{animProductCount}</span>{' '}
                <span className="text-neon-gold">{filteredProductos.length === 1 ? t.codesCount : t.codesCountPlural}</span>
                {totalPages > 1 && ` · pág ${currentPage}/${totalPages}`}
              </span>
            </div>

            <button
              onClick={fetchProductos}
              className="flex items-center gap-2 bg-[#09090b]/80 border border-gray-800 hover:border-neon-gold/60 text-gray-400 hover:text-neon-gold px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer hover:shadow-[0_0_15px_rgba(255,215,0,0.15)]"
            >
              <Filter className="w-3.5 h-3.5 text-neon-gold" />
              <span>{t.updateBtn}</span>
            </button>
          </div>
        </div>

        {/* Estado de Carga (solo si no hay productos iniciales y está cargando) */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-transparent border-t-neon-gold rounded-full animate-spin" />
              <ShoppingBag className="w-6 h-6 text-neon-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-6 text-gray-500 text-sm uppercase tracking-widest animate-pulse">{t.loadingCodes}</p>
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
              {t.updateBtn}
            </button>
          </div>
        )}

        {/* Grid de Productos */}
        {!loading && !error && paginatedProductos.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProductos.map((prod) => (
                <ProductCard key={prod.id} producto={prod} />
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 rounded-lg hover:border-neon-gold hover:text-neon-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> {t.prevPage}
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isNearCurrent = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
                    if (!isNearCurrent) {
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-gray-700 px-1 self-center">…</span>;
                      }
                      return null;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          page === currentPage
                            ? 'bg-neon-gold text-black font-bold'
                            : 'border border-gray-800 text-gray-400 hover:border-neon-gold/50 hover:text-neon-gold'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 rounded-lg hover:border-neon-gold hover:text-neon-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                >
                  {t.nextPage} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <p className="text-center text-gray-600 text-xs mt-4">
                {t.pageInfo} {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredProductos.length)} / {filteredProductos.length} {t.codesCountPlural}
              </p>
            )}
          </>
        )}

        {/* Sin Productos */}
        {!loading && !error && productos.length === 0 && (
          <div className="text-center py-20 glass-panel">
            <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">{t.noProducts}</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              {t.noProductsDesc}
            </p>
          </div>
        )}

        {/* Sin resultados de búsqueda */}
        {!loading && !error && productos.length > 0 && filteredProductos.length === 0 && (
          <div className="text-center py-20 glass-panel">
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">{t.noResults}</h3>
            <p className="text-gray-600 text-sm">
              {t.noResultsDesc} &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              {t.clearSearch}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
