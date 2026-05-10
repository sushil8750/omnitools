import { MetadataRoute } from 'next'
import { TOOLS } from '@/config/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omnitools.example.com'

  const toolUrls = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.4 },
  ]

  return [...staticUrls, ...toolUrls]
}
