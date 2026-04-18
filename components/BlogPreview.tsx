import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const posts = [
  {
    slug: 'nextjs-vs-vite-2025',
    title: 'Next.js vs Vite en 2025: ¿Cuál elegir para tu proyecto?',
    excerpt: 'Un análisis profundo de los dos frameworks más populares del ecosistema React. Comparativa de rendimiento, SEO, ecosistema y casos de uso reales.',
    tag: 'Next.js',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    date: 'Abr 2025',
    readTime: '5 min',
    gradientFrom: 'from-blue-500/10',
  },
  {
    slug: 'supabase-auth-guia-completa',
    title: 'Autenticación con Supabase: Guía completa para 2025',
    excerpt: 'Cómo implementar auth segura con Supabase en Next.js 14+. Desde el login básico hasta row-level security y protección de rutas con middleware.',
    tag: 'Supabase',
    tagColor: 'text-green-400 bg-green-400/10 border-green-400/20',
    date: 'Mar 2025',
    readTime: '8 min',
    gradientFrom: 'from-green-500/10',
  },
  {
    slug: 'tailwind-trucos-avanzados',
    title: '10 trucos de Tailwind CSS que deberías conocer',
    excerpt: 'Desde el uso de @layer y plugins personalizados hasta animaciones avanzadas con keyframes. Lleva tu CSS al siguiente nivel con Tailwind v3.',
    tag: 'CSS',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    date: 'Feb 2025',
    readTime: '6 min',
    gradientFrom: 'from-purple-500/10',
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
            className="flex items-center gap-2 text-neon-gold hover:text-white transition-colors text-sm group"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="group bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,215,0,0.08)] flex flex-col"
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${post.gradientFrom} to-transparent`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Tag + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${post.tagColor}`}>
                    <Tag className="w-2.5 h-2.5 inline mr-1" />
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-white font-bold text-base leading-tight mb-3 group-hover:text-neon-gold transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800/50">
                  <span className="text-gray-700 text-xs">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-neon-gold text-xs hover:gap-2 transition-all"
                  >
                    Leer más <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
