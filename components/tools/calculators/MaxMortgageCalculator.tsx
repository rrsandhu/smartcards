'use client'

import { useState, useMemo } from 'react'
import { Info, TrendingUp } from 'lucide-react'
import { calculateMonthlyPayment, formatCAD, formatNumber } from '@/lib/utils'

const GDS_LIMIT = 0.32
const TDS_LIMIT = 0.44

function findMaxMortgageSimple(
  grossMonthlyIncome: number,
  monthlyOtherDebts: number,
  stressTestRate: number,
  amortizationYears: number,
  monthlyPropTax: number,
  monthlyHeating: number
): number {
  let lo = 0, hi = 3_000_000
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2
    const payment = calculateMonthlyPayment(mid, stressTestRate, amortizationYears)
    const gds = (payment + monthlyPropTax + monthlyHeating) / grossMonthlyIncome
    const tds = (payment + monthlyPropTax + monthlyHeating + monthlyOtherDebts) / grossMonthlyIncome
    if (gds <= GDS_LIMIT && tds <= TDS_LIMIT) lo = mid
    else hi = mid
  }
  return Math.floor(lo / 1000) * 1000
}

// Typical Canadian down payment tiers
function minDownPayment(homePrice: number): number {
  if (homePrice <= 500_000) return homePrice * 0.05
  if (homePrice <= 999_999) return 25_000 + (homePrice - 500_000) * 0.10
  return homePrice * 0.20
}

