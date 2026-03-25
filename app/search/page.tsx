import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, CreditCard, FileText, Calculator } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import { search } from '@/lib/search'
import type { SearchResultType } from '@/types'

interface Props {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return {
    title: searchParams.q ? `Search results for "${searchParams.q}"` : 'Search',
    description: 'Search PointsNorth for credit cards, articles, and financial tools.',
  }
}

const typeIcon: Record<SearchResultType, React.ComponentType<{ className?: string }>> = {
  card:    CreditCard,
  article: FileText,
  tool:    Calculator,
  offer:   CreditCard,
}

const typeLabel: Record<SearchResultType, string> = {
  card:    'Credit Card',
  article: 'Article',
  tool:    'Tool',
  offer:   'Offer',
}

const typeColor: Record<SearchResultType, string> = {
  card:    'bg-navy-100 text-navy-700',
  article: 'bg-gold-100 text-gold-700',
  tool:    'bg-green-100 text-green-700',
  offer:   'bg-blue-100 text-blue-700',
}

const popularSearches = ['Best welcome bonus', 'No annual fee', 'Aeroplan', 'Cash back', 'Mortgage calculator', 'No FX fee']

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q ?? ''
  const results = search(query)

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Search' }]} />

      <div className="mt-6 mb-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {query ? `Search results for "${query}"` : 'Search PointsNorth'}
        </h1>

        {/* Search form */}
        <form method="get" action="/search" className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search cards, articles, tools..."
              className="input-field pl-10"
              autoFocus={!query}
            />
          </div>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      {/* No query — show popular searches */}
      {!query && (
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map(s => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="px-4 py-2 bg-white border border-parchment-200 rounded-xl text-sm text-gray-700 hover:border-navy-300 hover:text-navy-700 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && (
        <div>
          <p className="text-sm text-gray-600 mb-5">
            {results.length === 0
              ? `No results found for "${query}"`
              : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>

          {results.length > 0 && (
            <div className="space-y-3">
              {results.map(result => {
                const Icon = typeIcon[result.type]
                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.url}
                    className="card-surface p-5 flex items-start gap-4 hover:border-navy-200 transition-colors block"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor[result.type]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColor[result.type]}`}>
                          {typeLabel[result.type]}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-navy-600 transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{result.excerpt}</p>
                    </div>
                    <span className="text-sm text-navy-600 font-medium flex-shrink-0 hidden sm:block">View →</span>
                  </Link>
                )
              })}
            </div>
          )}

          {results.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-sm text-gray-500 mb-5">
                Try a different search term or browse our categories below.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/credit-cards" className="btn-secondary text-sm">Browse Cards</Link>
                <Link href="/blog" className="btn-secondary text-sm">Read Articles</Link>
                <Link href="/tools" className="btn-secondary text-sm">Use Tools</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
