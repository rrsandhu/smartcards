'use client'

import { useState } from 'react'

interface Props {
  imageUrl?: string
  cardName: string
  issuer: string
  /** Container class applied to the outer wrapper div */
  className?: string
  /** Class for the fallback text (optional override) */
  fallbackClassName?: string
}

export default function OfferCardImage({ imageUrl, cardName, issuer, className = 'w-52 h-32', fallbackClassName }: Props) {
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

  return (
    <span className={fallbackClassName ?? 'text-white font-bold text-lg opacity-40'}>
      {issuer}
    </span>
  )
}
