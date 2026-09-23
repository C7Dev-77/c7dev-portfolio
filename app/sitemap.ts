import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://c7dev-portfolio.vercel.app'
  const now = new Date()

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/portafolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tienda`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terminos`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Proyectos del portafolio (dinámico desde Supabase)
  const { data: proyectos } = await (supabase.from('proyectos') as any)
    .select('id, updated_at, created_at')
    .eq('activo', true)

  const projectPages: MetadataRoute.Sitemap = (proyectos || []).map((proy: any) => ({
    url: `${baseUrl}/portafolio/${proy.id}`,
    lastModified: proy.updated_at ? new Date(proy.updated_at) : new Date(proy.created_at || now),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Productos de la tienda (dinámico desde Supabase)
  const { data: productos } = await (supabase.from('products_public') as any)
    .select('id, updated_at, created_at')

  const productPages: MetadataRoute.Sitemap = (productos || []).map((prod: any) => ({
    url: `${baseUrl}/tienda/${prod.id}`,
    lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(prod.created_at || now),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Artículos del blog (dinámico desde Supabase)
  const { data: posts } = await (supabase.from('blog_posts') as any)
    .select('slug, updated_at, created_at')
    .eq('published', true)

  const blogPages: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at || now),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...productPages, ...blogPages]
}
