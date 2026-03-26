import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Calendar, ExternalLink, Star } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import Badge from '@/components/ui/Badge'
import { fetchOffers } from '@/lib/smart-card-api'
import { offers as localOffers } from '@/data/offers'
import { cards, getCardBySlug } from '@/data/cards'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Best Credit Card Offers in Canada Right Now',
  description: 'Browse the best Canadian credit card welcome bonuses and limited-time offers available today. Updated regularly.',
}

export const revalidate = 3600 // refresh every hour

export default async function BestOffersPage() {
  // Fetch live offers from Smart Card Offers API, fall back to local data
  const apiOffers  = await fetchOffers({ limit: 50 })
  const allOffers  = apiOffers.length > 0 ? apiOffers : localOffers

  const limitedTime = allOffers.filter(o => o.isLimitedTime)
  const ongoing     = allOffers.filter(o => !o.isLimitedTime)

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Best Offers' }]} />

      <div className="mt-6 mb-6">
        <SectionHeader
          label="Updated Regularly"
          title="Best Credit Card Offers in Canada"
          subtitle="Top welcome bonuses and limited-time promotions available to Canadian residents right now. We track offer changes so you don't have to."
        />
      </div>

      <DisclaimerBlock />

      {/* Limited-time offers */}
      {limitedTime.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Limited-Time Offers</h2>
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              Expires Soon
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {limitedTime.map(offer => {
              const card = cards.find(c => c.id === offer.cardId || c.slug === offer.cardSlug)
              return (
                <div key={offer.id} className="card-surface p-5 flex flex-col gap-4 ring-1 ring-red-100">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="red">
                        <Zap className="w-2.5 h-2.5 mr-1" />Limited Time
                      </Badge>
                    </div>
                    {offer.offerExpiry && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />Expires {formatDate(offer.offerExpiry)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{offer.cardName}</h3>
                    <p className="text-xs text-gray-500 mb-2">{offer.issuer}</p>
                    <p className="text-sm text-gray-800">{offer.headline}</p>
                    {offer.spendRequirement && (
                      <p className="text-xs text-gray-500 mt-1.5">
                        Spend requirement: {offer.spendRequirement}
                      </p>
                    )}
                    {offer.additionalBonus && (
                      <p className="text-xs text-navy-700 font-medium mt-1">
                        + {offer.additionalBonus}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={offer.affiliateLink ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn-primary flex-1 text-sm text-center flex items-center justify-center gap-1"
                    >
                      Apply Now <ExternalLink className="w-3 h-3" />
                    </a>
                    {card && (
                      <Link href={`/credit-cards/${card.slug}`} className="btn-secondary text-sm px-3">
                        Review
                      </Link>
                    )}
                    {!card && offer.cardSlug && (
                      <Link href={`/credit-cards/${offer.cardSlug}`} className="btn-secondary text-sm px-3">
                        Review
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Ongoing offers */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-5">
          <Star className="w-5 h-5 text-gold-500" />
          <h2 className="text-xl font-bold text-gray-900">Top Welcome Bonuses</h2>
          <span className="text-xs text-gray-500 ml-1">{ongoing.length} offers</span>
        </div>
        <div className="space-y-4">
          {ongoing.map((offer, idx) => {
            const card = cards.find(c => c.id === offer.cardId || c.slug === offer.cardSlug)
            return (
              <div key={offer.id} className="card-surface p-5">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Rank */}
                  <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>

                  {/* Card image */}
                  {offer.imageUrl ? (
                    <img src={offer.imageUrl} alt={offer.cardName} className="w-20 h-13 object-contain rounded-lg bg-gray-50 flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-navy-600 to-navy-900 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs opacity-80">
                        {offer.issuer.split(' ')[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{offer.cardName}</h3>
                    <p className="text-xs text-gray-500 mb-2">{offer.issuer}</p>
                    <p className="text-sm text-gray-800 font-medium">{offer.headline}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      {offer.spendRequirement && <span>Requirement: {offer.spendRequirement}</span>}
                      {offer.bonusAmount && offer.bonusUnit === 'points' && (
                        <span className="text-navy-700 font-medium">
                          {offer.bonusAmount.toLocaleString()} pts
                        </span>
                      )}
                      {offer.bonusAmount && offer.bonusUnit === 'percent' && (
                        <span className="text-navy-700 font-medium">
                          {offer.bonusAmount}% cash back
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {offer.tags.map(t => (
                        <span key={t} className="text-xs bg-parchment-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {offer.affiliateLink ? (
                      <a
                        href={offer.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn-primary text-sm text-center whitespace-nowrap"
                      >
                        Apply Now
                      </a>
                    ) : (
                      <Link href={`/credit-cards/${offer.cardSlug}`} className="btn-primary text-sm text-center whitespace-nowrap">
                        View Card
                      </Link>
                    )}
                    {card ? (
                      <Link href={`/credit-cards/${card.slug}`} className="btn-secondary text-sm text-center">
                        Full Review
                      </Link>
                    ) : offer.cardSlug ? (
                      <Link href={`/credit-cards/${offer.cardSlug}`} className="btn-secondary text-sm text-center">
                        Full Review
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How we rank the best credit card offers</h2>
        <div className="text-gray-600 text-sm space-y-3 leading-relaxed">
          <p>We evaluate every welcome bonus based on its total net value after factoring in the annual fee, required minimum spend, and realistic points redemption values. A 100,000-point bonus that requires $10,000 in spending isn't always better than a 35,000-point bonus with a $1,000 threshold.</p>
          <p>We monitor offer changes from Canadian card issuers and update this page regularly. Limited-time offers are flagged clearly so you can act before they expire.</p>
          <p>SmartCardOffers may earn a referral commission when you apply through our links. This does not affect our rankings — we include every major Canadian card regardless of whether we have an affiliate relationship.</p>
        </div>
      </section>

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  )
}
