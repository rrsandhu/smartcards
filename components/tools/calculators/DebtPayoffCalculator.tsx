'use client'

import { useState, useMemo } from 'react'
import { Plus, Trash2, Info, TrendingDown, Trophy } from 'lucide-react'
import { formatCAD } from '@/lib/utils'

interface Debt {
  id: number
  name: string
  balance: number
  apr: number
  minPayment: number
}

interface SimResult {
  months: number
  totalInterest: number
  payoffOrder: { name: string; month: number }[]
}

let nextId = 4

// Simulate payoff for a given ordering strategy
function simulate(debts: Debt[], extraPayment: number, strategy: 'avalanche' | 'snowball'): SimResult {
  if (debts.length === 0 || debts.every(d => d.balance <= 0)) return { months: 0, totalInterest: 0, payoffOrder: [] }

  const sorted = [...debts].filter(d => d.balance > 0).sort((a, b) =>
    strategy === 'avalanche' ? b.apr - a.apr : a.balance - b.balance
  )

  // Working copies
  let balances: Record<number, number> = {}
  sorted.forEach(d => { balances[d.id] = d.balance })

  const payoffOrder: { name: string; month: number }[] = []
  let totalInterest = 0
  let months = 0
  const MAX_MONTHS = 600

  while (Object.values(balances).some(b => b > 0.01) && months < MAX_MONTHS) {
    months++
    let extra = extraPayment

    // Apply interest to all active debts
    sorted.forEach(d => {
      if (balances[d.id] > 0) {
        const interest = balances[d.id] * (d.apr / 100 / 12)
        totalInterest += interest
        balances[d.id] += interest
      }
    })

    // Pay minimums on all
    sorted.forEach(d => {
      if (balances[d.id] > 0) {
        const pay = Math.min(d.minPayment, balances[d.id])
        balances[d.id] -= pay
      }
    })

    // Redirect freed minimums + extra to focus debt (first in sorted order still active)
    // Also: when a debt is paid off, its minimum rolls to next
    for (const d of sorted) {
      if (balances[d.id] > 0) {
        const pay = Math.min(extra, balances[d.id])
        balances[d.id] -= pay
        extra -= pay
        break
      }
    }

    // Check for newly paid off debts
    sorted.forEach(d => {
      if (balances[d.id] <= 0.01 && !payoffOrder.find(p => p.name === d.name)) {
        balances[d.id] = 0
        payoffOrder.push({ name: d.name, month: months })
        // Next month, roll that debt's minimum into extra
        extraPayment += d.minPayment
      }
    })
  }

  return { months, totalInterest, payoffOrder }
}

const defaultDebts: Debt[] = [
  { id: 1, name: 'TD Visa',         balance: 4500,  apr: 19.99, minPayment: 90 },
  { id: 2, name: 'Car Loan',        balance: 12000, apr: 6.99,  minPayment: 220 },
  { id: 3, name: 'Student Loan',    balance: 8000,  apr: 8.5,   minPayment: 150 },
]

