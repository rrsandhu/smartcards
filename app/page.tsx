import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, TrendingUp, CreditCard, Star, ArrowRight, Zap, Home, BookOpen } from 'lucide-react'
import CreditCardCard from '@/components/cards/CreditCardCard'
import ArticleCard from '@/components/blog/ArticleCard'
import ToolCard from '@/components/tools/ToolCard'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import SectionHeader from '@/components/ui/SectionHeader'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import { getFeaturedCards, getEditorsPicks } from '@/data/cards'
import { getFeaturedArticles } from '@/data/articles'
import { getFeaturedOffers } from '@/data/offers'
import { getFeaturedTools } from '@/data/tools'
import { fetchCards, fetchOffers } from '@/lib/smart-card-api'
import { formatCAD, categoryLabel } from '@/lib/utils'
import type { CardOffer } from '@/types'

export const metadata: Metadata = {
  title: 'PointsNorth — Canada\'s Best Credit Cards, Points Deals & Mortgage Tools',
  description: 'Compare Canada\'s best credit cards, discover points deals, and use free mortgage calculators. Expert reviews and unbiased comparisons for Canadians.',
}

const categories = [
  { icon: CreditCard, label: 'Best Credit Cards',    href: '/credit-cards',           color: 'bg-navy-100 text-navy-700' },
  { icon: Star,       label: 'Points Deals',          href: '/blog/points-deals',      color: 'bg-gold-100 text-gold-700' },
  { icon: Zap,        label: 'Credit Card Deals',     href: '/blog/credit-card-deals', color: 'bg-blue-100 text-blue-700' },
  { icon: Home,       label: 'Mortgage News',         href: '/blog/mortgage-news',     color: 'bg-green-100 text-green-700' },
  { icon: TrendingUp, label: 'Financial Tools',       href: '/tools',                  color: 'bg-purple-100 text-purple-700' },
  { icon: BookOpen,   label: 'Blog',                  href: '/blog',                   color: 'bg-parchment-200 text-gray-700' },
]

