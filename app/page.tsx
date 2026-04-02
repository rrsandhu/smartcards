import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, CreditCard, Star, ArrowRight, Zap, Home, BookOpen } from 'lucide-react'
import ArticleCard from '@/components/blog/ArticleCard'
import ToolCard from '@/components/tools/ToolCard'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import SectionHeader from '@/components/ui/SectionHeader'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import HeroSection from '@/components/home/HeroSection'
import { getFeaturedArticles } from '@/data/articles'
import { getFeaturedOffers } from '@/data/offers'
import { getFeaturedTools } from '@/data/tools'
import { fetchOffers } from '@/lib/smart-card-api'
import type { CardOffer } from '@/types'

export const metadata: Metadata = {
  title: 'SmartCardOffers — Canada\'s Best Credit Cards, Points Deals & Mortgage Tools',
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
    <div className="card-surface overflow-hidden flex flex-col h-[26rem]">
      {/* Card image header */}
      <div className="h-44 bg-gradient-to-br from-navy-600 to-navy-900 relative flex items-center justify-center">
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.cardName}
            className="h-32 w-auto object-contain drop-shadow-lg"
          />
        ) : (
          <span className="text-white font-bold text-lg opacity-40">{offer.issuer}</span>
        )}
        {offer.isLimitedTime && (
          <span className="absolute top-3 right-3 text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" />Limited
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-0.5">{offer.cardName}</h3>
          <p className="text-xs text-gray-500 mb-2">{offer.issuer}</p>
          <p className="text-sm text-gray-700 leading-snug line-clamp-3">{offer.headline}</p>
          {offer.spendRequirement && (
            <p className="text-xs text-gray-500 mt-1.5">Spend: {offer.spendRequirement}</p>
          )}
        </div>
        {offer.affiliateLink ? (
          <a
            href={offer.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary text-sm text-center mt-auto"
          >
            Apply Now
          </a>
        ) : (
          <Link href={`/credit-cards/${offer.cardSlug}`} className="btn-secondary text-sm text-center mt-auto">
            View Card
          </Link>
        )}
      </div>
    </div>
  )
}

export const revalidate = 3600

export default async function HomePage() {
  const apiOffers = await fetchOffers({ limit: 20 })

  const featuredArticles = getFeaturedArticles()
  const featuredOffers   = apiOffers.length > 0 ? apiOffers.slice(0, 8) : getFeaturedOffers().slice(0, 8)
  const featuredTools    = getFeaturedTools()

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <HeroSection />

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
        {/* Horizontal scroll row — single row, swipe on mobile */}
        <div
          className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {featuredOffers.map(offer => (
            <div key={offer.id} className="w-72 flex-shrink-0 snap-start">
              <OfferBadge offer={offer} />
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <Link href="/best-offers" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors">
            View all offers →
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
