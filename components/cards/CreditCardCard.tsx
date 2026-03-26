import Link from 'next/link'
import { CheckCircle, Star, ExternalLink } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { cn, formatAnnualFee } from '@/lib/utils'
import type { CreditCard } from '@/types'

interface Props {
  card: CreditCard
  variant?: 'grid' | 'list' | 'featured'
}

const ISSUER_GRADIENT: Record<string, string> = {
  'American Express': 'from-slate-700 to-slate-900',
  'TD':               'from-green-700 to-green-900',
  'Scotiabank':       'from-red-600 to-red-800',
  'RBC':              'from-blue-600 to-blue-800',
  'CIBC':             'from-red-700 to-slate-800',
  'BMO':              'from-blue-700 to-blue-900',
  'Tangerine':        'from-orange-500 to-orange-700',
  'Rogers Bank':      'from-red-500 to-red-700',
}

function CardImage({ card, className }: { card: CreditCard; className: string }) {
  if (card.imageUrl) {
    return (
      <img
        src={card.imageUrl}
        alt={card.name}
        className={cn(className, 'object-contain bg-gray-50 rounded-lg')}
      />
    )
  }
  const gradient = ISSUER_GRADIENT[card.issuer] ?? 'from-navy-600 to-navy-900'
  return (
    <div className={cn(className, 'rounded-lg bg-gradient-to-br flex items-center justify-center', gradient)}>
      <span className="text-white font-bold text-xs tracking-wide opacity-80">
        {card.issuer.split(' ')[0].toUpperCase()}
      </span>
    </div>
  )
}

export default function CreditCardCard({ card, variant = 'grid' }: Props) {
  if (variant === 'list') {
    return (
      <div className="card-surface p-5 flex flex-col sm:flex-row items-start gap-5">
        {/* Card image */}
        <div className="w-24 h-15 flex-shrink-0">
          <CardImage card={card} className="w-24 h-16" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {card.editorsPick && (
              <Badge variant="gold">
                <Star className="w-2.5 h-2.5 mr-1" />Editor's Pick
              </Badge>
            )}
            {card.featured && !card.editorsPick && <Badge variant="navy">Featured</Badge>}
            {!card.foreignTransactionFee && <Badge variant="green">No FX Fee</Badge>}
          </div>
          <h3 className="font-semibold text-gray-900 leading-snug mb-0.5">
            <Link href={`/credit-cards/${card.slug}`} className="hover:text-navy-600 transition-colors">
              {card.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 mb-2">{card.issuer} · {card.network}</p>
          {card.bonusSummary && (
            <p className="text-sm text-gray-700 line-clamp-2">{card.bonusSummary}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">{formatAnnualFee(card.annualFee)}</span>
            </span>
            {card.earnRates[0] && (
              <span className="text-gray-600">
                Up to <span className="font-semibold text-gray-900">
                  {Math.max(...card.earnRates.map(r => r.rate))}{card.earnRates[0].unit === 'percent' ? '%' : 'x'}
                </span> earn
              </span>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
          {card.affiliateLink ? (
            <a
              href={card.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-primary text-sm text-center flex items-center gap-1.5"
            >
              Apply Now <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="btn-primary text-sm text-center opacity-50 cursor-not-allowed select-none">
              Apply Now
            </span>
          )}
          <Link href={`/credit-cards/${card.slug}`} className="btn-secondary text-sm text-center">
            Full Review
          </Link>
        </div>
      </div>
    )
  }

  // Grid / featured variant
  return (
    <div className={cn('card-surface flex flex-col', variant === 'featured' && 'ring-2 ring-navy-200')}>
      {/* Header */}
      <div className="p-5 pb-4 border-b border-parchment-100">
        <div className="flex items-start justify-between gap-3 mb-4">
          <CardImage card={card} className="w-20 h-13" />
          <div className="flex flex-wrap gap-1 justify-end">
            {card.editorsPick && (
              <Badge variant="gold">
                <Star className="w-2.5 h-2.5 mr-1" />Pick
              </Badge>
            )}
            {!card.foreignTransactionFee && (
              <Badge variant="green">No FX Fee</Badge>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-0.5">
          <Link href={`/credit-cards/${card.slug}`} className="hover:text-navy-600 transition-colors">
            {card.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{card.issuer} · {card.network}</p>
      </div>

      {/* Key stats */}
      <div className="p-5 space-y-3 flex-1">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Annual Fee</p>
            <p className="font-semibold text-sm text-gray-900">{formatAnnualFee(card.annualFee)}</p>
            {card.annualFeeWaived && (
              <p className="text-xs text-green-600 mt-0.5">{card.annualFeeWaived}</p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Best Earn</p>
            <p className="font-semibold text-sm text-gray-900">
              {Math.max(...card.earnRates.map(r => r.rate))}{card.earnRates[0].unit === 'percent' ? '%' : 'x'}
            </p>
          </div>
        </div>

        {card.welcomeBonus && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Welcome Bonus</p>
            <p className="text-sm text-gray-800 leading-snug">{card.bonusSummary ?? card.welcomeBonus}</p>
          </div>
        )}

        {card.bestFor.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">Best For</p>
            <div className="flex flex-wrap gap-1.5">
              {card.bestFor.slice(0, 2).map(b => (
                <span key={b} className="flex items-center gap-1 text-xs text-navy-700 bg-navy-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-2.5 h-2.5" />{b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="p-5 pt-4 border-t border-parchment-100 flex flex-col gap-2">
        {card.affiliateLink ? (
          <a
            href={card.affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary text-sm text-center"
          >
            Apply Now
          </a>
        ) : (
          <span className="btn-primary text-sm text-center opacity-50 cursor-not-allowed select-none">
            Apply Now
          </span>
        )}
        <Link href={`/credit-cards/${card.slug}`} className="btn-secondary text-sm text-center">
          Full Review
        </Link>
      </div>
    </div>
  )
}
