import { Info } from 'lucide-react'

interface Props {
  text?: string
}

export default function DisclaimerBlock({ text }: Props) {
  return (
    <div className="flex gap-3 p-4 bg-parchment-100 border border-parchment-300 rounded-xl text-xs text-gray-600 leading-relaxed">
      <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
      <p>
        {text ?? (
          <>
            <strong>Advertiser Disclosure:</strong> SmartCardOffers may earn a referral fee when you apply for products through links on this page. This does not affect the way we evaluate or rank products. Rates, fees, and offer details are subject to change — always verify with the card issuer before applying.{' '}
            <a href="/legal/affiliate-disclosure" className="underline hover:text-navy-600">
              Learn more about how we make money.
            </a>
          </>
        )}
      </p>
    </div>
  )
}
