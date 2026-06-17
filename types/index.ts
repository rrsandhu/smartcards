// ─── Credit Cards ────────────────────────────────────────────────────────────

export type RewardsType =
  | 'cash-back'
  | 'travel-points'
  | 'airline-miles'
  | 'flexible-points'
  | 'no-rewards'

export type CardCategory =
  | 'travel'
  | 'cash-back'
  | 'no-fee'
  | 'low-interest'
  | 'business'
  | 'student'
  | 'points'
  | 'premium'
  | 'secured'

export type CardNetwork = 'Visa' | 'Mastercard' | 'Amex' | 'Discover'

export interface EarnRate {
  category: string      // e.g. "Groceries", "Travel", "Everything else"
  rate: number          // e.g. 3 = 3x points or 3%
  unit: 'points' | 'miles' | 'percent'
  cap?: string          // e.g. "$15,000/year"
  details?: string      // fine print from card_earn_rates.details
}

export interface TransferPartner {
  name: string
  ratio?: string        // e.g. "1:1", "1:1.25"
  transferTime?: string // e.g. "Instant", "2-3 days"
  alliance?: string     // e.g. "Star Alliance", "Oneworld"
  bestFor?: string      // e.g. "Business class to Asia"
}

export interface LoungeDetail {
  network: string       // e.g. "Priority Pass", "Dragon Pass"
  visitsPerYear?: number
  guestPolicy?: string  // e.g. "1 free guest", "Guests charged $32"
  details?: string
}

export interface CardCredit {
  creditType: string    // e.g. "travel", "dining", "streaming", "hotel"
  amount: number        // CAD
  details?: string
}

export interface Insurance {
  travelMedical?: boolean | string
  tripCancellation?: boolean | string
  tripInterruption?: boolean | string
  flightDelay?: boolean | string
  baggageDelay?: boolean | string
  rentalCar?: boolean | string
  purchaseProtection?: boolean | string
  extendedWarranty?: boolean | string
  mobileMaestro?: boolean | string
  hotelBurglary?: boolean | string
  outOfProvince?: boolean | string
}

export interface Perk {
  label: string
  description?: string
}

export interface CreditCard {
  id: string
  slug: string
  name: string
  issuer: string
  network: CardNetwork
  annualFee: number
  annualFeeWaived?: string             // e.g. "First year waived"
  supplementaryCardFee?: number
  minCreditScore?: number
  incomeRequirementPersonal?: number   // CAD
  incomeRequirementHousehold?: number  // CAD
  rewardsType: RewardsType
  pointsProgram?: string               // e.g. "Aeroplan", "Scene+"
  earnRates: EarnRate[]
  welcomeBonus?: string                // Human-readable summary
  bonusSummary?: string                // Short marketing copy
  perks: Perk[]
  insurance: Insurance
  foreignTransactionFee: boolean       // true = has FX fee
  foreignTransactionFeeRate?: number   // actual rate, e.g. 2.5
  loungeAccess?: string                // e.g. "Priority Pass" (first network name)
  loungeDetails?: LoungeDetail[]       // full lounge access records
  credits?: CardCredit[]               // annual credits (travel, dining, etc.)
  bestFor: string[]                    // e.g. ["Travel", "Grocery spend"]
  notIdealFor?: string[]
  pros?: string[]
  cons?: string[]
  editorialReview?: string
  affiliateLink?: string
  applyUrl?: string
  imageUrl?: string                    // card art placeholder
  featured: boolean
  editorsPick?: boolean
  tags: string[]
  categories: CardCategory[]
  lastUpdated: string                  // ISO date string
  shortDescription?: string            // one-sentence card summary from API
  transferPartners?: TransferPartner[]  // transfer loyalty programs with full details
  creditScoreMin?: string              // e.g. "good", "excellent"
  allOffers?: Array<{                  // all current offers from detail endpoint
    id: string
    offerType?: string               // 'welcome_bonus' | 'additional_offer' | etc.
    headline: string
    pointsValue?: number
    cashbackValue?: number
    spendRequirement?: number
    spendTimeframeDays?: number
    isLimitedTime: boolean
    expiresAt?: string
    isVerified: boolean
    confidenceScore: number
    isMonthlyBonus: boolean
    monthlyPointsValue?: number
    monthlySpendRequirement?: number
    bonusMonths?: number
    isBetterThanUsual?: boolean
    estimatedValueLow?: number
    estimatedValueMid?: number
    estimatedValueHigh?: number
    avgPoints12mo?: number          // 12-month avg points for this offer type on this card
    avgCashback12mo?: number        // 12-month avg cashback for this offer type on this card
  }>
}

