'use client'

import { useState, useMemo } from 'react'
import { formatCAD } from '@/lib/utils'

interface SpendCategory {
  label: string
  monthly: number
}

interface CardProfile {
  id: string
  name: string
  issuer: string
  annualFee: number
  rates: { category: string; rate: number; unit: 'percent' | 'points'; cpp?: number }[]
  defaultCpp: number // cents per point
}

const cardProfiles: CardProfile[] = [
  {
    id: 'amex-cobalt',
    name: 'Amex Cobalt',
    issuer: 'American Express',
    annualFee: 155.88,
    defaultCpp: 2.0,
    rates: [
      { category: 'Dining & food delivery', rate: 5, unit: 'points', cpp: 2.0 },
      { category: 'Groceries', rate: 5, unit: 'points', cpp: 2.0 },
      { category: 'Gas', rate: 1, unit: 'points', cpp: 2.0 },
      { category: 'Travel', rate: 2, unit: 'points', cpp: 2.0 },
      { category: 'Other', rate: 1, unit: 'points', cpp: 2.0 },
    ],
  },
  {
    id: 'tangerine-money-back',
    name: 'Tangerine Money-Back',
    issuer: 'Tangerine',
    annualFee: 0,
    defaultCpp: 1.0,
    rates: [
      { category: 'Dining & food delivery', rate: 2, unit: 'percent' },
      { category: 'Groceries', rate: 2, unit: 'percent' },
      { category: 'Gas', rate: 0.5, unit: 'percent' },
      { category: 'Travel', rate: 0.5, unit: 'percent' },
      { category: 'Other', rate: 0.5, unit: 'percent' },
    ],
  },
  {
    id: 'scotiabank-passport-vi',
    name: 'Scotia Passport VI',
    issuer: 'Scotiabank',
    annualFee: 150,
    defaultCpp: 1.0,
    rates: [
      { category: 'Dining & food delivery', rate: 2, unit: 'points', cpp: 1.0 },
      { category: 'Groceries', rate: 3, unit: 'points', cpp: 1.0 },
      { category: 'Gas', rate: 1, unit: 'points', cpp: 1.0 },
      { category: 'Travel', rate: 1, unit: 'points', cpp: 1.0 },
      { category: 'Other', rate: 1, unit: 'points', cpp: 1.0 },
    ],
  },
  {
    id: 'rogers-world-elite',
    name: 'Rogers World Elite',
    issuer: 'Rogers Bank',
    annualFee: 0,
    defaultCpp: 1.0,
    rates: [
      { category: 'Dining & food delivery', rate: 1.5, unit: 'percent' },
      { category: 'Groceries', rate: 1.5, unit: 'percent' },
      { category: 'Gas', rate: 1.5, unit: 'percent' },
      { category: 'Travel', rate: 1.5, unit: 'percent' },
      { category: 'Other', rate: 1.5, unit: 'percent' },
    ],
  },
]

const defaultSpend: SpendCategory[] = [
  { label: 'Dining & food delivery', monthly: 400 },
  { label: 'Groceries', monthly: 600 },
  { label: 'Gas', monthly: 200 },
  { label: 'Travel', monthly: 200 },
  { label: 'Other', monthly: 600 },
]

export default function RewardsCalculator() {
  const [spend, setSpend] = useState<SpendCategory[]>(defaultSpend)
  const [selectedCards, setSelectedCards] = useState<string[]>(['amex-cobalt', 'tangerine-money-back'])

  function updateSpend(index: number, value: number) {
    setSpend(prev => prev.map((s, i) => i === index ? { ...s, monthly: value } : s))
  }

  function toggleCard(id: string) {
    setSelectedCards(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const results = useMemo(() => {
    return cardProfiles
      .filter(c => selectedCards.includes(c.id))
      .map(card => {
        let annualValue = 0
        const breakdown = spend.map(s => {
          const rateObj = card.rates.find(r => r.category === s.label) ?? card.rates.find(r => r.category === 'Other')!
          let monthlyValue = 0
          if (rateObj.unit === 'percent') {
            monthlyValue = s.monthly * (rateObj.rate / 100)
          } else {
            const cpp = rateObj.cpp ?? card.defaultCpp
            monthlyValue = s.monthly * rateObj.rate * (cpp / 100)
          }
          annualValue += monthlyValue * 12
          return { category: s.label, monthlyValue, rate: rateObj.rate, unit: rateObj.unit }
        })
        const netAnnual = annualValue - card.annualFee
        return { card, annualValue, netAnnual, breakdown }
      })
      .sort((a, b) => b.netAnnual - a.netAnnual)
  }, [spend, selectedCards])

  const totalMonthlySpend = spend.reduce((sum, s) => sum + s.monthly, 0)

  return (
    <div className="space-y-8">
      {/* Spend input */}
      <div className="card-surface p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Your Monthly Spending</h3>
        <p className="text-sm text-gray-500 mb-5">
          Enter your typical monthly spend in each category.
        </p>
        <div className="space-y-4">
          {spend.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              <label className="w-44 text-sm text-gray-700 flex-shrink-0">{s.label}</label>
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  max={10000}
                  step={50}
                  value={s.monthly}
                  onChange={e => updateSpend(i, Number(e.target.value))}
                  className="input-field pl-8"
                />
              </div>
              <input
                type="range"
                min={0}
                max={3000}
                step={50}
                value={s.monthly}
                onChange={e => updateSpend(i, Number(e.target.value))}
                className="w-32 accent-navy-600 hidden sm:block"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-parchment-100 flex justify-between text-sm">
          <span className="text-gray-600">Total monthly spend</span>
          <span className="font-semibold text-gray-900">{formatCAD(totalMonthlySpend)}</span>
        </div>
      </div>

      {/* Card selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Compare Cards</h3>
        <div className="flex flex-wrap gap-2">
          {cardProfiles.map(c => (
            <button
              key={c.id}
              onClick={() => toggleCard(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCards.includes(c.id)
                  ? 'bg-navy-600 text-white border-navy-600'
                  : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Annual Rewards Estimate</h3>
          {results.map(({ card, annualValue, netAnnual, breakdown }, idx) => (
            <div key={card.id} className={`card-surface p-5 ${idx === 0 ? 'ring-2 ring-navy-200' : ''}`}>
              {idx === 0 && (
                <span className="text-xs font-semibold text-navy-700 bg-navy-100 px-2 py-0.5 rounded-full mb-3 inline-block">
                  Best value for your spend
                </span>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{card.name}</h4>
                  <p className="text-xs text-gray-500">{card.issuer}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{formatCAD(netAnnual, 0)}</p>
                  <p className="text-xs text-gray-500">net annual value</p>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="space-y-2 mb-4">
                {breakdown.map(b => (
                  <div key={b.category} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {b.category}{' '}
                      <span className="text-gray-400">
                        ({b.rate}{b.unit === 'percent' ? '%' : 'x'})
                      </span>
                    </span>
                    <span className="text-gray-900">{formatCAD(b.monthlyValue * 12, 0)}/yr</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-parchment-100 grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <p className="text-gray-500">Gross rewards</p>
                  <p className="font-semibold text-gray-900">{formatCAD(annualValue, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Annual fee</p>
                  <p className="font-semibold text-gray-900">−{formatCAD(card.annualFee, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Net value</p>
                  <p className={`font-semibold ${netAnnual >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCAD(netAnnual, 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500">
            * Estimates based on average redemption values. Actual rewards may vary. Points values: Amex MR ~2¢/pt, Scene+ ~1¢/pt.
          </p>
        </div>
      )}
    </div>
  )
}
