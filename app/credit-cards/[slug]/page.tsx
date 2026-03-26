import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, ExternalLink, Star, Shield, Plane, DollarSign } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import Badge from '@/components/ui/Badge'
import { fetchCard, fetchCards } from '@/lib/smart-card-api'
import { getCardBySlug, cards as localCards } from '@/data/cards'
import { getOfferByCardId } from '@/data/offers'
import { formatCAD, formatAnnualFee, formatDate } from '@/lib/utils'
import type { CreditCard, Insurance } from '@/types'

interface Props {
  params: { slug: string }
}

// Let Next.js render any slug dynamically (API cards + local cards)
export const dynamicParams = true
export const revalidate = 3600

export async function generateStaticParams() {
  // Pre-build local card slugs; API cards render on-demand
  return localCards.map(c => ({ slug: c.slug }))
}

async function getCard(slug: string): Promise<CreditCard | null> {
  // Try local first (fast), then API
  const local = getCardBySlug(slug)
  if (local) return local
  return fetchCard(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = await getCard(params.slug)
  if (!card) return {}
  const maxRate = Math.max(...card.earnRates.map(r => r.rate))
  return {
    title: `${card.name} Review — ${formatAnnualFee(card.annualFee)} Annual Fee`,
    description: `${card.name} review: ${card.bonusSummary ?? card.welcomeBonus ?? ''}. Annual fee: ${formatAnnualFee(card.annualFee)}. Earn up to ${maxRate}x points.`,
  }
}

function InsuranceLine({ label, value }: { label: string; value?: boolean | string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-2 text-sm">
      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
      <span>
        <strong className="text-gray-900">{label}</strong>
        {typeof value === 'string' && <span className="text-gray-600"> — {value}</span>}
      </span>
    </div>
  )
}

export default async function CardDetailPage({ params }: Props) {
  const card = await getCard(params.slug)
  if (!card) notFound()

  // Offer: try local offers first, otherwise use welcomeBonus from card
  const localOffer = getOfferByCardId(card.id)
  const currentOffer = localOffer ?? (card.welcomeBonus ? {
    id: 'api-offer',
    cardId: card.id,
    cardSlug: card.slug,
    cardName: card.name,
    issuer: card.issuer,
    offerType: 'welcome-bonus' as const,
    headline: card.welcomeBonus,
    isLimitedTime: false,
    featured: true,
    lastUpdated: card.lastUpdated,
    tags: [],
    affiliateLink: card.affiliateLink,
    spendRequirement: undefined,
  } : null)

  // Related cards from API
  const allApiCards = await fetchCards({ limit: 20 })
  const pool = allApiCards.length > 0 ? allApiCards : localCards
  const relatedCards = pool
    .filter(c => c.slug !== card.slug && c.categories.some(cat => card.categories.includes(cat)))
    .slice(0, 3)

  const maxEarnRate = Math.max(...card.earnRates.map(r => r.rate))

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[
        { label: 'Credit Cards', href: '/credit-cards' },
        { label: card.name },
      ]} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Hero card summary */}
          <div className="card-surface p-7">
            <div className="flex items-start gap-5 mb-6">
              {/* Card image or gradient fallback */}
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-24 h-16 flex-shrink-0 rounded-lg object-contain bg-gray-50"
                />
              ) : (
                <div className="w-24 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-navy-600 to-navy-900 flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-wide opacity-80">
                    {card.issuer.split(' ')[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  {card.editorsPick && (
                    <Badge variant="gold">
                      <Star className="w-2.5 h-2.5 mr-1" />Editor's Pick
                    </Badge>
                  )}
                  {!card.foreignTransactionFee && <Badge variant="green">No FX Fee</Badge>}
                  <Badge variant="gray">{card.network}</Badge>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{card.name}</h1>
                <p className="text-gray-500 mt-1">{card.issuer} · {card.pointsProgram ?? card.rewardsType.replace(/-/g, ' ')}</p>
              </div>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-parchment-100 mb-5">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{formatAnnualFee(card.annualFee)}</p>
                <p className="text-xs text-gray-500 mt-0.5">Annual Fee</p>
                {card.annualFeeWaived && <p className="text-xs text-green-600 mt-0.5">{card.annualFeeWaived}</p>}
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{maxEarnRate}{card.earnRates[0]?.unit === 'percent' ? '%' : 'x'}</p>
                <p className="text-xs text-gray-500 mt-0.5">Best Earn Rate</p>
              </div>
              {card.incomeRequirementPersonal ? (
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{formatCAD(card.incomeRequirementPersonal, 0)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Min. Income</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">—</p>
                  <p className="text-xs text-gray-500 mt-0.5">Min. Income</p>
                </div>
              )}
              <div className="text-center">
                <p className={`text-2xl font-bold ${card.foreignTransactionFee ? 'text-gray-900' : 'text-green-700'}`}>
                  {card.foreignTransactionFee ? '2.5%' : 'None'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">FX Fee</p>
              </div>
            </div>

            {/* Current offer callout */}
            {currentOffer && (
              <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-1">Current Offer</p>
                <p className="font-semibold text-gray-900 text-sm">{currentOffer.headline}</p>
                {currentOffer.spendRequirement && (
                  <p className="text-xs text-gray-600 mt-0.5">Requirement: {currentOffer.spendRequirement}</p>
                )}
                {currentOffer.offerExpiry && (
                  <p className="text-xs text-red-600 mt-1">
                    Offer expires: {formatDate(currentOffer.offerExpiry)}
                  </p>
                )}
              </div>
            )}

            {/* Apply CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={card.affiliateLink ?? card.applyUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
              >
                Apply for the {card.name} <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link href="/compare" className="btn-secondary flex-1 text-center text-sm">
                Compare Cards
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              You'll be taken to the issuer's secure application page.
            </p>
          </div>

          {/* Best for / not ideal for */}
          {((card.bestFor?.length ?? 0) > 0 || (card.notIdealFor?.length ?? 0) > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {card.bestFor?.length > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Best For
                  </h2>
                  <ul className="space-y-2">
                    {card.bestFor.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {card.notIdealFor && card.notIdealFor.length > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Not Ideal For
                  </h2>
                  <ul className="space-y-2">
                    {card.notIdealFor.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Earn rates */}
          {card.earnRates.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-navy-600" /> Earn Rates
              </h2>
              <div className="space-y-3">
                {card.earnRates.map((rate, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-parchment-100 last:border-0">
                    <span className="text-sm text-gray-700">{rate.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-700 text-sm">
                        {rate.rate}{rate.unit === 'percent' ? '%' : 'x'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {rate.unit === 'percent' ? 'cash back' : rate.unit}
                      </span>
                      {rate.cap && <span className="text-xs text-gray-400">({rate.cap})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks */}
          {card.perks.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-gold-500" /> Card Perks & Benefits
              </h2>
              <div className="space-y-3">
                {card.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-navy-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{perk.label}</p>
                      {perk.description && <p className="text-sm text-gray-600 mt-0.5">{perk.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance */}
          {(card.insurance.travelMedical || card.insurance.rentalCar || card.insurance.purchaseProtection || card.insurance.extendedWarranty) && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-navy-600" /> Insurance Coverage
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <InsuranceLine label="Out-of-province travel medical"  value={card.insurance.travelMedical} />
                <InsuranceLine label="Trip cancellation"               value={card.insurance.tripCancellation} />
                <InsuranceLine label="Trip interruption"               value={card.insurance.tripInterruption} />
                <InsuranceLine label="Flight delay"                    value={card.insurance.flightDelay} />
                <InsuranceLine label="Baggage delay/loss"              value={card.insurance.baggageDelay} />
                <InsuranceLine label="Rental car collision"            value={card.insurance.rentalCar} />
                <InsuranceLine label="Purchase protection"             value={card.insurance.purchaseProtection} />
                <InsuranceLine label="Extended warranty"               value={card.insurance.extendedWarranty} />
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          {((card.pros?.length ?? 0) > 0 || (card.cons?.length ?? 0) > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {card.pros && card.pros.length > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3">Pros</h2>
                  <ul className="space-y-2">
                    {card.pros.map(p => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {card.cons && card.cons.length > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3">Cons</h2>
                  <ul className="space-y-2">
                    {card.cons.map(c => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                        <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Editorial review */}
          {card.editorialReview && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Our Editorial Review</h2>
              <p className="text-gray-700 leading-relaxed text-[15px]">{card.editorialReview}</p>
              <p className="text-xs text-gray-400 mt-4">
                Last updated: {formatDate(card.lastUpdated)} · SmartCardOffers Editorial Team
              </p>
            </div>
          )}

          <DisclaimerBlock />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Sticky apply box */}
          <div className="card-surface p-5 sticky top-20">
            <h3 className="font-bold text-gray-900 mb-4">{card.name}</h3>
            {(card.welcomeBonus || card.bonusSummary) && (
              <div className="bg-parchment-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Welcome Bonus</p>
                <p className="text-sm font-semibold text-gray-900">{card.bonusSummary ?? card.welcomeBonus}</p>
              </div>
            )}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual fee</span>
                <span className="font-semibold">{formatAnnualFee(card.annualFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network</span>
                <span className="font-semibold">{card.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FX fee</span>
                <span className={`font-semibold ${!card.foreignTransactionFee ? 'text-green-700' : ''}`}>
                  {card.foreignTransactionFee ? '2.5%' : 'None'}
                </span>
              </div>
            </div>
            <a
              href={card.affiliateLink ?? card.applyUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-primary w-full text-center text-sm"
            >
              Apply Now
            </a>
            <Link href="/compare" className="btn-ghost w-full text-center text-sm mt-2 block">
              Add to compare
            </Link>
          </div>

          {/* Related cards */}
          {relatedCards.length > 0 && (
            <div className="card-surface p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">You might also like</h3>
              <div className="space-y-3">
                {relatedCards.map(rc => (
                  <Link key={rc.id} href={`/credit-cards/${rc.slug}`} className="flex items-center gap-3 group">
                    <div className="w-10 h-7 rounded bg-gradient-to-br from-navy-600 to-navy-900 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-900 group-hover:text-navy-600 transition-colors truncate">{rc.name}</p>
                      <p className="text-xs text-gray-500">{formatAnnualFee(rc.annualFee)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <NewsletterSignup variant="compact" />
        </div>
      </div>
    </div>
  )
}
