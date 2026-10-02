import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import TiendaClient from '@/components/TiendaClient';
import { MonetizationProduct } from '@/types';

export const metadata: Metadata = {
  title: 'Códigos y Templates | C7Dev_',
  description: 'Catálogo de códigos fuente, templates interactivos, animaciones y soluciones web desarrolladas por C7Dev_.',
  alternates: {
    canonical: '/tienda',
  },
};

// Revalidar cada 60 segundos para mantener la caché del CDN fresca (ISR)
export const revalidate = 60;

export default async function TiendaPage() {
  let initialProducts: MonetizationProduct[] = [];

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await (supabase.from('products_public' as any) as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products in TiendaPage SSR:', error.message);
    } else if (data) {
      initialProducts = data as MonetizationProduct[];
    }
  } catch (err) {
    console.error('Exception fetching products in TiendaPage SSR:', err);
  }

  // Schema.org ItemList para IAs (ChatGPT, Claude, Perplexity) y motores de búsqueda
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Códigos y Templates de C7Dev_',
    description: 'Catálogo de proyectos, códigos y herramientas digitales.',
    numberOfItems: initialProducts.length,
    itemListElement: initialProducts.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: p.title,
      description: p.description,
      url: `https://c7dev-portfolio.vercel.app/tienda/${p.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TiendaClient initialProducts={initialProducts} />
    </>
  );
}