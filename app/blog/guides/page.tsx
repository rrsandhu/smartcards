import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/blog/ArticleCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { getArticlesByCategory } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Guides — Canadian Points, Credit Cards & Personal Finance | SmartCardOffers',
  description: 'In-depth guides to Canadian credit card points, Aeroplan strategy, travel rewards, and personal finance decisions — written by the SmartCardOffers editorial team.',
}

export default function GuidesPage() {
  const guides   = getArticlesByCategory('guides')
  const related  = getArticlesByCategory('points-deals').slice(0, 3)
  const allCards = [...guides, ...related]

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Guides' }]} />

      <div className="mt-6 mb-6 max-w-3xl">
        <SectionHeader
          label="Guides"
          title="Canadian Points & Credit Card Guides"
          subtitle="Comprehensive, evergreen guides to help Canadians understand credit card rewards, maximize points, and make smarter financial decisions."
        />
      </div>

      {/* Category nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: 'Guides',            href: '/blog/guides',            active: true },
          { label: 'Points Deals',      href: '/blog/points-deals',      active: false },
          { label: 'Credit Card Deals', href: '/blog/credit-card-deals', active: false },
          { label: 'Mortgage News',     href: '/blog/mortgage-news',     active: false },
          { label: 'All Posts',         href: '/blog',                   active: false },
        ].map(cat => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              cat.active
                ? 'bg-navy-600 text-white border-navy-600'
                : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Featured guide */}
      {guides[0] && (
        <div className="mb-8">
          <ArticleCard article={guides[0]} variant="featured" />
        </div>
      )}

      {/* All guides grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {allCards.map(article => (
          <ArticleCard key={article.id} article={article} variant="featured" />
        ))}
      </div>

      {/* About section */}
      <div className="bg-parchment-50 rounded-2xl p-7 mb-10 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-900 mb-3">About Our Guides</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Our guides are designed to be the most practical, Canadian-specific resources available. Whether you&apos;re learning how Aeroplan works, deciding between cash back and travel rewards, or trying to understand transfer partner ratios — we write for real Canadians making real financial decisions.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Unlike quick news posts, our guides are updated regularly to reflect program changes, new card offers, and evolving best practices. Bookmark the ones relevant to your goals and revisit them as your strategy evolves.
        </p>
      </div>

      <NewsletterSignup />
    </div>
  )
}
