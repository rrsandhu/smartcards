'use client'

import { useState, useMemo } from 'react'
import { CheckCircle, AlertTriangle, TrendingDown, Info } from 'lucide-react'
import { formatCAD } from '@/lib/utils'

function monthlyInterest(balance: number, annualRate: number): number {
  return balance * (annualRate / 100 / 12)
}

export default function BalanceTransferCalculator() {
  const [currentBalance,   setCurrentBalance]   = useState(8000)
  const [currentAPR,       setCurrentAPR]       = useState(19.99)
  const [transferFeeRate,  setTransferFeeRate]  = useState(1.5)   // % of balance
  const [promoRate,        setPromoRate]        = useState(0)     // promo APR %
  const [promoPeriod,      setPromoPeriod]      = useState(12)    // months
  const [monthlyPayment,   setMonthlyPayment]   = useState(300)

  const result = useMemo(() => {
    const transferFee      = currentBalance * (transferFeeRate / 100)
    const transferredBalance = currentBalance + transferFee

    // — Scenario A: Stay on current card ———————————————————————————————————————
    let balA = currentBalance
    let totalInterestA = 0
    let monthsA = 0
    while (balA > 0.01 && monthsA < 600) {
      const interest = monthlyInterest(balA, currentAPR)
      totalInterestA += interest
      balA = balA + interest - monthlyPayment
      if (balA < 0) balA = 0
      monthsA++
      if (monthlyPayment <= monthlyInterest(balA, currentAPR)) break // never pays off
    }
    const paysOffCurrentCard = monthsA < 600

    // — Scenario B: Balance transfer ——————————————————————————————————————————
    let balB = transferredBalance
    let totalInterestB = 0
    let monthsB = 0

    // Promo period
    for (let m = 0; m < promoPeriod && balB > 0.01; m++) {
      const interest = monthlyInterest(balB, promoRate)
      totalInterestB += interest
      balB = balB + interest - monthlyPayment
      if (balB < 0) balB = 0
      monthsB++
    }

    // After promo — reverts to current APR
    const postPromoStart = balB
    let postPromoInterest = 0
    while (balB > 0.01 && monthsB < 600) {
      const interest = monthlyInterest(balB, currentAPR)
      postPromoInterest += interest
      balB = balB + interest - monthlyPayment
      if (balB < 0) balB = 0
      monthsB++
      if (monthlyPayment <= monthlyInterest(balB, currentAPR)) break
    }
    totalInterestB += postPromoInterest
    const paysOffBalanceTransfer = monthsB < 600

    const savings = (totalInterestA + 0) - (totalInterestB + transferFee)
    const netSavings = totalInterestA - (totalInterestB + transferFee)

    // Min payment to pay off in promo period (at promo rate)
    let minToPayOffInPromo = 0
    if (promoRate === 0) {
      minToPayOffInPromo = transferredBalance / promoPeriod
    } else {
      const r = promoRate / 100 / 12
      const n = promoPeriod
      minToPayOffInPromo = (transferredBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    // What remains at end of promo if paying current monthlyPayment
    const remainderAtPromoEnd = postPromoStart

    return {
      transferFee,
      transferredBalance,
      totalInterestA,
      totalInterestB,
      monthsA,
      monthsB,
      netSavings,
      savings,
      paysOffCurrentCard,
      paysOffBalanceTransfer,
      minToPayOffInPromo,
      remainderAtPromoEnd,
      postPromoStart,
    }
  }, [currentBalance, currentAPR, transferFeeRate, promoRate, promoPeriod, monthlyPayment])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        {/* Current balance */}
        <div>
          <label className="form-label">Current Balance to Transfer</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={100} max={50000} step={100}
              value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <input type="range" min={500} max={30000} step={250} value={currentBalance}
            onChange={e => setCurrentBalance(Number(e.target.value))}
            className="w-full mt-2 accent-navy-600" />
        </div>

        {/* Current APR */}
        <div>
          <label className="form-label">Current Card Interest Rate (APR)</label>
          <div className="relative">
            <input type="number" min={1} max={30} step={0.01}
              value={currentAPR} onChange={e => setCurrentAPR(Number(e.target.value))}
              className="input-field pr-8" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Most Canadian cards charge 19.99% – 22.99%</p>
        </div>

        {/* Balance transfer fee */}
        <div>
          <label className="form-label">Balance Transfer Fee</label>
          <div className="relative">
            <input type="number" min={0} max={5} step={0.25}
              value={transferFeeRate} onChange={e => setTransferFeeRate(Number(e.target.value))}
              className="input-field pr-8" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fee: {formatCAD(currentBalance * transferFeeRate / 100, 2)} — balance transferred: {formatCAD(currentBalance * (1 + transferFeeRate / 100), 2)}
          </p>
        </div>

        {/* Promo rate */}
        <div>
          <label className="form-label">Promotional Interest Rate</label>
          <div className="relative">
            <input type="number" min={0} max={10} step={0.01}
              value={promoRate} onChange={e => setPromoRate(Number(e.target.value))}
              className="input-field pr-8" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Many cards offer 0% – 2.99% for intro periods</p>
        </div>

        {/* Promo period */}
        <div>
          <label className="form-label">Promotional Period</label>
          <select value={promoPeriod} onChange={e => setPromoPeriod(Number(e.target.value))} className="select-field">
            {[6, 9, 10, 12, 15, 18, 21, 24].map(m => <option key={m} value={m}>{m} months</option>)}
          </select>
        </div>

        {/* Monthly payment */}
        <div>
          <label className="form-label">Your Monthly Payment</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" min={10} max={10000} step={25}
              value={monthlyPayment} onChange={e => setMonthlyPayment(Number(e.target.value))}
              className="input-field pl-8" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            To clear balance in promo period: <strong>{formatCAD(result.minToPayOffInPromo, 0)}/month</strong>
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Net savings hero */}
        <div className={`rounded-2xl p-6 text-white ${result.netSavings > 0 ? 'bg-green-700' : 'bg-amber-600'}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.netSavings > 0
              ? <CheckCircle className="w-5 h-5" />
              : <AlertTriangle className="w-5 h-5" />}
            <p className="text-sm opacity-90">{result.netSavings > 0 ? 'Estimated Net Savings' : 'Balance Transfer May Not Help'}</p>
          </div>
          <p className="text-4xl font-bold tracking-tight">
            {result.netSavings > 0 ? formatCAD(result.netSavings, 0) : formatCAD(Math.abs(result.netSavings), 0)}
          </p>
          <p className="text-sm opacity-75 mt-1">
            {result.netSavings > 0 ? 'saved vs. staying on current card' : 'extra cost vs. staying on current card'}
          </p>
        </div>

        {/* Comparison table */}
        <div className="card-surface overflow-hidden">
          <div className="grid grid-cols-3 text-center text-xs font-semibold text-gray-500 bg-parchment-50 py-2.5">
            <div></div>
            <div>Current Card</div>
            <div>Balance Transfer</div>
          </div>
          {[
            { label: 'Starting balance', a: formatCAD(currentBalance), b: formatCAD(result.transferredBalance, 2) },
            { label: 'Transfer fee',     a: '—',                        b: formatCAD(result.transferFee, 2) },
            { label: 'Total interest',   a: result.paysOffCurrentCard ? formatCAD(result.totalInterestA, 2) : 'Never paid off', b: result.paysOffBalanceTransfer ? formatCAD(result.totalInterestB, 2) : 'Recheck payment' },
            { label: 'Payoff timeline',  a: result.paysOffCurrentCard ? `${result.monthsA} months` : '—', b: result.paysOffBalanceTransfer ? `${result.monthsB} months` : '—' },
            { label: 'Total cost',       a: result.paysOffCurrentCard ? formatCAD(currentBalance + result.totalInterestA, 2) : '—', b: result.paysOffBalanceTransfer ? formatCAD(currentBalance + result.totalInterestB + result.transferFee, 2) : '—' },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-3 py-2.5 px-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-parchment-50'}`}>
              <span className="text-gray-600 text-xs">{row.label}</span>
              <span className="text-center font-medium text-gray-700">{row.a}</span>
              <span className={`text-center font-semibold ${row.label === 'Total interest' ? 'text-green-700' : 'text-gray-900'}`}>{row.b}</span>
            </div>
          ))}
        </div>

        {/* Promo period warning */}
        {result.remainderAtPromoEnd > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Balance remains after promo period</p>
                <p className="text-xs">
                  At your current payment of {formatCAD(monthlyPayment, 0)}/month, you'll have{' '}
                  <strong>{formatCAD(result.remainderAtPromoEnd, 0)}</strong> remaining when the promo ends — this reverts to {currentAPR}%.
                  To clear the full balance in {promoPeriod} months, pay <strong>{formatCAD(result.minToPayOffInPromo, 0)}/month</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {result.remainderAtPromoEnd <= 0.01 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-2 text-sm text-green-800">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>At {formatCAD(monthlyPayment, 0)}/month, you'll pay off the full balance before the promo period ends.</span>
          </div>
        )}

        <div className="flex items-start gap-2 text-xs text-gray-500 p-3 bg-parchment-50 rounded-xl">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>Results assume minimum payments. Most promotional rates end if you miss a payment — always pay on time during the promo period.</span>
        </div>
      </div>
    </div>
  )
}
