'use client'

import { useState, useMemo } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'
import { calculateMonthlyPayment, formatCAD } from '@/lib/utils'

// Canadian GDS/TDS limits
const GDS_LIMIT = 0.32
const TDS_LIMIT = 0.44

function findMaxMortgage(
  grossMonthlyIncome: number,
  monthlyOtherDebts: number,
  monthlyPropertyTax: number,
  monthlyHeating: number,
  stressTestRate: number,
  amortizationYears: number
): number {
  // Binary search for the max mortgage where both GDS and TDS pass
  let lo = 0
  let hi = 2_500_000
  for (let i = 0; i < 64; i++) {
    const mid = (lo + hi) / 2
    const payment = calculateMonthlyPayment(mid, stressTestRate, amortizationYears)
    const gds = (payment + monthlyPropertyTax + monthlyHeating) / grossMonthlyIncome
    const tds = (payment + monthlyPropertyTax + monthlyHeating + monthlyOtherDebts) / grossMonthlyIncome
    if (gds <= GDS_LIMIT && tds <= TDS_LIMIT) lo = mid
    else hi = mid
  }
  return Math.floor(lo / 1000) * 1000
}

export default function AffordabilityCalculator() {
  const [annualIncome,  setAnnualIncome]  = useState(120000)
  const [otherDebts,    setOtherDebts]    = useState(500)   // monthly (car, student, etc.)
  const [downPayment,   setDownPayment]   = useState(100000)
  const [contractRate,  setContractRate]  = useState(5.0)
  const [amortization,  setAmortization]  = useState(25)
  const [propertyTax,   setPropertyTax]   = useState(5000)  // annual
  const [heating,       setHeating]       = useState(150)   // monthly

  const result = useMemo(() => {
    const grossMonthly     = annualIncome / 12
    const monthlyPropTax   = propertyTax / 12
    const stressTestRate   = Math.max(contractRate + 2, 5.25)

    const maxMortgage = findMaxMortgage(
      grossMonthly, otherDebts, monthlyPropTax, heating, stressTestRate, amortization
    )
    const maxHomePrice = maxMortgage + downPayment

    // Also compute what GDS/TDS look like at this mortgage
    const payment = calculateMonthlyPayment(maxMortgage, stressTestRate, amortization)
    const gds = ((payment + monthlyPropTax + heating) / grossMonthly) * 100
    const tds = ((payment + monthlyPropTax + heating + otherDebts) / grossMonthly) * 100

    // Actual monthly payment at contract rate (not stress test)
    const actualPayment = calculateMonthlyPayment(maxMortgage, contractRate, amortization)

    // CMHC required?
    const ltv = downPayment / maxHomePrice
    const cmhcRequired = ltv < 0.20

    // Down payment % of max home price
    const downPct = (downPayment / maxHomePrice) * 100

    return {
      maxMortgage,
      maxHomePrice,
      gds,
      tds,
      stressTestRate,
      actualPayment,
      cmhcRequired,
      downPct,
      grossMonthly,
    }
  }, [annualIncome, otherDebts, downPayment, contractRate, amortization, propertyTax, heating])

  function RatioBar({ value, limit, label }: { value: number; limit: number; label: string }) {
    const pct = Math.min((value / limit) * 100, 100)
    const over = value > limit
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          <span className={`font-bold ${over ? 'text-red-600' : 'text-green-700'}`}>
            {value.toFixed(1)}% / {(limit * 100).toFixed(0)}% limit
          </span>
        </div>
        <div className="h-2.5 bg-parchment-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : pct > 85 ? 'bg-amber-400' : 'bg-green-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        {/* Gross annual income */}
        <div>
          <label className="form-label">Gross Annual Household Income</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={20000} max={1000000} step={5000}
              value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Monthly: {formatCAD(annualIncome / 12, 0)}</p>
        </div>

        {/* Monthly other debts */}
        <div>
          <label className="form-label">Monthly Debt Obligations</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={0} max={10000} step={50}
              value={otherDebts} onChange={e => setOtherDebts(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Car payments, student loans, lines of credit, etc.</p>
        </div>

        {/* Down payment */}
        <div>
          <label className="form-label">Down Payment Available</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={5000} max={1000000} step={5000}
              value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
        </div>

        {/* Interest rate */}
        <div>
          <label className="form-label">Expected Mortgage Rate (%)</label>
          <div className="relative">
            <input type="number" min={0.5} max={12} step={0.05}
              value={contractRate} onChange={e => setContractRate(Number(e.target.value))}
              className="input-field pr-8" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Stress test rate: {Math.max(contractRate + 2, 5.25).toFixed(2)}% (higher of +2% or 5.25%)
          </p>
        </div>

        {/* Amortization */}
        <div>
          <label className="form-label">Amortization Period</label>
          <select value={amortization} onChange={e => setAmortization(Number(e.target.value))} className="select-field">
            {[10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
          </select>
        </div>

        {/* Property tax */}
        <div>
          <label className="form-label">Estimated Annual Property Tax</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={0} max={30000} step={100}
              value={propertyTax} onChange={e => setPropertyTax(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Monthly: {formatCAD(propertyTax / 12, 0)}</p>
        </div>

        {/* Heating */}
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
        {/* Primary result */}
        <div className="bg-navy-600 rounded-2xl p-6 text-white">
          <p className="text-navy-200 text-sm mb-1">Maximum Home Price</p>
          <p className="text-4xl font-bold tracking-tight">{formatCAD(result.maxHomePrice)}</p>
          <p className="text-navy-200 text-sm mt-2">
            Maximum mortgage: {formatCAD(result.maxMortgage)}
          </p>
        </div>

        {/* Key numbers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-surface p-4 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Actual Monthly Payment</p>
            <p className="text-xl font-bold text-gray-900">{formatCAD(result.actualPayment, 0)}</p>
            <p className="text-xs text-gray-400">at {contractRate}%</p>
          </div>
          <div className="card-surface p-4 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Stress Test Rate</p>
            <p className="text-xl font-bold text-gray-900">{result.stressTestRate.toFixed(2)}%</p>
            <p className="text-xs text-gray-400">qualifying rate</p>
          </div>
        </div>

        {/* GDS / TDS bars */}
        <div className="card-surface p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Debt Service Ratios</h3>
          <RatioBar value={result.gds} limit={GDS_LIMIT} label="GDS (Gross Debt Service)" />
          <RatioBar value={result.tds} limit={TDS_LIMIT} label="TDS (Total Debt Service)" />
          <div className="flex items-start gap-2 text-xs text-gray-500 pt-1">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>GDS includes mortgage + property tax + heating. TDS adds all other debt payments.</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="card-surface p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Monthly Housing Costs</h3>
          {[
            { label: 'Mortgage payment (actual rate)', value: formatCAD(result.actualPayment, 0) },
            { label: 'Property tax',                   value: formatCAD(propertyTax / 12, 0) },
            { label: 'Heating',                        value: formatCAD(heating, 0) },
            { label: 'Other debts',                    value: formatCAD(otherDebts, 0) },
            { label: 'Gross monthly income',           value: formatCAD(result.grossMonthly, 0) },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-1 border-b border-parchment-100 last:border-0">
              <span className="text-gray-600">{r.label}</span>
              <span className="font-semibold text-gray-900">{r.value}</span>
            </div>
          ))}
        </div>

        {/* CMHC warning */}
        {result.cmhcRequired && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2 text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Your down payment is {result.downPct.toFixed(1)}% — under 20%. CMHC mortgage insurance will apply, adding to your mortgage principal.</span>
          </div>
        )}

        {!result.cmhcRequired && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-2 text-sm text-green-800">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Your down payment of {result.downPct.toFixed(1)}% is ≥ 20% — no CMHC insurance required.</span>
          </div>
        )}

        <p className="text-xs text-gray-400">
          Based on OSFI Canadian mortgage stress test guidelines. Results are estimates — speak with a mortgage broker for a pre-approval.
        </p>
      </div>
    </div>
  )
}