// ─── Card Offers (separate from core card data) ───────────────────────────────

export interface CardOffer {
  id: string
  cardId: string                       // references CreditCard.id
  cardSlug: string
  cardName: string
  issuer: string
  offerType: 'welcome-bonus' | 'limited-time' | 'referral' | 'in-branch'
  headline: string                     // Short offer summary
  bonusAmount?: number                 // e.g. 80000 (points) or 500 (dollars)
  bonusUnit?: 'points' | 'miles' | 'dollars' | 'percent'
  spendRequirement?: string            // e.g. "$3,000 in 3 months"
  spendAmount?: number                 // CAD
  spendPeriodMonths?: number
  additionalBonus?: string
  offerExpiry?: string                 // ISO date
  isLimitedTime: boolean
  affiliateLink?: string
  imageUrl?: string
  featured: boolean
  lastUpdated: string
  tags: string[]
  isBetterThanUsual?: boolean
  estimatedValueLow?: number    // (bonus × cpp_low) + annual_credits − annual_fee
  estimatedValueMid?: number    // (bonus × cpp_mid) + annual_credits − annual_fee
  estimatedValueHigh?: number   // (bonus × cpp_high) + annual_credits − annual_fee
  avgPoints12mo?: number        // 12-month average for this card+offer_type
  avgCashback12mo?: number
}

// ─── Blog / Articles ──────────────────────────────────────────────────────────

export type ArticleCategory =
  | 'points-deals'
  | 'credit-card-deals'
  | 'mortgage-news'
  | 'guides'
  | 'news'

export interface ArticleAuthor {
  name: string
  title?: string
  avatarUrl?: string
}

export interface RelatedCard {
  cardId: string
  cardSlug: string
  cardName: string
  reason?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  author: ArticleAuthor
  publishDate: string          // ISO date
  updatedDate?: string         // ISO date
  heroImageUrl?: string
  heroImageAlt?: string
  tags: string[]
  readingTimeMinutes: number
  featured: boolean
  editorsPick?: boolean
  content: ArticleSection[]
  relatedCards?: RelatedCard[]
  relatedArticleIds?: string[]
  metaDescription?: string
}

export interface ArticleSection {
  type: 'h2' | 'h3' | 'paragraph' | 'bullets' | 'callout' | 'numbered' | 'table' | 'cta-card'
  heading?: string
  body?: string
  items?: string[]
  calloutType?: 'tip' | 'warning' | 'info' | 'highlight'
  rows?: string[][]
  headers?: string[]
  ctaText?: string
  ctaUrl?: string
  ctaCardId?: string
}

// ─── Points Programs ──────────────────────────────────────────────────────────

export interface PointsProgram {
  id: string
  slug: string
  name: string
  operator: string                     // e.g. "Air Canada", "Scotiabank"
  type: 'airline' | 'hotel' | 'bank' | 'retail' | 'coalition'
  description: string
  cppCents: number                     // cents per point at average redemption
  cppCentsMax?: number                 // best-case redemption
  earnCards: string[]                  // CreditCard.id[]
  transferPartners?: string[]
  bestRedemptions?: string[]
  websiteUrl?: string
  logoUrl?: string
  tags: string[]
  lastUpdated: string
}

// ─── Tools / Calculators ──────────────────────────────────────────────────────

export type ToolCategory =
  | 'mortgage'
  | 'credit-card'
  | 'debt'
  | 'savings'
  | 'tax'

export interface Tool {
  id: string
  slug: string
  name: string
  description: string
  category: ToolCategory
  icon: string                         // lucide icon name
  featured: boolean
  tags: string[]
  lastUpdated: string
}

// ─── Search ───────────────────────────────────────────────────────────────────

export type SearchResultType = 'card' | 'article' | 'tool' | 'offer'

export interface SearchResult {
  type: SearchResultType
  id: string
  slug: string
  title: string
  excerpt: string
  url: string
  tags?: string[]
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
