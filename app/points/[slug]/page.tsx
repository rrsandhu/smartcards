import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle, XCircle, ArrowRight, Zap, Clock,
  Plane, Hotel, Building2, Globe, Star, Info, TrendingUp,
} from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import CreditCardCard from '@/components/cards/CreditCardCard'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import Badge from '@/components/ui/Badge'
import { getProgramBySlug, pointsPrograms } from '@/data/points-programs'
import { cards } from '@/data/cards'
import type { TransferPartner } from '@/data/points-programs'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return pointsPrograms.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prog = getProgramBySlug(params.slug)
  if (!prog) return {}
  return {
    title: `${prog.name} Guide — Transfer Partners & Best Redemptions`,
    description: `Complete guide to ${prog.shortName}: transfer partners, ratios, best redemptions, and strategy tips for Canadians.`,
  }
}

const partnerTypeIcon = {
  airline: Plane,
  hotel:   Hotel,
  bank:    Building2,
  retail:  Star,
}

const partnerTypeColor = {
  airline: 'bg-blue-100 text-blue-700',
  hotel:   'bg-gold-100 text-gold-700',
  bank:    'bg-navy-100 text-navy-700',
  retail:  'bg-purple-100 text-purple-700',
}

const difficultyStyle = {
  beginner:     { label: 'Beginner',     style: 'bg-green-100 text-green-700' },
  intermediate: { label: 'Intermediate', style: 'bg-amber-100 text-amber-700' },
  advanced:     { label: 'Advanced',     style: 'bg-red-100 text-red-700' },
}

const typeLabel: Record<string, string> = {
  bank:      'Bank Currency',
  airline:   'Airline Program',
  hotel:     'Hotel Program',
  coalition: 'Coalition Program',
  retail:    'Retail Program',
}

function FlexDots({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`w-2.5 h-2.5 rounded-full ${i <= rating ? 'bg-navy-600' : 'bg-parchment-300'}`} />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}/5</span>
    </div>
  )
}

