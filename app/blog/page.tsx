import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/blog/ArticleCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { articles } from '@/data/articles'
import { categoryLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — Canadian Credit Card Guides, Points Deals & Mortgage News',
  description: 'Expert Canadian personal finance content. Credit card guides, points deals, mortgage news, and in-depth reviews from the SmartCardOffers editorial team.',
  alternates: { canonical: 'https://smartcardoffers.ca/blog' },
  openGraph: {
    title: 'SmartCardOffers Blog — Canadian Credit Cards & Finance',
    description: 'In-depth guides, points deals, and mortgage news for Canadians.',
    url: 'https://smartcardoffers.ca/blog',
    type: 'website',
  },
}

const categoryLinks = [
  { href: '/blog/points-deals',      label: 'Points Deals',      color: 'bg-gold-100 text-gold-700 border-gold-200' },
  { href: '/blog/credit-card-deals', label: 'Credit Card Deals', color: 'bg-navy-100 text-navy-700 border-navy-200' },
  { href: '/blog/mortgage-news',     label: 'Mortgage News',     color: 'bg-green-100 text-green-700 border-green-200' },
  { href: '/blog/guides',            label: 'Guides',            color: 'bg-purple-100 text-purple-700 border-purple-200' },
]

export default function BlogPage() {
  const featured = articles.find(a => a.featured && a.editorsPick)
  const rest     = articles.filter(a => a !== featured)

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Blog' }]} />

      <div className="mt-6 mb-8">
        <SectionHeader
          label="SmartCardOffers Blog"
          title="Canadian Finance News & Analysis"
          subtitle="Points deals, credit card guides, mortgage updates, and personal finance strategy — written for Canadians."
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryLinks.map(c => (
          <Link
            key={c.href}
            href={c.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${c.color} hover:opacity-80 transition-opacity`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <div className="mb-10">
          <ArticleCard article={featured} variant="featured" />
        </div>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {rest.map(article => (
          <ArticleCard key={article.id} article={article} variant="featured" />
        ))}
      </div>

      <NewsletterSignup />
    </div>
  )
}
