'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CreditCard } from '@/types'

const ISSUER_GRADIENT: Record<string, string> = {
  'American Express': 'from-slate-700 to-slate-900',
  'TD':               'from-green-700 to-green-900',
  'Scotiabank':       'from-red-600 to-red-800',
  'RBC':              'from-blue-600 to-blue-800',
  'CIBC':             'from-red-700 to-slate-800',
  'BMO':              'from-blue-700 to-blue-900',
  'Tangerine':        'from-orange-500 to-orange-700',
  'Rogers Bank':      'from-red-500 to-red-700',
}

interface Props {
  card: CreditCard
  className: string
}

export default function CardImage({ card, className }: Props) {
  const [failed, setFailed] = useState(false)

  if (card.imageUrl && !failed) {
    return (
      <img
        src={card.imageUrl}
        alt={card.name}
        className={cn(className, 'object-contain rounded-lg')}
        onError={() => setFailed(true)}
      />
    )
  }

  const gradient = ISSUER_GRADIENT[card.issuer] ?? 'from-navy-600 to-navy-900'
  return (
    <div className={cn(className, 'rounded-lg bg-gradient-to-br flex items-center justify-center', gradient)}>
      <span className="text-white font-bold text-xs tracking-wide opacity-80">
        {card.issuer.split(' ')[0].toUpperCase()}
      </span>
    </div>
  )
}
