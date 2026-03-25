'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { LayoutGrid, List } from 'lucide-react'
import CreditCardCard from '@/components/cards/CreditCardCard'
import SectionHeader from '@/components/ui/SectionHeader'
import type { CreditCard, CardCategory } from '@/types'
import { categoryLabel } from '@/lib/utils'

const filterCategories: { value: CardCategory | 'all'; label: string }[] = [
  { value: 'all',       label: 'All Cards' },
  { value: 'travel',    label: 'Travel' },
  { value: 'cash-back', label: 'Cash Back' },
  { value: 'no-fee',    label: 'No Annual Fee' },
  { value: 'points',    label: 'Points' },
  { value: 'business',  label: 'Business' },
  { value: 'student',   label: 'Student' },
  { value: 'premium',   label: 'Premium' },
]

const sortOptions = [
  { value: 'featured',  label: 'Featured' },
  { value: 'fee-low',   label: 'Annual Fee: Low → High' },
  { value: 'fee-high',  label: 'Annual Fee: High → Low' },
  { value: 'name',      label: 'Name: A → Z' },
]

export default function CardsClient({ cards }: { cards: CreditCard[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy]                 = useState('featured')
  const [viewMode, setViewMode]             = useState<'grid' | 'list'>('list')

  const filtered = useMemo(() => {
    let result = [...cards]
    if (activeCategory !== 'all') {
      result = result.filter(c => c.categories.includes(activeCategory as CardCategory))
    }
    switch (sortBy) {
      case 'fee-low':  result.sort((a, b) => a.annualFee - b.annualFee); break
      case 'fee-high': result.sort((a, b) => b.annualFee - a.annualFee); break
      case 'name':     result.sort((a, b) => a.name.localeCompare(b.name)); break
      default:         result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break
    }
    return result
  }, [activeCategory, sortBy, cards])

  return (
    <>
      <div className="mt-6 mb-8">
        <SectionHeader
          label="Compare & Apply"
          title="Best Canadian Credit Cards"
          subtitle="Compare Canada's top credit cards side by side. Filter by category, annual fee, and rewards type to find your perfect card."
        />
      </div>

      <div className="flex flex-col gap-6">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1 scrollbar-hide">
            {filterCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors flex-shrink-0 ${
                  activeCategory === cat.value
                    ? 'bg-navy-600 text-white border-navy-600'
                    : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="select-field text-sm py-1.5 w-44"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="flex border border-parchment-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-navy-50 text-navy-700' : 'bg-white text-gray-500'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-navy-50 text-navy-700' : 'bg-white text-gray-500'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Result count + compare CTA */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <strong>{filtered.length}</strong> card{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && (
              <> in <strong>{categoryLabel(activeCategory)}</strong></>
            )}
          </p>
          <Link href="/compare" className="text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors">
            Compare cards side-by-side →
          </Link>
        </div>

        {/* Cards */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filtered.map(card => (
              <CreditCardCard key={card.id} card={card} variant="list" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(card => (
              <CreditCardCard key={card.id} card={card} variant="grid" />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-semibold mb-2">No cards found</p>
            <p className="text-sm">Try selecting a different category filter.</p>
          </div>
        )}
      </div>
    </>
  )
}
