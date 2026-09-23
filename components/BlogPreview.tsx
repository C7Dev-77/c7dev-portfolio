import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BlogCard, { BlogPost } from '@/components/BlogCard';

export default async function BlogPreview() {
  const { data: posts } = await (supabase.from('blog_posts') as any)
    .select('id, slug, title, excerpt, tag, tag_color, read_time, cover_image, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  // Si no hay posts, no renderizar la sección
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-neon-gold/60 text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-neon-gold/40" />
              Knowledge base
            </div>
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white">
              Blog <span className="text-neon-gold text-glow-gold">Técnico</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md">
              Artículos sobre desarrollo web, buenas prácticas y tecnologías modernas.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-neon-gold hover:text-white transition-colors text-sm group flex-shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            Ver todos los artículos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
}