function OfferBadge({ offer }: { offer: CardOffer }) {
  return (
    <div className="card-surface p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-navy-700 bg-navy-100 px-2.5 py-1 rounded-full">
          {offer.issuer}
        </span>
        {offer.isLimitedTime && (
          <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" />Limited
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{offer.cardName}</h3>
        <p className="text-sm text-gray-700">{offer.headline}</p>
        {offer.spendRequirement && (
          <p className="text-xs text-gray-500 mt-1">Requirement: {offer.spendRequirement}</p>
        )}
      </div>
      <a
        href={offer.affiliateLink ?? '#'}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-primary text-sm text-center"
      >
        Apply Now
      </a>
    </div>
  )
}

export const revalidate = 3600

export default async function HomePage() {
  const [apiCards, apiOffers] = await Promise.all([
    fetchCards({ featured: true, limit: 8 }),
    fetchOffers({ limit: 12 }),
  ])

  const featuredCards    = (apiCards.length > 0 ? apiCards : getFeaturedCards()).slice(0, 4)
  const editorsPicks     = (apiCards.length > 0 ? apiCards.filter(c => c.editorsPick || c.featured) : getEditorsPicks()).slice(0, 3)
  const featuredArticles = getFeaturedArticles()
  const featuredOffers   = apiOffers.length > 0 ? apiOffers.slice(0, 4) : getFeaturedOffers()
  const featuredTools    = getFeaturedTools()

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-navy-600 text-white">
        <div className="container-site py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gold-300 mb-4">
              🇨🇦 Built for Canadians
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Canada's trusted guide to{' '}
              <span className="text-gold-400">credit cards, points & mortgages</span>
            </h1>
            <p className="text-xl text-navy-200 mb-8 leading-relaxed">
              Explore Canada's best credit card offers, discover the latest points deals, and use our free financial calculators — all in one clean, unbiased place.
            </p>

            {/* Hero search */}
            <form
              action="/search"
              method="get"
              className="flex gap-3 max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="q"
                  type="search"
                  placeholder="Search cards, deals, tools..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                />
              </div>
              <button type="submit" className="px-6 py-3.5 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors text-sm">
                Search
              </button>
            </form>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Best no-fee cards', 'Aeroplan cards', 'Cash back cards', 'Mortgage calculator'].map(q => (
                <Link
                  key={q}
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="text-xs bg-navy-500 hover:bg-navy-400 text-navy-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category quick-nav ────────────────────────────────────────────────── */}
      <section className="container-site py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white border border-parchment-200 hover:border-navy-200 hover:shadow-sm transition-all text-center group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-navy-700 leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Disclaimer ───────────────────────────────────────────────────────── */}
      <div className="container-site pb-4">
        <DisclaimerBlock />
      </div>

      {/* ─── Best Offers Right Now ─────────────────────────────────────────────── */}
      <section className="container-site py-10">
        <div className="flex items-end justify-between mb-6">
          <SectionHeader
            label="Hot Right Now"
            title="Best Offers Right Now"
            subtitle="Top welcome bonuses and limited-time promotions available to Canadians."
          />
          <Link href="/best-offers" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors hidden sm:flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredOffers.map(offer => (
            <OfferBadge key={offer.id} offer={offer} />
          ))}
        </div>
        <div className="mt-4 sm:hidden">
          <Link href="/best-offers" className="btn-secondary w-full text-center text-sm">
            View all offers
          </Link>
        </div>
      </section>

      {/* ─── Editor's Picks ────────────────────────────────────────────────────── */}
      <section className="bg-parchment-100 py-12">
        <div className="container-site">
          <div className="flex items-end justify-between mb-6">
            <SectionHeader
              label="Editor's Picks"
              title="Our Top Card Recommendations"
              subtitle="Handpicked by our editorial team for Canadians at every life stage."
            />
            <Link href="/credit-cards" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors hidden sm:flex items-center gap-1">
              All cards <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {editorsPicks.map(card => (
              <CreditCardCard key={card.id} card={card} variant="grid" />
            ))}
          </div>
          <div className="mt-5 sm:hidden">
            <Link href="/credit-cards" className="btn-secondary w-full text-center text-sm">
              Browse all cards
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Cards ────────────────────────────────────────────────────── */}
      <section className="container-site py-12">
        <div className="flex items-end justify-between mb-6">
          <SectionHeader
            label="Top Cards"
            title="Featured Credit Cards"
          />
          <Link href="/credit-cards" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors hidden sm:flex items-center gap-1">
            Compare all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-4">
          {featuredCards.map(card => (
            <CreditCardCard key={card.id} card={card} variant="list" />
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link href="/credit-cards" className="btn-primary">
            Browse All Canadian Credit Cards
          </Link>
        </div>
      </section>

      {/* ─── Latest Articles ───────────────────────────────────────────────────── */}
      <section className="bg-parchment-50 border-t border-parchment-200 py-12">
        <div className="container-site">
          <div className="flex items-end justify-between mb-6">
            <SectionHeader
              label="Latest Content"
              title="Points Deals & Card News"
              subtitle="Expert analysis on the best deals in Canadian credit cards and travel rewards."
            />
            <Link href="/blog" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors hidden sm:flex items-center gap-1">
              All articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArticles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>

          {/* Mortgage news highlight */}
          {featuredArticles.find(a => a.category === 'mortgage-news') && (
            <div className="mt-8 p-6 bg-navy-50 rounded-2xl border border-navy-100">
              <p className="section-label mb-3">Mortgage News</p>
              {(() => {
                const ma = featuredArticles.find(a => a.category === 'mortgage-news')!
                return (
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/blog/${ma.slug}`} className="hover:text-navy-600 transition-colors">
                          {ma.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{ma.excerpt}</p>
                      <Link href={`/blog/${ma.slug}`} className="btn-secondary text-sm">
                        Read Article →
                      </Link>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </section>

      {/* ─── Tools grid ────────────────────────────────────────────────────────── */}
      <section className="container-site py-12">
        <div className="flex items-end justify-between mb-6">
          <SectionHeader
            label="Free Tools"
            title="Financial Calculators"
            subtitle="Free tools to help you make smarter decisions about mortgages, debt, and rewards."
          />
          <Link href="/tools" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors hidden sm:flex items-center gap-1">
            All tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* ─── Newsletter ────────────────────────────────────────────────────────── */}
      <section className="container-site pb-16">
        <NewsletterSignup />
      </section>
    </div>
  )
}