function PartnerRow({ partner }: { partner: TransferPartner }) {
  const Icon = partnerTypeIcon[partner.type] ?? Star
  return (
    <tr className="border-b border-parchment-100 last:border-0 hover:bg-parchment-50 transition-colors">
      {/* Partner name */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${partnerTypeColor[partner.type]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{partner.name}</p>
            {partner.alliance && (
              <p className="text-xs text-gray-500">{partner.alliance}</p>
            )}
          </div>
        </div>
      </td>

      {/* Ratio */}
      <td className="py-4 px-4">
        <span className="font-bold text-navy-700 text-sm bg-navy-50 px-2.5 py-1 rounded-lg">
          {partner.ratioLabel}
        </span>
      </td>

      {/* Transfer time */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5 text-sm">
          {partner.isInstant
            ? <><Zap className="w-3.5 h-3.5 text-green-500" /><span className="text-green-700 font-medium">{partner.transferTime}</span></>
            : <><Clock className="w-3.5 h-3.5 text-gray-400" /><span className="text-gray-600">{partner.transferTime}</span></>}
        </div>
      </td>

      {/* Best for */}
      <td className="py-4 px-4 hidden lg:table-cell">
        <p className="text-sm text-gray-600 leading-snug">{partner.bestFor}</p>
        {partner.notes && (
          <p className="text-xs text-gray-400 mt-0.5">{partner.notes}</p>
        )}
      </td>
    </tr>
  )
}

export default function ProgramPage({ params }: Props) {
  const prog = getProgramBySlug(params.slug)
  if (!prog) notFound()

  // Cards that earn this program's currency
  const earnCards = cards.filter(c => prog.earnCards.includes(c.id))

  // Other programs for sidebar
  const otherPrograms = pointsPrograms.filter(p => p.slug !== prog.slug).slice(0, 4)

  // Split partners by type
  const airlinePartners = prog.transferPartners.filter(p => p.type === 'airline')
  const hotelPartners   = prog.transferPartners.filter(p => p.type === 'hotel')
  const bankPartners    = prog.transferPartners.filter(p => p.type === 'bank')

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[
        { label: 'Points Guides', href: '/points' },
        { label: prog.shortName },
      ]} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Hero */}
          <div className="card-surface p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 bg-navy-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                {prog.shortName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="navy">{typeLabel[prog.type]}</Badge>
                  <Badge variant="gray">{prog.operator}</Badge>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{prog.name}</h1>
                <p className="text-gold-600 font-medium text-sm mt-0.5">{prog.tagline}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-parchment-100 mb-5">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">~{prog.cppCents}¢</p>
                <p className="text-xs text-gray-500 mt-0.5">Avg value/pt</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{prog.cppCentsMax}¢</p>
                <p className="text-xs text-gray-500 mt-0.5">Best value/pt</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{prog.transferPartners.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Transfer partners</p>
              </div>
              <div className="text-center">
                <FlexDots rating={prog.flexibilityRating} />
                <p className="text-xs text-gray-500 mt-1">Flexibility</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-[15px]">{prog.description}</p>
          </div>

          {/* Transfer Partners */}
          {prog.transferPartners.length > 0 ? (
            <div className="card-surface overflow-hidden">
              <div className="p-5 border-b border-parchment-100">
                <h2 className="text-lg font-bold text-gray-900">Transfer Partners</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  All transfers are one-way and typically irreversible. Verify ratios with the program before transferring.
                </p>
              </div>

              {airlinePartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border-b border-parchment-100">
                    <Plane className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Airline Partners ({airlinePartners.length})
                    </span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-parchment-50 text-xs font-semibold text-gray-500 border-b border-parchment-100">
                        <th className="text-left py-2.5 px-4">Partner</th>
                        <th className="text-left py-2.5 px-4">Ratio</th>
                        <th className="text-left py-2.5 px-4">Transfer Time</th>
                        <th className="text-left py-2.5 px-4 hidden lg:table-cell">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {airlinePartners.map(p => <PartnerRow key={p.slug} partner={p} />)}
                    </tbody>
                  </table>
                </div>
              )}

              {hotelPartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gold-50 border-b border-parchment-100 border-t border-parchment-100">
                    <Hotel className="w-4 h-4 text-gold-600" />
                    <span className="text-xs font-semibold text-gold-700 uppercase tracking-wide">
                      Hotel Partners ({hotelPartners.length})
                    </span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-parchment-50 text-xs font-semibold text-gray-500 border-b border-parchment-100">
                        <th className="text-left py-2.5 px-4">Partner</th>
                        <th className="text-left py-2.5 px-4">Ratio</th>
                        <th className="text-left py-2.5 px-4">Transfer Time</th>
                        <th className="text-left py-2.5 px-4 hidden lg:table-cell">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotelPartners.map(p => <PartnerRow key={p.slug} partner={p} />)}
                    </tbody>
                  </table>
                </div>
              )}

              {bankPartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-navy-50 border-t border-parchment-100">
                    <Building2 className="w-4 h-4 text-navy-600" />
                    <span className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
                      Bank Transfer Sources ({bankPartners.length})
                    </span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-parchment-50 text-xs font-semibold text-gray-500 border-b border-parchment-100">
                        <th className="text-left py-2.5 px-4">Partner</th>
                        <th className="text-left py-2.5 px-4">Ratio</th>
                        <th className="text-left py-2.5 px-4">Transfer Time</th>
                        <th className="text-left py-2.5 px-4 hidden lg:table-cell">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankPartners.map(p => <PartnerRow key={p.slug} partner={p} />)}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="card-surface p-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-navy-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">No Transfer Partners</h2>
                <p className="text-sm text-gray-600">
                  {prog.shortName} is a closed-loop program — points are redeemed directly within the program ecosystem rather than transferred to airlines or hotels.
                </p>
              </div>
            </div>
          )}

          {/* Sweet Spots */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-gold-500" />
              <h2 className="text-xl font-bold text-gray-900">Best Redemptions (Sweet Spots)</h2>
            </div>
            <div className="space-y-4">
              {prog.sweetSpots.map((spot, i) => {
                const diff = difficultyStyle[spot.difficulty]
                return (
                  <div key={i} className="card-surface p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-gray-900 text-base leading-snug">{spot.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${diff.style}`}>
                        {diff.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{spot.description}</p>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs bg-parchment-50 rounded-xl p-3">
                      <div>
                        <p className="text-gray-500 mb-0.5">Points needed</p>
                        <p className="font-semibold text-gray-900">{spot.pointsNeeded}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">Cash value</p>
                        <p className="font-semibold text-green-700">{spot.estimatedCashValue}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">Value/point</p>
                        <p className="font-semibold text-navy-700">~{spot.cppEstimate}¢</p>
                      </div>
                    </div>
                    {spot.tip && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-blue-800 bg-blue-50 rounded-lg px-3 py-2">
                        <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                        <span><strong>Pro tip:</strong> {spot.tip}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card-surface p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Pros</h2>
              <ul className="space-y-2.5">
                {prog.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Cons</h2>
              <ul className="space-y-2.5">
                {prog.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strategy Tips */}
          <div className="card-surface p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-500" />
              Strategy Tips
            </h2>
            <ol className="space-y-3">
              {prog.strategyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-navy-100 text-navy-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>

          {/* Earn cards */}
          {earnCards.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Best Cards to Earn {prog.shortName} Points
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                These Canadian credit cards earn {prog.shortName} points directly.
              </p>
              <div className="space-y-4">
                {earnCards.map(card => (
                  <CreditCardCard key={card.id} card={card} variant="list" />
                ))}
              </div>
            </div>
          )}

          <DisclaimerBlock text="Points values are estimates based on typical real-world redemptions and may vary. Transfer partner ratios are accurate as of the last updated date but are subject to change by the program operator. Always verify current transfer ratios and availability with the program before transferring points." />
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="space-y-5">

          {/* Quick facts */}
          <div className="card-surface p-5 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Quick Facts</h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Program type',       value: typeLabel[prog.type] },
                { label: 'Operator',           value: prog.operator },
                { label: 'Avg point value',    value: `~${prog.cppCents}¢ per point` },
                { label: 'Best point value',   value: `${prog.cppCentsMax}¢ per point` },
                { label: 'Transfer partners',  value: prog.transferPartners.length === 0 ? 'None' : `${prog.transferPartners.length} programs` },
                { label: 'Flexibility',        value: `${prog.flexibilityRating}/5` },
                { label: 'Last updated',       value: prog.lastUpdated },
              ].map(item => (
                <div key={item.label} className="flex justify-between gap-2">
                  <dt className="text-gray-500">{item.label}</dt>
                  <dd className="font-medium text-gray-900 text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Other programs */}
          <div className="card-surface p-5">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Other Program Guides</h3>
            <div className="space-y-2">
              {otherPrograms.map(p => (
                <Link
                  key={p.slug}
                  href={`/points/${p.slug}`}
                  className="flex items-center justify-between py-2 group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-navy-600 transition-colors">{p.shortName}</p>
                    <p className="text-xs text-gray-500">{p.operator}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-navy-600 transition-colors" />
                </Link>
              ))}
              <Link href="/points" className="block pt-2 text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors">
                View all programs →
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <NewsletterSignup variant="compact" />
        </aside>
      </div>
    </div>
  )
}
