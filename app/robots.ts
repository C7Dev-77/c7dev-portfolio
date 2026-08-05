import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login/'],
      },
    ],
    sitemap: 'https://c7dev.vercel.app/sitemap.xml',
    host: 'https://c7dev.vercel.app',
  }
}
