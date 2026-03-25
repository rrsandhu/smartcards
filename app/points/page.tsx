import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, Zap, Globe, Building2, Plane, Hotel } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { pointsPrograms } from '@/data/points-programs'

export const metadata: Metadata = {
  title: 'Canadian Points Transfer Guides — Amex, Aeroplan, RBC Avion & More',
  description:
    'Learn how to transfer Canadian credit card points to airlines and hotels. Compare Amex MR, Aeroplan, RBC Avion, and Scene+ transfer partners, ratios, and best redemptions.',
}

const typeIcon = {
  bank:      Building2,
  airline:   Plane,
  hotel:     Hotel,
  coalition: Globe,
  retail:    Star,
}

const typeLabel = {
  bank:      'Bank Currency',
  airline:   'Airline Program',
  hotel:     'Hotel Program',
  coalition: 'Coalition Program',
  retail:    'Retail Program',
}

const typeColor = {
  bank:      'bg-navy-100 text-navy-700',
  airline:   'bg-blue-100 text-blue-700',
  hotel:     'bg-gold-100 text-gold-700',
  coalition: 'bg-green-100 text-green-700',
  retail:    'bg-purple-100 text-purple-700',
}

function FlexDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= rating ? 'bg-navy-600' : 'bg-parchment-300'}`}
        />
      ))}
    </div>
  )
}

// Quick reference: which bank programs can transfer to which airlines
const transferChains = [
  {
    from: 'Amex MR',
    fromSlug: 'amex-membership-rewards',
    to: ['Aeroplan', 'BA Avios', 'Flying Blue', 'Singapore KrisFlyer', 'Delta', 'Etihad', 'Emirates', 'Marriott', 'Hilton'],
    highlight: 'Most partners in Canada',
    color: 'border-navy-200 bg-navy-50',
  },
  {
    from: 'RBC Avion',
    fromSlug: 'rbc-avion',
    to: ['WestJet $', 'BA Avios', 'American Airlines', 'Flying Blue', 'Cathay Asia Miles'],
    highlight: 'Best for WestJet + Avios',
    color: 'border-blue-200 bg-blue-50',
  },
  {
    from: 'Marriott Bonvoy',
    fromSlug: 'marriott-bonvoy',
    to: ['Aeroplan (3:1)', '40+ airlines (3:1)', 'Hotel stays'],
    highlight: 'Hotel-first, airline secondary',
    color: 'border-gold-200 bg-gold-50',
  },
]

export default function PointsHubPage() {
  const bankPrograms    = pointsPrograms.filter(p => p.type === 'bank')
  const airlinePrograms = pointsPrograms.filter(p => p.type === 'airline')
  const hotelPrograms   = pointsPrograms.filter(p => p.type === 'hotel')
  const otherPrograms   = pointsPrograms.filter(p => p.type !== 'bank' && p.type !== 'airline' && p.type !== 'hotel')

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Points Transfer Guides' }]} />

      {/* Header */}
      <div className="mt-6 mb-10 max-w-3xl">
        <SectionHeader
          label="Points Strategy"
          title="Canadian Points Transfer Guides"
          subtitle="Understand how to move points between programs, which partners offer the best value, and how to get the most out of every point you earn."
        />
      </div>

      {/* Transfer chain quick-reference */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Transfer Partner Quick Reference</h2>
        <p className="text-gray-600 text-sm mb-5 max-w-2xl">
          Bank point currencies (Amex MR, RBC Avion) can be moved to airline and hotel programs. Once transferred, points can be used to book flights and stays. Transfers are almost always one-way — plan before you move.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transferChains.map(chain => (
            <div key={chain.from} className={`rounded-xl border p-5 ${chain.color}`}>
              <div className="flex items-center justify-between mb-3">
                <Link
                  href={`/points/${chain.fromSlug}`}
                  className="font-bold text-gray-900 hover:text-navy-600 transition-colors text-lg"
                >
                  {chain.from}
                </Link>
                <span className="text-xs font-semibold bg-white text-gray-700 px-2.5 py-1 rounded-full border border-parchment-200">
                  {chain.highlight}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Transfers to:</p>
              <div className="flex flex-wrap gap-1.5">
                {chain.to.map(partner => (
                  <span key={partner} className="text-xs bg-white text-gray-700 border border-parchment-200 px-2 py-0.5 rounded-full">
                    {partner}
                  </span>
                ))}
              </div>
              <Link
                href={`/points/${chain.fromSlug}`}
                className="mt-4 text-xs text-navy-600 font-semibold flex items-center gap-1 hover:text-navy-800 transition-colors"
              >
                Full partner guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Value comparison table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Points Value Comparison</h2>
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment-50 border-b border-parchment-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Program</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Best Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Flexibility</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Partners</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {pointsPrograms.map((prog, i) => {
                  const Icon = typeIcon[prog.type] ?? Star
                  return (
                    <tr key={prog.id} className={i % 2 === 0 ? 'bg-white' : 'bg-parchment-50'}>
                      <td className="py-3.5 px-4">
                        <Link href={`/points/${prog.slug}`} className="font-semibold text-gray-900 hover:text-navy-600 transition-colors">
                          {prog.shortName}
                        </Link>
                        <p className="text-xs text-gray-500">{prog.operator}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${typeColor[prog.type]}`}>
                          <Icon className="w-3 h-3" />
                          {typeLabel[prog.type]}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        ~{prog.cppCents}¢
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-green-700">
                        {prog.cppCentsMax}¢
                      </td>
                      <td className="py-3.5 px-4">
                        <FlexDots rating={prog.flexibilityRating} />
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        {prog.transferPartners.length === 0
                          ? <span className="text-gray-400">None</span>
                          : `${prog.transferPartners.length} partner${prog.transferPartners.length !== 1 ? 's' : ''}`}
                      </td>
                      <td className="py-3.5 px-4">
                        <Link href={`/points/${prog.slug}`} className="text-xs text-navy-600 font-medium hover:text-navy-800 transition-colors whitespace-nowrap">
                          Full guide →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 px-4 py-3 border-t border-parchment-100">
            Values are estimates based on average real-world redemptions. Actual value varies by redemption. Updated July 2024.
          </p>
        </div>
      </section>

      {/* Program cards by type */}
      {[
        { label: 'Bank Currencies', subtitle: 'Earn with credit cards and transfer to airlines or hotels.', programs: bankPrograms },
        { label: 'Airline Programs', subtitle: 'Redeem for flights on specific airlines and their partners.', programs: airlinePrograms },
        { label: 'Hotel Programs', subtitle: 'Earn and redeem at hotel brands worldwide.', programs: hotelPrograms },
        { label: 'Coalition Programs', subtitle: 'Earn across multiple retail, grocery, and bank partners.', programs: otherPrograms },
      ].filter(g => g.programs.length > 0).map(group => (
        <section key={group.label} className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{group.label}</h2>
          <p className="text-sm text-gray-500 mb-5">{group.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {group.programs.map(prog => {
              const Icon = typeIcon[prog.type] ?? Star
              return (
                <Link
                  key={prog.id}
                  href={`/points/${prog.slug}`}
                  className="card-surface p-5 flex flex-col gap-4 group hover:border-navy-200 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[prog.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-navy-600 transition-colors leading-snug">
                        {prog.shortName}
                      </h3>
                      <p className="text-xs text-gray-500">{prog.operator}</p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-gray-600 leading-relaxed">{prog.tagline}</p>

                  {/* Key stats */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-parchment-100 text-center">
                    <div>
                      <p className="text-base font-bold text-gray-900">~{prog.cppCents}¢</p>
                      <p className="text-xs text-gray-500">Avg value</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-green-700">{prog.cppCentsMax}¢</p>
                      <p className="text-xs text-gray-500">Best value</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{prog.transferPartners.length}</p>
                      <p className="text-xs text-gray-500">Partners</p>
                    </div>
                  </div>

                  {/* Transfer partners preview */}
                  {prog.transferPartners.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {prog.transferPartners.slice(0, 4).map(tp => (
                        <span key={tp.slug} className="text-xs bg-parchment-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {tp.name}
                        </span>
                      ))}
                      {prog.transferPartners.length > 4 && (
                        <span className="text-xs text-gray-400">+{prog.transferPartners.length - 4} more</span>
                      )}
                    </div>
                  )}

                  <span className="text-sm text-navy-600 font-medium flex items-center gap-1 mt-auto">
                    Full guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}

      {/* Educational section */}
      <section className="mb-12 bg-parchment-50 rounded-2xl p-7">
        <h2 className="text-xl font-bold text-gray-900 mb-3">How Points Transfers Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">The basics</h3>
            <p>
              Bank point currencies (like Amex Membership Rewards and RBC Avion) act as a hub — you accumulate them with a credit card, then transfer to an airline or hotel program when you have a specific redemption in mind. Once transferred, points typically cannot come back, so only transfer when you're ready to use them.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Transfer ratios explained</h3>
            <p>
              A 1:1 ratio means you receive 1 airline mile for every 1 bank point you send. A 1:1.2 ratio (like Amex MR → Marriott Bonvoy) means you receive more points than you send. A 3:1 ratio (like Bonvoy → airlines) means you receive fewer — and is generally poor value.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">When to transfer</h3>
            <p>
              The best time to transfer is when you have a confirmed flight or hotel redemption ready to book and you've confirmed award availability. Transferring "just in case" risks points sitting in a less flexible program.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Transfer bonuses</h3>
            <p>
              Periodically, programs offer transfer bonuses — e.g., a 20% or 30% bonus when you transfer Amex MR to Aeroplan. These are excellent opportunities to boost your balance. Sign up for our newsletter to be notified when bonuses go live.
            </p>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  )
}
