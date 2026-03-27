'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, X, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import CardImage from '@/components/cards/CardImage'
import { formatAnnualFee, formatCAD } from '@/lib/utils'
import type { CreditCard } from '@/types'

const MAX_COMPARE = 3

type Field = { key: string; label: string }

const compareFields: Field[] = [
  { key: 'network',              label: 'Network' },
  { key: 'annualFee',            label: 'Annual Fee' },
  { key: 'rewardsType',          label: 'Rewards Type' },
  { key: 'pointsProgram',        label: 'Points Program' },
  { key: 'earnRateSummary',      label: 'Best Earn Rate' },
  { key: 'welcomeBonus',         label: 'Welcome Bonus' },
  { key: 'foreignTransactionFee',label: 'Foreign Transaction Fee' },
  { key: 'loungeAccess',         label: 'Airport Lounge Access' },
  { key: 'creditScoreMin',       label: 'Min. Credit Score' },
  { key: 'travelMedical',        label: 'Travel Medical Insurance' },
  { key: 'rentalCar',            label: 'Rental Car Insurance' },
  { key: 'purchaseProtection',   label: 'Purchase Protection' },
  { key: 'extendedWarranty',     label: 'Extended Warranty' },
]

function creditScoreLabel(score?: string): string {
  if (!score) return '—'
  const map: Record<string, string> = { excellent: 'Excellent (760+)', good: 'Good (690–759)', fair: 'Fair (630–689)', poor: 'Poor (<630)' }
  return map[score] ?? score
}

function getFieldValue(card: CreditCard, field: string): React.ReactNode {
  switch (field) {
    case 'annualFee':
      return (
        <span>
          {formatAnnualFee(card.annualFee)}
          {card.annualFeeWaived && <span className="block text-xs text-green-600">{card.annualFeeWaived}</span>}
        </span>
      )
    case 'earnRateSummary': {
      if (card.earnRates.length === 0) return <span className="text-gray-400">—</span>
      const max = Math.max(...card.earnRates.map(r => r.rate))
      const topRate = card.earnRates.find(r => r.rate === max)
      return (
        <span>
          {max}{topRate?.unit === 'percent' ? '%' : 'x'}
          {topRate && <span className="block text-xs text-gray-500">on {topRate.category}</span>}
        </span>
      )
    }
    case 'foreignTransactionFee':
      return card.foreignTransactionFee
        ? <span className="flex items-center gap-1 text-red-600"><XCircle className="w-3.5 h-3.5" /> 2.5%</span>
        : <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> None</span>
    case 'loungeAccess':
      return card.loungeAccess
        ? <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> {card.loungeAccess}</span>
        : <span className="text-gray-400">None</span>
    case 'creditScoreMin':
      return <span>{creditScoreLabel(card.creditScoreMin)}</span>
    case 'travelMedical':
      return card.insurance.travelMedical
        ? <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Included</span>
        : <span className="text-gray-400">Not included</span>
    case 'rentalCar':
      return card.insurance.rentalCar
        ? <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Included</span>
        : <span className="text-gray-400">Not included</span>
    case 'purchaseProtection':
      return card.insurance.purchaseProtection
        ? <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Included</span>
        : <span className="text-gray-400">Not included</span>
    case 'extendedWarranty':
      return card.insurance.extendedWarranty
        ? <span className="flex items-center gap-1 text-green-700"><CheckCircle className="w-3.5 h-3.5" /> Included</span>
        : <span className="text-gray-400">Not included</span>
    case 'rewardsType':
      return card.rewardsType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    case 'pointsProgram':
      return card.pointsProgram ?? <span className="text-gray-400">—</span>
    case 'welcomeBonus':
      return card.bonusSummary ?? card.welcomeBonus ?? <span className="text-gray-400">None</span>
    default:
      return <span className="text-gray-400">—</span>
  }
}

