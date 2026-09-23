'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Plus, Pencil, Trash2, X, Save, BookOpen,
  Eye, EyeOff, Tag, Clock, Search, Check, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface BlogPostForm {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  tag_color: string;
  read_time: string;
  cover_image: string;
  published: boolean;
}

const TAG_COLORS = [
  { label: 'Azul (Next.js)', value: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { label: 'Verde (Supabase)', value: 'text-green-400 bg-green-400/10 border-green-400/20' },
  { label: 'Morado (CSS)', value: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  { label: 'Naranja (Carrera)', value: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  { label: 'Amarillo (Python)', value: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { label: 'Rojo (React)', value: 'text-red-400 bg-red-400/10 border-red-400/20' },
  { label: 'Cyan (TypeScript)', value: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
];

const emptyForm: BlogPostForm = {
  slug: '', title: '', excerpt: '', content: '',
  tag: '', tag_color: TAG_COLORS[0].value,
  read_time: '5 min', cover_image: '', published: true,
};

// Auto-generar slug desde título
const toSlug = (title: string) =>
  title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<BlogPostForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setFetching(true);
    const { data } = await (supabase.from('blog_posts') as any)
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setFetching(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => {
      const updated = { ...prev, [name]: val };
      // Auto-slug al escribir el título (solo en modo creación)
      if (name === 'title' && !editingId) {
        updated.slug = toSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.excerpt || !form.content || !form.tag) {
      alert('Por favor completa todos los campos obligatorios (título, slug, resumen, contenido, tag).');
      return;
    }
    setLoading(true);

    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      tag: form.tag,
      tag_color: form.tag_color,
      read_time: form.read_time,
      cover_image: form.cover_image,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingId) {
      ({ error } = await (supabase.from('blog_posts') as any).update(payload).eq('id', editingId));
    } else {
      ({ error } = await (supabase.from('blog_posts') as any).insert([payload]));
    }

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchPosts();
    } else {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tag: post.tag,
      tag_color: post.tag_color || TAG_COLORS[0].value,
      read_time: post.read_time || '5 min',
      cover_image: post.cover_image || '',
      published: post.published ?? true,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await (supabase.from('blog_posts') as any).delete().eq('id', id);
    if (!error) {
      setDeleteConfirm(null);
      fetchPosts();
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await (supabase.from('blog_posts') as any)
      .update({ published: !current, updated_at: new Date().toISOString() })
      .eq('id', id);
    fetchPosts();
  };

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-outfit text-3xl font-black text-white flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-neon-gold" />
              Blog Manager
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {posts.length} artículo{posts.length !== 1 ? 's' : ''} ·{' '}
              {posts.filter(p => p.published).length} publicado{posts.filter(p => p.published).length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 hover:text-neon-gold hover:border-neon-gold/40 text-xs rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver Blog
            </Link>
            <button
              onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(!showForm); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
            >
              {showForm && !editingId ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm && !editingId ? 'Cancelar' : 'Nuevo Artículo'}
            </button>
          </div>
        </div>

        {/* Success toast */}
        {success && (
          <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-green-500 text-black px-5 py-3 rounded-xl font-bold text-sm shadow-lg animate-in slide-in-from-right">
            <Check className="w-4 h-4" />
            {editingId ? 'Artículo actualizado' : 'Artículo publicado'} ✓
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="glass-panel border border-neon-gold/30 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="font-outfit font-bold text-xl text-white mb-6 flex items-center gap-2">
              {editingId ? <Pencil className="w-5 h-5 text-neon-gold" /> : <Plus className="w-5 h-5 text-neon-gold" />}
              {editingId ? 'Editar Artículo' : 'Nuevo Artículo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Título */}
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Título *</label>
                  <input
                    name="title" value={form.title} onChange={handleChange} required
                    placeholder="Ej: Cómo usar React Server Components en 2025"
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                {/* Slug */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Slug * (auto-generado)</label>
                  <input
                    name="slug" value={form.slug} onChange={handleChange} required
                    placeholder="mi-articulo-tecnico"
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors font-mono"
                  />
                </div>
                {/* Read time */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Tiempo de lectura</label>
                  <input
                    name="read_time" value={form.read_time} onChange={handleChange}
                    placeholder="5 min"
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                {/* Tag */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Tag * (categoría)</label>
                  <input
                    name="tag" value={form.tag} onChange={handleChange} required
                    placeholder="Ej: Next.js, React, Python..."
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                {/* Tag color */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Color del tag</label>
                  <select
                    name="tag_color" value={form.tag_color} onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {TAG_COLORS.map(c => (
                      <option key={c.value} value={c.value} className="bg-[#111]">{c.label}</option>
                    ))}
                  </select>
                </div>
                {/* Cover image */}
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">URL de imagen de portada (opcional)</label>
                  <input
                    name="cover_image" value={form.cover_image} onChange={handleChange}
                    placeholder="https://..."
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Resumen / Excerpt * (1-2 oraciones)</label>
                  <textarea
                    name="excerpt" value={form.excerpt} onChange={handleChange} required rows={2}
                    placeholder="Resumen corto del artículo que aparece en la tarjeta..."
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
                  />
                </div>
                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                    Contenido * (soporta ## H2, ### H3, **negrita**, `código`, listas con -)
                  </label>
                  <textarea
                    name="content" value={form.content} onChange={handleChange} required rows={14}
                    placeholder="## Introducción&#10;&#10;Escribe aquí el contenido completo del artículo...&#10;&#10;### Subtítulo&#10;&#10;Más contenido aquí."
                    className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-y font-mono"
                  />
                  <p className="text-gray-700 text-[10px] mt-1">{form.content.length} caracteres</p>
                </div>
                {/* Published toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox" id="published" name="published"
                    checked={form.published}
                    onChange={handleChange}
                    className="w-4 h-4 accent-yellow-400 cursor-pointer"
                  />
                  <label htmlFor="published" className="text-sm text-gray-400 cursor-pointer select-none">
                    Publicar inmediatamente (visible en el blog)
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingId ? 'Guardar Cambios' : 'Publicar Artículo'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-800 text-gray-400 hover:border-gray-600 text-sm rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-5">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Posts list */}
        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-transparent border-t-neon-gold rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-panel border border-gray-800 rounded-2xl p-16 text-center">
            <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 uppercase tracking-widest text-xs">
              {searchQuery ? 'Sin resultados' : 'No hay artículos aún'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(post => (
              <div
                key={post.id}
                className="glass-panel border border-gray-800 hover:border-gray-700 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all"
              >
                {/* Post info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${post.tag_color}`}>
                      <Tag className="w-2.5 h-2.5 inline mr-1" />
                      {post.tag}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${post.published ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-gray-500 bg-gray-800/50 border-gray-700'}`}>
                      {post.published ? '● Publicado' : '○ Borrador'}
                    </span>
                    <span className="text-gray-700 text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-white text-base truncate">{post.title}</h3>
                  <p className="text-gray-600 text-xs font-mono mt-0.5">/{post.slug}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Toggle published */}
                  <button
                    onClick={() => handleTogglePublish(post.id, post.published)}
                    title={post.published ? 'Despublicar' : 'Publicar'}
                    className={`p-2 border rounded-lg transition-all ${post.published ? 'border-green-500/40 text-green-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40' : 'border-gray-800 text-gray-600 hover:border-green-500/40 hover:text-green-400'}`}
                  >
                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* View */}
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 border border-gray-800 text-gray-500 hover:text-neon-gold hover:border-neon-gold/40 rounded-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 border border-gray-800 text-gray-500 hover:text-neon-gold hover:border-neon-gold/40 rounded-lg transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  {deleteConfirm === post.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 text-xs rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(post.id)}
                      className="p-2 border border-gray-800 text-gray-500 hover:text-red-400 hover:border-red-500/40 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
