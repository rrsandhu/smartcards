'use client'

import { useState } from 'react'

interface Props {
  imageUrl?: string
  cardName: string
  issuer: string
  /** Applied to the outer wrapper — caller controls size. Defaults to w-full h-full. */
  className?: string
}

/** Abbreviate an issuer name to 2–3 characters for the fallback badge. */
function issuerAbbr(issuer: string): string {
  const words = issuer.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  // Two-word issuers: first letters of each word
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

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

export default function OfferCardImage({ imageUrl, cardName, issuer, className = 'w-full h-full' }: Props) {
  const [failed, setFailed] = useState(false)

  if (imageUrl && !failed) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <img
          src={imageUrl}
          alt={cardName}
          className="w-full h-full object-contain drop-shadow-lg"
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  // Structured fallback — fills the same space as a real image
  const gradient = gradientFor(issuer)
  return (
    <div className={`${className} bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-1.5 rounded-lg`}>
      <span className="text-white font-bold text-2xl tracking-widest opacity-90">
        {issuerAbbr(issuer)}
      </span>
      <span className="text-white/60 text-xs font-medium text-center px-3 leading-tight line-clamp-2">
        {cardName}
      </span>
    </div>
  )
}
