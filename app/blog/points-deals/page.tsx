import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/blog/ArticleCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { getArticlesByCategory } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Points Deals — Best Canadian Loyalty Points Promotions 2026',
  description: 'Track the best Canadian points deals, transfer bonuses, and limited-time loyalty promotions. Aeroplan, Amex MR, Scene+, RBC Avion and more.',
  alternates: { canonical: 'https://smartcardoffers.ca/blog/points-deals' },
  openGraph: { title: 'Best Canadian Points Deals 2026', description: 'Latest Aeroplan, Amex MR, and Scene+ promotions for Canadians.', url: 'https://smartcardoffers.ca/blog/points-deals', type: 'website' },
}

export default function PointsDealsPage() {
  const articles = getArticlesByCategory('points-deals')
  const allArticles = [...articles, ...getArticlesByCategory('credit-card-deals')].slice(0, 6)

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Points Deals' }]} />

      <div className="mt-6 mb-6 max-w-3xl">
        <SectionHeader
          label="Points Deals"
          title="Best Points Deals in Canada"
          subtitle="We track the best transfer bonuses, elevated earn promotions, and limited-time loyalty program offers for Canadians — updated regularly."
        />
      </div>

      {/* Category nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: 'Points Deals', href: '/blog/points-deals', active: true },
          { label: 'Credit Card Deals', href: '/blog/credit-card-deals', active: false },
          { label: 'Mortgage News', href: '/blog/mortgage-news', active: false },
          { label: 'Guides', href: '/blog/guides', active: false },
          { label: 'All Posts', href: '/blog', active: false },
        ].map(cat => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              cat.active
                ? 'bg-gold-500 text-white border-gold-500'
                : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Featured article */}
      {articles[0] && (
        <div className="mb-8">
          <ArticleCard article={articles[0]} variant="featured" />
        </div>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {allArticles.map(article => (
          <ArticleCard key={article.id} article={article} variant="featured" />
        ))}
      </div>

      {/* SEO intro */}
      <div className="bg-parchment-50 rounded-2xl p-7 mb-10 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-900 mb-3">About Points Deals</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Canadian loyalty programs run time-sensitive promotions throughout the year — transfer bonuses that boost your Aeroplan balance, elevated earn at grocery stores, and special redemption rates on hotel bookings.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          We monitor promotions across Aeroplan, American Express Membership Rewards, Scene+, RBC Avion, and other Canadian programs to make sure you never miss a deal. Subscribe to our weekly newsletter to get these delivered to your inbox.
        </p>
      </div>

      <NewsletterSignup />
    </div>
  )
}
