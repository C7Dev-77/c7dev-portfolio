import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, PenLine } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BlogCard, { BlogPost } from '@/components/BlogCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog Técnico | C7Dev_ — Desarrollo Web y Programación',
  description: 'Artículos técnicos sobre Next.js, React, Supabase, Tailwind CSS, Python y desarrollo web moderno. Aprende con guías prácticas de C7Dev_.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Técnico | C7Dev_',
    description: 'Artículos sobre Next.js, React, Supabase, Python y desarrollo web moderno.',
    url: 'https://c7dev-portfolio.vercel.app/blog',
  },
};

export default async function BlogPage() {
  const { data: posts, error } = await (supabase.from('blog_posts') as any)
    .select('id, slug, title, excerpt, tag, tag_color, read_time, cover_image, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative">
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-neon-gold/60" />
            <span className="text-neon-gold/60 text-xs uppercase tracking-widest font-semibold">
              Knowledge base
            </span>
          </div>
          <h1 className="font-outfit text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-3">
            Blog{' '}
            <span className="text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              Técnico
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            Artículos sobre desarrollo web, buenas prácticas y tecnologías modernas.
            Next.js, React, Supabase, Python y más.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="glass-panel border border-red-500/30 bg-red-500/5 rounded-2xl p-10 text-center">
            <p className="text-red-400 text-sm uppercase tracking-widest">
              Error al cargar los artículos. Intenta recargar la página.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && (!posts || posts.length === 0) && (
          <div className="glass-panel border border-gray-800 rounded-2xl p-20 text-center">
            <PenLine className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-2">
              Próximamente
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Los artículos aparecerán aquí cuando se publiquen desde el panel de administración.
            </p>
          </div>
        )}

        {/* Posts grid */}
        {!error && posts && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Stats footer */}
            <div className="text-center">
              <p className="text-gray-700 text-xs font-mono">
                {posts.length} artículo{posts.length !== 1 ? 's' : ''} publicado{posts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </>
        )}

        {/* CTA bottom */}
        <div className="mt-20 text-center">
          <div className="glass-panel inline-flex flex-col items-center p-8 rounded-2xl border border-gray-800 hover:border-neon-gold/30 transition-colors max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-neon-gold mx-auto mb-4" />
            <h3 className="font-outfit font-bold text-white text-lg mb-2">
              ¿Quieres aprender más?
            </h3>
            <p className="text-gray-500 text-sm mb-5 max-w-xs">
              También tengo recursos de código descargables en mi tienda digital.
            </p>
            <Link
              href="/tienda"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all group"
            >
              Ver recursos digitales
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
