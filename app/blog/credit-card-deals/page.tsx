import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/blog/ArticleCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { getArticlesByCategory } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Credit Card Deals — Best Canadian Welcome Bonuses & Promotions',
  description: 'Browse the best Canadian credit card deals, welcome bonuses, and limited-time offers. Updated regularly by the PointsNorth editorial team.',
}

export default function CreditCardDealsPage() {
  const articles = getArticlesByCategory('credit-card-deals')
  const guides   = getArticlesByCategory('guides')

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Credit Card Deals' }]} />

      <div className="mt-6 mb-6 max-w-3xl">
        <SectionHeader
          label="Credit Card Deals"
          title="Best Credit Card Deals in Canada"
          subtitle="We track the best credit card welcome bonuses, limited-time offers, and first-year fee waivers available to Canadians."
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: 'Points Deals', href: '/blog/points-deals', active: false },
          { label: 'Credit Card Deals', href: '/blog/credit-card-deals', active: true },
          { label: 'Mortgage News', href: '/blog/mortgage-news', active: false },
          { label: 'Guides', href: '/blog/guides', active: false },
          { label: 'All Posts', href: '/blog', active: false },
        ].map(cat => (
          <Link key={cat.href} href={cat.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              cat.active ? 'bg-navy-600 text-white border-navy-600' : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {[...articles, ...guides].map(article => (
          <ArticleCard key={article.id} article={article} variant="featured" />
        ))}
      </div>

      <div className="bg-navy-50 rounded-2xl p-7 mb-10 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-900 mb-3">About Credit Card Deals</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Welcome bonuses are the single biggest source of value from a new credit card. A well-timed application can earn you $500–$1,500+ in travel value or cash back. We analyze every major offer across Canadian issuers — TD, Scotiabank, RBC, CIBC, BMO, and American Express — so you can compare apples to apples and pick the right card at the right time.
        </p>
      </div>

      <NewsletterSignup />
    </div>
  )
}