export default function CompareClient({ cards }: { cards: CreditCard[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [pickerOpen, setPickerOpen]   = useState<number | null>(null)
  const [search, setSearch]           = useState('')

  function addCard(id: string) {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev
      if (pickerOpen !== null) {
        const next = [...prev]
        next[pickerOpen] = id
        setPickerOpen(null)
        return next
      }
      if (prev.length < MAX_COMPARE) return [...prev, id]
      return prev
    })
    setPickerOpen(null)
    setSearch('')
  }

  function removeCard(id: string) {
    setSelectedIds(prev => prev.filter(i => i !== id))
  }

  const selectedCards   = selectedIds.map(id => cards.find(c => c.id === id)).filter(Boolean) as CreditCard[]
  const availableToAdd  = cards.filter(c => !selectedIds.includes(c.id))
  const filteredPicker  = search
    ? availableToAdd.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase()))
    : availableToAdd

  const slots = selectedCards.length < MAX_COMPARE ? selectedCards.length : MAX_COMPARE

  return (
    <div>
      <DisclaimerBlock />

      {/* Card slot selectors */}
      <div
        className="mt-6 grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(slots + (selectedCards.length < MAX_COMPARE ? 1 : 0), MAX_COMPARE)}, 1fr)` }}
      >
        {selectedCards.map((card, idx) => (
          <div key={card.id} className="card-surface p-4 text-center relative">
            <button
              onClick={() => removeCard(card.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="w-20 h-14 mx-auto mb-3">
              <CardImage card={card} className="w-20 h-14" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-0.5">{card.name}</h3>
            <p className="text-xs text-gray-500">{card.issuer}</p>
          </div>
        ))}

        {selectedCards.length < MAX_COMPARE && (
          <div className="relative">
            <button
              onClick={() => setPickerOpen(selectedCards.length)}
              className="w-full h-full min-h-[120px] border-2 border-dashed border-parchment-300 rounded-xl hover:border-navy-300 hover:bg-navy-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add a Card</span>
            </button>
            {pickerOpen === selectedCards.length && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-parchment-200 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto">
                <div className="p-2 border-b border-parchment-100 sticky top-0 bg-white">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search cards…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-parchment-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy-400"
                  />
                </div>
                {filteredPicker.slice(0, 40).map(c => (
                  <button
                    key={c.id}
                    onClick={() => addCard(c.id)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-parchment-50 transition-colors border-b border-parchment-50 last:border-0"
                  >
                    <span className="font-medium text-gray-900">{c.name}</span>
                    <span className="text-gray-400 text-xs ml-2">{formatAnnualFee(c.annualFee)}</span>
                  </button>
                ))}
                {filteredPicker.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">No cards found</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comparison table */}
      {selectedCards.length >= 2 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {compareFields.map((field, fi) => (
                <tr key={field.key} className={fi % 2 === 0 ? 'bg-parchment-50' : 'bg-white'}>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-600 w-40 sm:w-52 align-top whitespace-nowrap">
                    {field.label}
                  </td>
                  {selectedCards.map(card => (
                    <td key={card.id} className="py-3 px-4 text-sm text-gray-900 align-top">
                      {getFieldValue(card, field.key)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Apply row */}
              <tr className="bg-white border-t-2 border-parchment-200">
                <td className="py-4 px-4" />
                {selectedCards.map(card => (
                  <td key={card.id} className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      {(card.affiliateLink || card.applyUrl) ? (
                        <a
                          href={(card.affiliateLink ?? card.applyUrl)!}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="btn-primary text-sm text-center flex items-center justify-center gap-1"
                        >
                          Apply <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="btn-primary text-sm text-center opacity-50 cursor-not-allowed select-none">Apply</span>
                      )}
                      <Link href={`/credit-cards/${card.slug}`} className="btn-secondary text-sm text-center">
                        Full Review
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedCards.length < 2 && (
        <div className="mt-8 text-center text-gray-500 py-12">
          <p className="text-lg font-semibold mb-2">Add at least 2 cards to compare</p>
          <p className="text-sm">Use the selector above to pick cards side by side.</p>
        </div>
      )}
    </div>
  )
}
