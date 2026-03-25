'use client'

import { useState, useMemo } from 'react'
import { calculateMonthlyPayment, calculateCMHCPremium, formatCAD, formatNumber } from '@/lib/utils'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice]     = useState(750000)
  const [downPayment, setDownPayment] = useState(150000)
  const [rate, setRate]               = useState(5.5)
  const [amortization, setAmortization] = useState(25)
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly')

  const result = useMemo(() => {
    const principal = homePrice - downPayment
    if (principal <= 0 || rate <= 0) return null

    const { premium } = calculateCMHCPremium(homePrice, downPayment)
    const totalPrincipal = principal + premium
    const monthly = calculateMonthlyPayment(totalPrincipal, rate, amortization)
    const biweekly = (monthly * 12) / 26
    const weekly   = (monthly * 12) / 52

    const totalPaid = monthly * amortization * 12
    const totalInterest = totalPaid - totalPrincipal
    const downPct = (downPayment / homePrice) * 100
    const cmhcRequired = downPct < 20

    const payment = paymentFrequency === 'monthly' ? monthly
                  : paymentFrequency === 'biweekly' ? biweekly
                  : weekly

    return {
      payment,
      monthly,
      biweekly,
      weekly,
      totalInterest,
      totalPaid,
      totalPrincipal,
      cmhcRequired,
      cmhcPremium: premium,
      downPct,
    }
  }, [homePrice, downPayment, rate, amortization, paymentFrequency])

  const downPct = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        {/* Home price */}
        <div>
          <label className="form-label">Home Price</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">$</span>
            <input
              type="number"
              min={100000}
              max={5000000}
              step={5000}
              value={homePrice}
              onChange={e => setHomePrice(Number(e.target.value))}
              className="input-field pl-8"
            />
          </div>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={5000}
            value={homePrice}
            onChange={e => setHomePrice(Number(e.target.value))}
            className="w-full mt-2 accent-navy-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$100K</span><span>$2M</span>
          </div>
        </div>

        {/* Down payment */}
        <div>
          <label className="form-label">
            Down Payment
            <span className="ml-2 text-gray-400 font-normal">({downPct}%)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">$</span>
            <input
              type="number"
              min={homePrice * 0.05}
              max={homePrice}
              step={1000}
              value={downPayment}
              onChange={e => setDownPayment(Number(e.target.value))}
              className="input-field pl-8"
            />
          </div>
          <input
            type="range"
            min={Math.round(homePrice * 0.05)}
            max={homePrice}
            step={1000}
            value={downPayment}
            onChange={e => setDownPayment(Number(e.target.value))}
            className="w-full mt-2 accent-navy-600"
          />
          {Number(downPct) < 20 && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ Under 20% — CMHC mortgage insurance applies
            </p>
          )}
        </div>

        {/* Interest rate */}
        <div>
          <label className="form-label">Annual Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              min={0.5}
              max={15}
              step={0.05}
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="input-field pr-8"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.05}
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full mt-2 accent-navy-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>0.5%</span><span>10%</span>
          </div>
        </div>

        {/* Amortization */}
        <div>
          <label className="form-label">Amortization Period</label>
          <select
            value={amortization}
            onChange={e => setAmortization(Number(e.target.value))}
            className="select-field"
          >
            {[10, 15, 20, 25, 30].map(y => (
              <option key={y} value={y}>{y} years</option>
            ))}
          </select>
        </div>

        {/* Payment frequency */}
        <div>
          <label className="form-label">Payment Frequency</label>
          <div className="grid grid-cols-3 gap-2">
            {(['monthly', 'biweekly', 'weekly'] as const).map(f => (
              <button
                key={f}
                onClick={() => setPaymentFrequency(f)}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors capitalize ${
                  paymentFrequency === f
                    ? 'bg-navy-600 text-white border-navy-600'
                    : 'bg-white text-gray-700 border-parchment-300 hover:border-navy-300'
                }`}
              >
                {f === 'biweekly' ? 'Bi-weekly' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {result ? (
          <>
            {/* Primary result */}
            <div className="bg-navy-600 rounded-2xl p-6 text-white">
              <p className="text-navy-200 text-sm mb-1 capitalize">{paymentFrequency} Payment</p>
              <p className="text-4xl font-bold tracking-tight">{formatCAD(result.payment, 2)}</p>
              <p className="text-navy-200 text-sm mt-2">
                on a {formatCAD(homePrice)} home
              </p>
            </div>

            {/* Other frequencies */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Monthly',    value: result.monthly },
                { label: 'Bi-weekly',  value: result.biweekly },
                { label: 'Weekly',     value: result.weekly },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-parchment-200 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  <p className="font-bold text-gray-900 text-sm">{formatCAD(value, 0)}</p>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="card-surface p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Payment Breakdown</h3>
              {[
                { label: 'Mortgage Principal',   value: formatCAD(homePrice - downPayment) },
                ...(result.cmhcRequired ? [
                  { label: 'CMHC Insurance Premium', value: formatCAD(result.cmhcPremium, 2) },
                ] : []),
                { label: 'Total Principal + CMHC', value: formatCAD(result.totalPrincipal) },
                { label: 'Total Interest Over Life', value: formatCAD(result.totalInterest) },
                { label: 'Total Amount Paid',       value: formatCAD(result.totalPaid) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* Principal vs interest bar */}
            <div className="card-surface p-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">Principal vs. Interest</p>
              <div className="h-3 rounded-full overflow-hidden bg-parchment-200 flex">
                <div
                  className="bg-navy-600 h-full"
                  style={{ width: `${(result.totalPrincipal / result.totalPaid) * 100}%` }}
                />
                <div className="bg-gold-400 h-full flex-1" />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-navy-600 inline-block" />
                  Principal ({((result.totalPrincipal / result.totalPaid) * 100).toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block" />
                  Interest ({((result.totalInterest / result.totalPaid) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>

            {result.cmhcRequired && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <strong>CMHC Mortgage Insurance Required:</strong> Since your down payment is under 20%, you'll pay CMHC insurance of{' '}
                {formatCAD(result.cmhcPremium, 2)} ({((result.cmhcPremium / (homePrice - downPayment)) * 100).toFixed(2)}% of mortgage). This is typically added to your mortgage principal.
              </div>
            )}
          </>
        ) : (
          <div className="card-surface p-8 text-center text-gray-500">
            Enter your home price and down payment to see your estimated payment.
          </div>
        )}
      </div>
    </div>
  )
}
