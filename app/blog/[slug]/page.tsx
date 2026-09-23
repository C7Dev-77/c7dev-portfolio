import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import AdBanner from '@/components/AdBanner';

export const revalidate = 3600; // Revalidar cada hora

// Obtener post en caché para reutilizar entre generateMetadata y la página
const getPost = cache(async (slug: string) => {
  const { data } = await (supabase.from('blog_posts') as any)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data;
});

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Artículo no encontrado | C7Dev_' };

  return {
    title: `${post.title} | C7Dev_`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://c7dev-portfolio.vercel.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Cristian Morales — C7Dev_'],
      images: post.cover_image ? [post.cover_image] : ['/images/profile.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : ['/images/profile.png'],
    },
  };
}

// Pre-generar rutas para SSG (mejora TTFB)
export async function generateStaticParams() {
  const { data: posts } = await (supabase.from('blog_posts') as any)
    .select('slug')
    .eq('published', true);
  return (posts || []).map((p: any) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, { data: relacionados }] = await Promise.all([
    getPost(params.slug),
    (supabase.from('blog_posts') as any)
      .select('id, slug, title, excerpt, tag, tag_color, read_time, cover_image, created_at')
      .eq('published', true)
      .neq('slug', params.slug)
      .order('created_at', { ascending: false })
      .limit(3),
  ]);

  if (!post) notFound();

  const fecha = new Date(post.created_at).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Renderizar contenido: convertir saltos de línea dobles en párrafos,
  // ### en h3, ## en h2, **texto** en negrita, `código` en code
  const renderContent = (text: string) => {
    return text
      .split('\n\n')
      .map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="text-xl font-outfit font-bold text-white mt-8 mb-3">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="text-2xl md:text-3xl font-outfit font-bold text-neon-gold mt-10 mb-4">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // Procesar inline formatting
        const processInline = (line: string) => {
          const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
          return parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={j} className="bg-black/60 border border-gray-800 text-neon-gold px-1.5 py-0.5 rounded text-[0.85em] font-mono">{part.slice(1, -1)}</code>;
            }
            return part;
          });
        };

        // Lista numerada
        if (/^\d+\./.test(trimmed)) {
          const items = trimmed.split('\n').filter(Boolean);
          return (
            <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-gray-300 text-sm leading-relaxed">
              {items.map((item, j) => (
                <li key={j}>{processInline(item.replace(/^\d+\.\s*/, ''))}</li>
              ))}
            </ol>
          );
        }

        // Lista con guiones
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(l => l.startsWith('- '));
          return (
            <ul key={i} className="space-y-2 my-4">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-gold/60 mt-2 flex-shrink-0" />
                  {processInline(item.replace('- ', ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Párrafo normal
        return (
          <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed my-4">
            {processInline(trimmed)}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 relative">
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8" aria-label="breadcrumb">
          <Link href="/" className="hover:text-neon-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-neon-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-gold transition-colors text-sm group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Blog
        </Link>

        {/* Article header */}
        <header className="mb-10">
          {/* Tag */}
          <div className="mb-4">
            <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${post.tag_color}`}>
              <Tag className="w-2.5 h-2.5 inline mr-1" />
              {post.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-outfit text-3xl md:text-5xl font-black text-white leading-tight mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-5 text-gray-600 text-xs flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-neon-gold/20 border border-neon-gold/40 flex items-center justify-center text-[9px] font-black text-neon-gold">C7</span>
              Cristian Morales — C7Dev_
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {fecha}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time} de lectura
            </span>
          </div>
        </header>

        {/* Cover image */}
        {post.cover_image && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Excerpt destacado */}
        <div className="glass-panel border-l-4 border-neon-gold px-6 py-4 rounded-r-xl mb-8">
          <p className="text-gray-300 text-sm md:text-base italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Article content */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* AdBanner entre contenido y relacionados */}
        <div className="my-12">
          {/* TODO: Reemplaza con tu Ad Slot ID real de AdSense → adsense.google.com > Anuncios > Por unidad */}
          <AdBanner dataAdSlot="YOUR_AD_SLOT_ID_BLOG" />
        </div>

        {/* Author card */}
        <div className="glass-panel border border-neon-gold/20 rounded-2xl p-6 flex items-start gap-5 mb-12">
          <div className="w-14 h-14 rounded-full bg-neon-gold/10 border-2 border-neon-gold/40 flex items-center justify-center flex-shrink-0">
            <span className="font-outfit font-black text-neon-gold text-xl">C7</span>
          </div>
          <div className="flex-1">
            <p className="font-outfit font-bold text-white mb-1">Cristian Morales — C7Dev_</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">
              Ingeniero de Sistemas y Desarrollador Web Full Stack. Especializado en Next.js, React,
              Supabase y Python. Creando soluciones digitales desde Colombia.
            </p>
            <Link
              href="/contacto"
              className="text-xs text-neon-gold hover:underline flex items-center gap-1"
            >
              Contáctame <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {relacionados && relacionados.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-outfit font-bold text-xl text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-neon-gold" />
                Artículos Relacionados
              </h2>
              <Link
                href="/blog"
                className="text-xs text-gray-500 hover:text-neon-gold transition-colors flex items-center gap-1"
              >
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relacionados.map((rel: BlogPost) => (
                <BlogCard key={rel.id} post={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
