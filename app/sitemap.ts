import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { pointsPrograms } from '@/data/points-programs'
import { tools } from '@/data/tools'
import { fetchCards } from '@/lib/smart-card-api'

const BASE = 'https://smartcardoffers.ca'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                    lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/credit-cards`,                  lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/best-offers`,                   lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/compare`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/points`,                        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog`,                          lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/blog/points-deals`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/credit-card-deals`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/guides`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/mortgage-news`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/tools`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/legal/affiliate-disclosure`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/legal/privacy-policy`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/legal/terms`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Fetch all card slugs live so the sitemap stays in sync automatically
  const liveCards = await fetchCards({ limit: 100 })
  const cardPages: MetadataRoute.Sitemap = liveCards.map(card => ({
    url: `${BASE}/credit-cards/${card.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: a.publishDate ? new Date(a.publishDate).toISOString() : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const pointsPages: MetadataRoute.Sitemap = pointsPrograms.map(p => ({
    url: `${BASE}/points/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolPages: MetadataRoute.Sitemap = tools.map(t => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...cardPages, ...blogPages, ...pointsPages, ...toolPages]
}
