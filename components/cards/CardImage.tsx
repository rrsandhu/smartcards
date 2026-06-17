'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CreditCard } from '@/types'

const ISSUER_GRADIENT: Record<string, string> = {
  'American Express': 'from-slate-600 to-slate-800',
  'Amex':             'from-slate-600 to-slate-800',
  'TD':               'from-green-700 to-green-900',
  'Scotiabank':       'from-red-600 to-red-800',
  'RBC':              'from-blue-600 to-blue-800',
  'CIBC':             'from-red-700 to-slate-800',
  'BMO':              'from-blue-700 to-blue-900',
  'Tangerine':        'from-orange-500 to-orange-700',
  'Rogers':           'from-red-500 to-red-700',
  'National Bank':    'from-red-600 to-red-900',
  'Desjardins':       'from-green-600 to-green-800',
  'MBNA':             'from-blue-800 to-indigo-900',
  'Neo':              'from-purple-600 to-purple-900',
  'Home Trust':       'from-gray-600 to-gray-800',
  'PC Financial':     'from-blue-900 to-indigo-900',
}

function gradientFor(issuer: string): string {
  const key = Object.keys(ISSUER_GRADIENT).find(k =>
    issuer.toLowerCase().startsWith(k.toLowerCase())
  )
  return ISSUER_GRADIENT[key ?? ''] ?? 'from-navy-600 to-navy-900'
}

function issuerAbbr(issuer: string): string {
  const words = issuer.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

interface Props {
  card: CreditCard
  className: string
}

export default function CardImage({ card, className }: Props) {
  const [failed, setFailed] = useState(false)

  if (card.imageUrl && !failed) {
    return (
      <div className={cn(className, 'rounded-lg bg-white overflow-hidden flex items-center justify-center')}>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  const gradient = gradientFor(card.issuer)
  return (
    <div className={cn(className, 'rounded-lg bg-gradient-to-br flex flex-col items-center justify-center gap-0.5 px-1', gradient)}>
      <span className="text-white font-bold text-xs tracking-widest leading-none opacity-90">
        {issuerAbbr(card.issuer)}
      </span>
      <span className="text-white/50 text-[9px] font-medium text-center leading-tight line-clamp-2 w-full text-center">
        {card.name.replace(/^(TD|RBC|BMO|CIBC|Amex|American Express|Scotiabank|Tangerine|Rogers|MBNA|Neo)\s+/i, '')}
      </span>
    </div>
  )
}
