import Link from 'next/link';
import { ArrowRight, Clock, Tag, Calendar } from 'lucide-react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  tag_color: string;
  read_time: string;
  cover_image?: string;
  created_at: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const fecha = new Date(post.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,215,0,0.08)] flex flex-col">

      {/* Cover image or gradient header */}
      {post.cover_image ? (
        <div className="h-44 overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        </div>
      ) : (
        <div className={`h-1.5 bg-gradient-to-r from-neon-gold/60 to-transparent`} />
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Tag + read time */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${post.tag_color}`}>
            <Tag className="w-2.5 h-2.5 inline mr-1" />
            {post.tag}
          </span>
          <div className="flex items-center gap-3 text-gray-600 text-[10px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.read_time}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {fecha}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base leading-tight mb-3 group-hover:text-neon-gold transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800/50">
          <span className="text-gray-700 text-xs font-mono">C7Dev_</span>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-neon-gold text-xs font-semibold hover:gap-2 transition-all group/link"
          >
            Leer artículo
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