export default function MaxMortgageCalculator() {
  const [annualIncome,  setAnnualIncome]  = useState(120000)
  const [otherDebts,    setOtherDebts]    = useState(500)
  const [contractRate,  setContractRate]  = useState(5.0)
  const [amortization,  setAmortization]  = useState(25)
  const [propertyTax,   setPropertyTax]   = useState(5000)   // annual
  const [heating,       setHeating]       = useState(150)    // monthly

  const result = useMemo(() => {
    const grossMonthly   = annualIncome / 12
    const stressTestRate = Math.max(contractRate + 2, 5.25)
    const monthlyPropTax = propertyTax / 12

    const maxMortgage = findMaxMortgageSimple(
      grossMonthly, otherDebts, stressTestRate, amortization, monthlyPropTax, heating
    )

    // Work out max home price: iterate until minDownPayment + mortgage = homePrice
    // homePrice = maxMortgage + minDown(homePrice) → solve iteratively
    let homePrice = maxMortgage
    for (let i = 0; i < 30; i++) {
      const minDown = minDownPayment(homePrice)
      homePrice = maxMortgage + minDown
    }
    homePrice = Math.floor(homePrice / 1000) * 1000
    const minDown = minDownPayment(homePrice)

    const actualPayment  = calculateMonthlyPayment(maxMortgage, contractRate, amortization)
    const stressPayment  = calculateMonthlyPayment(maxMortgage, stressTestRate, amortization)

    const gds = ((stressPayment + monthlyPropTax + heating) / grossMonthly) * 100
    const tds = ((stressPayment + monthlyPropTax + heating + otherDebts) / grossMonthly) * 100

    // Scenario comparison: different income multiples
    const scenarios = [0.8, 1.0, 1.2, 1.5].map(mult => {
      const inc = annualIncome * mult
      const m = findMaxMortgageSimple(inc / 12, otherDebts, stressTestRate, amortization, monthlyPropTax, heating)
      return { income: inc, maxMortgage: m }
    })

    return { maxMortgage, homePrice, minDown, actualPayment, stressPayment, stressTestRate, gds, tds, scenarios, grossMonthly }
  }, [annualIncome, otherDebts, contractRate, amortization, propertyTax, heating])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label className="form-label">Gross Annual Household Income</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={20000} max={1000000} step={5000}
              value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <input type="range" min={30000} max={500000} step={5000} value={annualIncome}
            onChange={e => setAnnualIncome(Number(e.target.value))}
            className="w-full mt-2 accent-navy-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>$30K</span><span>$500K</span></div>
        </div>

        <div>
          <label className="form-label">Monthly Other Debt Payments</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={0} max={10000} step={50}
              value={otherDebts} onChange={e => setOtherDebts(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Car loans, student loans, credit cards, etc.</p>
        </div>

        <div>
          <label className="form-label">Expected Mortgage Rate (%)</label>
          <div className="relative">
            <input type="number" min={0.5} max={12} step={0.05}
              value={contractRate} onChange={e => setContractRate(Number(e.target.value))}
              className="input-field pr-8" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>

        <div>
          <label className="form-label">Amortization Period</label>
          <select value={amortization} onChange={e => setAmortization(Number(e.target.value))} className="select-field">
            {[10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
          </select>
        </div>

        <div>
          <label className="form-label">Estimated Annual Property Tax</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={0} max={30000} step={100}
              value={propertyTax} onChange={e => setPropertyTax(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
        </div>

        <div>
          <label className="form-label">Monthly Heating Costs</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={0} max={1000} step={10}
              value={heating} onChange={e => setHeating(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Hero results */}
        <div className="bg-navy-600 rounded-2xl p-6 text-white">
          <p className="text-navy-200 text-sm mb-1">Maximum Mortgage Amount</p>
          <p className="text-4xl font-bold tracking-tight">{formatCAD(result.maxMortgage)}</p>
          <div className="mt-3 pt-3 border-t border-navy-500 flex justify-between text-sm">
            <div>
              <p className="text-navy-300 text-xs">Max home price</p>
              <p className="font-semibold text-white">{formatCAD(result.homePrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-navy-300 text-xs">Min. down payment</p>
              <p className="font-semibold text-white">{formatCAD(result.minDown)}</p>
            </div>
          </div>
        </div>

        {/* Payment summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-surface p-4 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Monthly Payment</p>
            <p className="text-xl font-bold text-gray-900">{formatCAD(result.actualPayment, 0)}</p>
            <p className="text-xs text-gray-400">at {contractRate}%</p>
          </div>
          <div className="card-surface p-4 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Stress Test Rate</p>
            <p className="text-xl font-bold text-gray-900">{result.stressTestRate.toFixed(2)}%</p>
            <p className="text-xs text-gray-400">qualifying rate</p>
          </div>
        </div>

        {/* Ratio summary */}
        <div className="card-surface p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-gray-900 mb-3">At Maximum Qualification</h3>
          {[
            { label: 'GDS ratio (max 32%)', value: result.gds.toFixed(1) + '%', ok: result.gds <= 32 },
            { label: 'TDS ratio (max 44%)', value: result.tds.toFixed(1) + '%', ok: result.tds <= 44 },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-1.5 border-b border-parchment-100 last:border-0">
              <span className="text-gray-600">{r.label}</span>
              <span className={`font-bold ${r.ok ? 'text-green-700' : 'text-red-600'}`}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Income scenarios */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-navy-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Income Scenarios</h3>
          </div>
          <div className="space-y-2">
            {result.scenarios.map(s => {
              const isSelected = Math.abs(s.income - annualIncome) < 1
              return (
                <div key={s.income} className={`flex justify-between py-2 px-3 rounded-lg text-sm ${isSelected ? 'bg-navy-50 font-semibold' : ''}`}>
                  <span className="text-gray-600">{formatCAD(s.income, 0)}/yr income</span>
                  <span className={`font-semibold ${isSelected ? 'text-navy-700' : 'text-gray-900'}`}>
                    {formatCAD(s.maxMortgage, 0)}
                    {isSelected && <span className="text-xs text-navy-500 ml-1">← yours</span>}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-gray-500 p-3 bg-parchment-50 rounded-xl">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>Results use the OSFI stress test (qualifying rate = higher of contract rate + 2% or 5.25%). Actual approval depends on your credit score, lender policies, and full application review.</span>
        </div>
      </div>
    </div>
  )
}
