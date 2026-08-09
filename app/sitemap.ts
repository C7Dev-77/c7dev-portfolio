import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://c7dev.vercel.app'
  const now = new Date()

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portafolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Obtener proyectos para agregarlos dinámicamente al Sitemap
  const { data: proyectos } = await (supabase.from('proyectos') as any)
    .select('id, updated_at, created_at')
    .eq('activo', true)

  const projectPages: MetadataRoute.Sitemap = (proyectos || []).map((proy: any) => ({
    url: `${baseUrl}/portafolio/${proy.id}`,
    lastModified: proy.updated_at ? new Date(proy.updated_at) : new Date(proy.created_at || now),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages]
}
