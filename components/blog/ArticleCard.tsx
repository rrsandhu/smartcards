import Link from 'next/link'
import { Star } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate, categoryLabel } from '@/lib/utils'
import type { Article } from '@/types'

interface Props {
  article: Article
  variant?: 'default' | 'compact' | 'featured'
  /** First card on the page — skip lazy load for LCP */
  priority?: boolean
}

const categoryVariant: Record<string, 'navy' | 'gold' | 'green' | 'gray' | 'blue'> = {
  'points-deals':      'gold',
  'credit-card-deals': 'navy',
  'mortgage-news':     'blue',
  guides:              'green',
  news:                'gray',
}

export default function ArticleCard({ article, variant = 'default', priority = false }: Props) {
  const loadAttr = priority ? 'eager' : 'lazy'

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${article.slug}`} className="flex items-start gap-3 group">
        <div className="w-16 h-12 bg-parchment-200 rounded-lg flex-shrink-0 overflow-hidden">
          {article.heroImageUrl ? (
            <img
              src={article.heroImageUrl}
              alt={article.heroImageAlt ?? article.title}
              className="w-full h-full object-cover"
              loading={loadAttr}
              decoding="async"
              width={64}
              height={48}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
              <span className="text-navy-600 font-bold text-xs">SC</span>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-navy-600 transition-colors leading-snug line-clamp-2 mb-1">
            {article.title}
          </h4>
          <p className="text-xs text-gray-500">{formatDate(article.publishDate)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="card-surface overflow-hidden group flex flex-col h-full">
        {/* Hero image */}
        <Link href={`/blog/${article.slug}`} className="block h-48 sm:h-52 bg-parchment-200 relative overflow-hidden flex-shrink-0">
          {article.heroImageUrl ? (
            <img
              src={article.heroImageUrl}
              alt={article.heroImageAlt ?? article.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              loading={loadAttr}
              decoding="async"
              width={600}
              height={400}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy-600 to-navy-900 flex items-center justify-center">
              <span className="text-white font-bold text-2xl opacity-20">SC</span>
            </div>
          )}
          {article.editorsPick && (
            <span className="absolute top-3 left-3 flex items-center gap-1 bg-gold-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              <Star className="w-3 h-3" />Editor's Pick
            </span>
          )}
        </Link>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={categoryVariant[article.category] ?? 'gray'}>
              {categoryLabel(article.category)}
            </Badge>
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-2 group-hover:text-navy-600 transition-colors line-clamp-2">
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-parchment-100">
            <div>
              <p className="text-xs font-medium text-gray-900">{article.author.name}</p>
              <p className="text-xs text-gray-500">{formatDate(article.publishDate)}</p>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors min-h-[44px] flex items-center"
              aria-label={`Read: ${article.title}`}
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default card
  return (
    <div className="card-surface p-5 flex flex-col group h-full">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={categoryVariant[article.category] ?? 'gray'}>
          {categoryLabel(article.category)}
        </Badge>
        {article.editorsPick && (
          <Badge variant="gold">
            <Star className="w-2.5 h-2.5 mr-1" />Pick
          </Badge>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 leading-snug group-hover:text-navy-600 transition-colors">
        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3 flex-1 mb-4">{article.excerpt}</p>
      <div className="flex items-center justify-between pt-3 border-t border-parchment-100">
        <div>
          <p className="text-xs font-medium text-gray-800">{article.author.name}</p>
          <p className="text-xs text-gray-500">{formatDate(article.publishDate)}</p>
        </div>
        <Link
          href={`/blog/${article.slug}`}
          className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors min-h-[44px] flex items-center"
          aria-label={`Read: ${article.title}`}
        >
          Read →
        </Link>
      </div>
    </div>
  )
}