export default function DebtPayoffCalculator() {
  const [debts,        setDebts]        = useState<Debt[]>(defaultDebts)
  const [extraPayment, setExtraPayment] = useState(200)

  function addDebt() {
    setDebts(prev => [...prev, { id: nextId++, name: 'New Debt', balance: 2000, apr: 19.99, minPayment: 40 }])
  }

  function removeDebt(id: number) {
    setDebts(prev => prev.filter(d => d.id !== id))
  }

  function updateDebt(id: number, field: keyof Debt, value: string | number) {
    setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d))
  }

  const totalBalance    = debts.reduce((s, d) => s + d.balance, 0)
  const totalMinPayment = debts.reduce((s, d) => s + d.minPayment, 0)

  const avalanche = useMemo(() => simulate(debts, extraPayment, 'avalanche'), [debts, extraPayment])
  const snowball  = useMemo(() => simulate(debts, extraPayment, 'snowball'),  [debts, extraPayment])
  const noExtra   = useMemo(() => simulate(debts, 0, 'avalanche'),            [debts])

  const interestSavedByExtra = noExtra.totalInterest - avalanche.totalInterest
  const monthsSavedByExtra   = noExtra.months - avalanche.months

  const avalancheWins = avalanche.totalInterest <= snowball.totalInterest
  const diff = Math.abs(avalanche.totalInterest - snowball.totalInterest)

  function monthsToLabel(m: number) {
    if (m >= 600) return 'Never (increase payment)'
    const yrs  = Math.floor(m / 12)
    const mos  = m % 12
    if (yrs === 0) return `${mos} month${mos !== 1 ? 's' : ''}`
    if (mos === 0) return `${yrs} year${yrs !== 1 ? 's' : ''}`
    return `${yrs}y ${mos}m`
  }

  return (
    <div className="space-y-8">
      {/* Debt list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Your Debts</h3>
          <button onClick={addDebt} className="flex items-center gap-1.5 text-sm text-navy-600 font-medium hover:text-navy-800 transition-colors">
            <Plus className="w-4 h-4" /> Add Debt
          </button>
        </div>

        <div className="space-y-3">
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 px-2">
            <span className="col-span-3">Name</span>
            <span className="col-span-3">Balance</span>
            <span className="col-span-2">APR %</span>
            <span className="col-span-3">Min. Payment</span>
            <span className="col-span-1"></span>
          </div>

          {debts.map(debt => (
            <div key={debt.id} className="card-surface p-3 grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                value={debt.name}
                onChange={e => updateDebt(debt.id, 'name', e.target.value)}
                className="col-span-12 sm:col-span-3 input-field text-sm py-1.5"
                placeholder="Debt name"
              />
              <div className="col-span-6 sm:col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number" min={1} step={100}
                  value={debt.balance}
                  onChange={e => updateDebt(debt.id, 'balance', Number(e.target.value))}
                  className="input-field pl-6 text-sm py-1.5"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 relative">
                <input
                  type="number" min={0} max={30} step={0.01}
                  value={debt.apr}
                  onChange={e => updateDebt(debt.id, 'apr', Number(e.target.value))}
                  className="input-field pr-6 text-sm py-1.5"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
              </div>
              <div className="col-span-2 sm:col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number" min={1} step={5}
                  value={debt.minPayment}
                  onChange={e => updateDebt(debt.id, 'minPayment', Number(e.target.value))}
                  className="input-field pl-6 text-sm py-1.5"
                />
              </div>
              <button onClick={() => removeDebt(debt.id)} className="col-span-1 flex justify-center p-1 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm bg-parchment-50 rounded-xl px-4 py-3">
          <span className="text-gray-600">Total balance: <strong className="text-gray-900">{formatCAD(totalBalance)}</strong></span>
          <span className="text-gray-600">Min. payments: <strong className="text-gray-900">{formatCAD(totalMinPayment, 0)}/mo</strong></span>
        </div>
      </div>

      {/* Extra payment */}
      <div className="max-w-sm">
        <label className="form-label">Extra Monthly Payment</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
          <input type="number" min={0} max={10000} step={25}
            value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))}
            className="input-field pl-8" />
        </div>
        <input type="range" min={0} max={2000} step={25} value={extraPayment}
          onChange={e => setExtraPayment(Number(e.target.value))}
          className="w-full mt-2 accent-navy-600" />
        <p className="text-xs text-gray-500 mt-1">Total monthly payment: <strong>{formatCAD(totalMinPayment + extraPayment, 0)}</strong></p>
      </div>

      {/* Results */}
      {debts.length > 0 && (
        <div className="space-y-5">
          {/* Strategy comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Avalanche */}
            <div className={`card-surface p-5 ${avalancheWins ? 'ring-2 ring-green-300' : ''}`}>
              {avalancheWins && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-3 w-fit">
                  <Trophy className="w-3 h-3" />Saves most interest
                </div>
              )}
              <h3 className="font-bold text-gray-900 mb-1">Avalanche Method</h3>
              <p className="text-xs text-gray-500 mb-3">Pay highest interest rate first</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Debt-free in</span>
                  <span className="font-bold text-gray-900">{monthsToLabel(avalanche.months)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total interest paid</span>
                  <span className="font-bold text-green-700">{formatCAD(avalanche.totalInterest, 0)}</span>
                </div>
              </div>
              {avalanche.payoffOrder.length > 0 && (
                <div className="mt-3 pt-3 border-t border-parchment-100">
                  <p className="text-xs text-gray-500 mb-1.5">Payoff order:</p>
                  {avalanche.payoffOrder.map((p, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-600 py-0.5">
                      <span>{p.name}</span>
                      <span className="text-gray-400">month {p.month}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Snowball */}
            <div className={`card-surface p-5 ${!avalancheWins ? 'ring-2 ring-green-300' : ''}`}>
              {!avalancheWins && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-3 w-fit">
                  <Trophy className="w-3 h-3" />Saves most interest
                </div>
              )}
              <h3 className="font-bold text-gray-900 mb-1">Snowball Method</h3>
              <p className="text-xs text-gray-500 mb-3">Pay lowest balance first</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Debt-free in</span>
                  <span className="font-bold text-gray-900">{monthsToLabel(snowball.months)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total interest paid</span>
                  <span className="font-bold text-gray-900">{formatCAD(snowball.totalInterest, 0)}</span>
                </div>
              </div>
              {snowball.payoffOrder.length > 0 && (
                <div className="mt-3 pt-3 border-t border-parchment-100">
                  <p className="text-xs text-gray-500 mb-1.5">Payoff order:</p>
                  {snowball.payoffOrder.map((p, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-600 py-0.5">
                      <span>{p.name}</span>
                      <span className="text-gray-400">month {p.month}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Method comparison summary */}
          {diff > 1 && (
            <div className="bg-navy-50 border border-navy-100 rounded-xl p-4 text-sm">
              <p className="font-semibold text-navy-800 mb-1">
                {avalancheWins ? 'Avalanche' : 'Snowball'} saves {formatCAD(diff, 0)} more in interest
              </p>
              <p className="text-gray-600 text-xs">
                {avalancheWins
                  ? 'Mathematically, targeting the highest interest rate first minimizes total interest cost. If you need motivation from quick wins, snowball may be easier to stick to.'
                  : 'In your specific case, snowball outperforms avalanche due to the balance/rate combination. Paying off smaller debts frees up minimum payments faster.'}
              </p>
            </div>
          )}

          {/* Extra payment impact */}
          {extraPayment > 0 && (
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Impact of Your Extra {formatCAD(extraPayment, 0)}/month</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Interest saved</p>
                  <p className="font-bold text-green-700 text-lg">{formatCAD(interestSavedByExtra, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Months sooner</p>
                  <p className="font-bold text-green-700 text-lg">{monthsSavedByExtra > 0 ? monthsSavedByExtra : 0}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-gray-500 p-3 bg-parchment-50 rounded-xl">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>Calculations assume fixed interest rates and consistent monthly payments. In practice, your minimum payments may decrease as balances drop — continuing at the same payment amount accelerates payoff further.</span>
          </div>
        </div>
      )}
    </div>
  )
}
