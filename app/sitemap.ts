import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { pointsPrograms } from '@/data/points-programs'
import { tools } from '@/data/tools'

const BASE = 'https://smartcardoffers.ca'

// Static card slugs we know about from the API (kept in sync with fetchCards)
const KNOWN_CARD_SLUGS = [
  'amex-cobalt','american-express-platinum-card','american-express-gold-rewards-card',
  'american-express-aeroplan-card','american-express-aeroplan-reserve-card',
  'american-express-green-card','amex-simplycash-preferred','amex-biz-platinum',
  'amex-biz-gold','amex-marriott-pers','amex-marriott-biz',
  'td-aeroplan-visa-infinite','td-aeroplan-visa-privilege','td-aeroplan-visa-platinum-card',
  'td-first-class-travel','td-platinum-travel-visa-card','td-cash-back-visa-infinite-card',
  'rbc-avion-visa-infinite','rbc-avion-visa-infinite-privilege','rbc-visa-platinum-avion',
  'rbc-british-airways-visa-infinite','rbc-cash-back-preferred-world-elite-mastercard',
  'scotiabank-gold-american-express-card','scotiabank-passport-visa-infinite-card',
  'scotiabank-passport-visa-infinite-privilege-card','scotiabank-american-express-platinum-card',
  'scotia-momentum-visa-infinite-card',
  'cibc-aeroplan-visa-infinite','cibc-aeroplan-visa-infinite-privilege','cibc-aeroplan-visa',
  'cibc-aventura-visa-infinite','cibc-aventura-visa-infinite-privilege',
  'cibc-aventura-gold-visa','cibc-aventura-visa','cibc-dividend-visa-infinite',
  'bmo-ascend-world-elite-mastercard','bmo-eclipse-visa-infinite',
  'bmo-eclipse-visa-infinite-privilege','bmo-viporter-we-mc',
  'bmo-cashback-world-elite-mastercard',
  'pc-financial-world-elite-mastercard','tangerine-money-back',
  'rogers-red-world-elite-mastercard','canadian-tire-triangle-world-elite-mastercard',
  'mbna-rewards-we-mc','meridian-visa-infinite-travel-rewards-card',
  'laurentian-bank-visa-infinite-card','national-bank-world-elite',
  'neo-world-elite-mastercard','cathay-world-elite-mastercard-powered-by-neo',
  'westjet-rbc-world-elite','rbc-cash-back-preferred-world-elite-mastercard',
  'td-aeroplan-visa-infinite',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/credit-cards`,        lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/best-offers`,         lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/compare`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/points`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog`,                lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/blog/points-deals`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/credit-card-deals`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog/guides`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/mortgage-news`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/tools`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/legal/affiliate-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/privacy-policy`,       lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/terms`,                lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const cardPages: MetadataRoute.Sitemap = KNOWN_CARD_SLUGS.map(slug => ({
    url: `${BASE}/credit-cards/${slug}`,
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
