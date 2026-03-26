import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, ExternalLink, Star, Shield, Plane, DollarSign, AlertCircle, Award } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import Badge from '@/components/ui/Badge'
import CardImage from '@/components/cards/CardImage'
import { fetchCard, fetchCards } from '@/lib/smart-card-api'
import { getCardBySlug, cards as localCards } from '@/data/cards'
import { formatCAD, formatAnnualFee, formatDate } from '@/lib/utils'
import type { CreditCard } from '@/types'

interface Props {
  params: { slug: string }
}

export const dynamicParams = true
export const revalidate = 3600

export async function generateStaticParams() {
  return localCards.map(c => ({ slug: c.slug }))
}

async function getCard(slug: string): Promise<CreditCard | null> {
  const local = getCardBySlug(slug)
  if (local) return local
  return fetchCard(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = await getCard(params.slug)
  if (!card) return { title: 'Card Not Found' }
  return {
    title: `${card.name} Review — ${formatAnnualFee(card.annualFee)} Annual Fee`,
    description: `${card.name} review: ${card.bonusSummary ?? card.welcomeBonus ?? ''}. Annual fee: ${formatAnnualFee(card.annualFee)}.`,
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

function creditScoreLabel(score?: string): string {
  if (!score) return '—'
  const map: Record<string, string> = {
    excellent: 'Excellent (760+)',
    good:      'Good (690–759)',
    fair:      'Fair (630–689)',
    poor:      'Poor (below 630)',
  }
  return map[score] ?? score.charAt(0).toUpperCase() + score.slice(1)
}

export default async function CardDetailPage({ params }: Props) {
  const card = await getCard(params.slug)

  // Graceful "not yet available" page instead of hard 404
  if (!card) {
    return (
      <div className="container-site py-16 text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Review Not Available</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We don't have a full review for this card yet. Check back soon, or browse all reviewed cards below.
        </p>
        <Link href="/credit-cards" className="btn-primary">
          Browse All Credit Cards
        </Link>
      </div>
    )
  }

  // Pick best offer: highest confidence, verified preferred
  const bestOffer = card.allOffers
    ?.filter(o => o.headline && o.headline.length > 5)
    .sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0) || b.confidenceScore - a.confidenceScore)[0]

  // All other offers to show as alternatives
  const otherOffers = card.allOffers?.filter(o => o !== bestOffer && o.headline && o.headline.length > 5).slice(0, 3) ?? []

  // Related cards from API
  const allApiCards = await fetchCards({ limit: 20 })
  const relatedCards = allApiCards
    .filter(c => c.slug !== card.slug && c.categories.some(cat => card.categories.includes(cat)))
    .slice(0, 3)

  const maxEarnRate = card.earnRates.length > 0 ? Math.max(...card.earnRates.map(r => r.rate)) : 0

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[
        { label: 'Credit Cards', href: '/credit-cards' },
        { label: card.name },
      ]} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Hero card summary */}
          <div className="card-surface p-7">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-28 h-18 flex-shrink-0">
                <CardImage card={card} className="w-28 h-18" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  {card.editorsPick && (
                    <Badge variant="gold"><Star className="w-2.5 h-2.5 mr-1" />Editor's Pick</Badge>
                  )}
                  {!card.foreignTransactionFee && <Badge variant="green">No FX Fee</Badge>}
                  {card.loungeAccess && <Badge variant="navy"><Plane className="w-2.5 h-2.5 mr-1" />Lounge Access</Badge>}
                  <Badge variant="gray">{card.network}</Badge>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{card.name}</h1>
                <p className="text-gray-500 mt-1">{card.issuer} · {card.pointsProgram ?? card.rewardsType.replace(/-/g, ' ')}</p>
                {card.creditScoreMin && (
                  <p className="text-xs text-gray-400 mt-1">Credit score: {creditScoreLabel(card.creditScoreMin)}</p>
                )}
              </div>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-parchment-100 mb-5">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{formatAnnualFee(card.annualFee)}</p>
                <p className="text-xs text-gray-500 mt-0.5">Annual Fee</p>
                {card.annualFeeWaived && <p className="text-xs text-green-600 mt-0.5">{card.annualFeeWaived}</p>}
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {maxEarnRate > 0 ? `${maxEarnRate}${card.earnRates[0]?.unit === 'percent' ? '%' : 'x'}` : '—'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Best Earn</p>
              </div>
              <div className="text-center">
                <p className={`text-xl font-bold ${card.foreignTransactionFee ? 'text-gray-900' : 'text-green-700'}`}>
                  {card.foreignTransactionFee ? '2.5%' : 'None'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">FX Fee</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {card.incomeRequirementPersonal ? formatCAD(card.incomeRequirementPersonal, 0) : '—'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Min. Income</p>
              </div>
            </div>

            {/* Best current offer */}
            {bestOffer && (
              <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-gold-700 uppercase tracking-wide mb-1">
                    {bestOffer.isVerified ? '✓ Verified Offer' : 'Current Offer'}
                  </p>
                  {bestOffer.expiresAt && (
                    <span className="text-xs text-red-600 font-medium">Expires {formatDate(bestOffer.expiresAt)}</span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{bestOffer.headline}</p>
                {bestOffer.spendRequirement && (
                  <p className="text-xs text-gray-600 mt-1">
                    Spend requirement: ${bestOffer.spendRequirement.toLocaleString()}
                    {bestOffer.spendTimeframeDays ? ` in ${Math.round(bestOffer.spendTimeframeDays / 30)} months` : ''}
                  </p>
                )}
                {(bestOffer.pointsValue ?? 0) > 0 && (
                  <p className="text-xs text-navy-700 font-medium mt-1">
                    {bestOffer.pointsValue!.toLocaleString()} {card.pointsProgram ?? 'points'}
                  </p>
                )}
              </div>
            )}

            {/* Apply CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              {(card.affiliateLink || card.applyUrl) ? (
                <a
                  href={(card.affiliateLink ?? card.applyUrl)!}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
                >
                  Apply for the {card.name} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="btn-primary flex-1 text-center opacity-50 cursor-not-allowed select-none">
                  Visit Issuer Website to Apply
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              You'll be taken to the issuer's secure application page.
            </p>
          </div>

          {/* Additional offers */}
          {otherOffers.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-500" /> Other Available Offers
              </h2>
              <div className="space-y-3">
                {otherOffers.map((o, i) => (
                  <div key={o.id} className="flex items-start gap-3 py-3 border-b border-parchment-100 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-navy-100 text-navy-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 2}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{o.headline}</p>
                      {o.spendRequirement && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Spend: ${o.spendRequirement.toLocaleString()}
                          {o.spendTimeframeDays ? ` in ${Math.round(o.spendTimeframeDays / 30)} months` : ''}
                        </p>
                      )}
                      {o.expiresAt && (
                        <p className="text-xs text-red-600 mt-0.5">Expires {formatDate(o.expiresAt)}</p>
                      )}
                    </div>
                    {o.isVerified && (
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">Verified</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earn rates */}
          {card.earnRates.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-navy-600" /> Earn Rates
              </h2>
              <div className="space-y-1">
                {card.earnRates.map((rate, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-parchment-100 last:border-0">
                    <span className="text-sm text-gray-700">{rate.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-700">
                        {rate.rate}{rate.unit === 'percent' ? '%' : 'x'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {rate.unit === 'percent' ? 'cash back' : rate.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transfer partners */}
          {(card.transferPartners?.length ?? 0) > 0 && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-navy-600" /> Transfer Partners
              </h2>
              <div className="flex flex-wrap gap-2">
                {card.transferPartners!.map(partner => (
                  <span key={partner} className="text-sm bg-navy-50 text-navy-700 px-3 py-1.5 rounded-full font-medium">
                    {partner}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Points can be transferred to these loyalty programs. Rates and availability subject to change.</p>
            </div>
          )}

          {/* Best for / not ideal for */}
          {((card.bestFor?.length ?? 0) > 0 || (card.notIdealFor?.length ?? 0) > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(card.bestFor?.length ?? 0) > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Best For
                  </h2>
                  <ul className="space-y-2">
                    {card.bestFor.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(card.notIdealFor?.length ?? 0) > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Not Ideal For
                  </h2>
                  <ul className="space-y-2">
                    {card.notIdealFor!.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Insurance & protection */}
          {(card.insurance.travelMedical || card.insurance.purchaseProtection || card.insurance.rentalCar || card.insurance.extendedWarranty || card.insurance.tripCancellation) && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-navy-600" /> Insurance & Protection
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
              {(card.pros?.length ?? 0) > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3">Pros</h2>
                  <ul className="space-y-2">
                    {card.pros!.map(p => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(card.cons?.length ?? 0) > 0 && (
                <div className="card-surface p-5">
                  <h2 className="font-semibold text-gray-900 mb-3">Cons</h2>
                  <ul className="space-y-2">
                    {card.cons!.map(c => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                        <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

          {card.editorialReview && (
            <div className="card-surface p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Our Editorial Review</h2>
              <p className="text-gray-700 leading-relaxed text-[15px]">{card.editorialReview}</p>
              <p className="text-xs text-gray-400 mt-4">Last updated: {formatDate(card.lastUpdated)} · SmartCardOffers Editorial Team</p>
            </div>
          )}

          <DisclaimerBlock />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Sticky apply box */}
          <div className="card-surface p-5 sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-8 flex-shrink-0">
                <CardImage card={card} className="w-12 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{card.name}</h3>
            </div>

            {bestOffer && (
              <div className="bg-parchment-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Welcome Offer</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{bestOffer.headline}</p>
              </div>
            )}

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual fee</span>
                <span className="font-semibold">{formatAnnualFee(card.annualFee)}</span>
              </div>
              {card.annualFeeWaived && (
                <div className="flex justify-between">
                  <span className="text-gray-600"></span>
                  <span className="text-xs text-green-600">{card.annualFeeWaived}</span>
                </div>
              )}
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
              {card.creditScoreMin && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit score</span>
                  <span className="font-semibold">{creditScoreLabel(card.creditScoreMin)}</span>
                </div>
              )}
              {card.loungeAccess && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Lounge access</span>
                  <span className="font-semibold text-navy-700">{card.loungeAccess}</span>
                </div>
              )}
            </div>

            {(card.affiliateLink || card.applyUrl) ? (
              <a
                href={(card.affiliateLink ?? card.applyUrl)!}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary w-full text-center text-sm flex items-center justify-center gap-1.5"
              >
                Apply Now <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="btn-primary w-full text-center text-sm opacity-50 cursor-not-allowed select-none block">
                Apply on Issuer Site
              </span>
            )}
          </div>

          {/* Related cards */}
          {relatedCards.length > 0 && (
            <div className="card-surface p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">You might also like</h3>
              <div className="space-y-3">
                {relatedCards.map(rc => (
                  <Link key={rc.id} href={`/credit-cards/${rc.slug}`} className="flex items-center gap-3 group">
                    <div className="w-10 h-7 flex-shrink-0">
                      <CardImage card={rc} className="w-10 h-7" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-900 group-hover:text-navy-600 transition-colors truncate">{rc.name}</p>
                      <p className="text-xs text-gray-500">{formatAnnualFee(rc.annualFee)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <NewsletterSignup variant="compact" />
        </div>
      </div>
    </div>
  )
}
