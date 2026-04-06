/**
 * smart-card-api.ts
 *
 * Fetches live card and offer data from the Smart Card Offers backend
 * and adapts the responses to SmartCardOffers's existing CreditCard / CardOffer types.
 *
 * API base: https://smart-card-offers.vercel.app
 */

import type { CreditCard, CardOffer, CardCategory, CardNetwork, RewardsType, EarnRate } from '@/types'

const API = process.env.NEXT_PUBLIC_SMART_CARD_API ?? 'https://smart-card-offers.vercel.app'

// ─── Raw API types ────────────────────────────────────────────────────────────

interface ApiOffer {
  id: string
  card_id?: string
  offer_type: string
  headline: string
  details?: string
  points_value: number | null
  cashback_value: string | null   // Postgres NUMERIC comes back as string
  spend_requirement: number | null
  spend_timeframe_days: number | null
  extra_perks?: string[]
  is_limited_time: boolean
  expires_at: string | null       // YYYY-MM-DD, not a timestamp
  is_verified: boolean
  is_better_than_usual?: boolean
  source_priority: number
  confidence_score: number
  source_url?: string
  last_seen_at?: string
  card?: {
    id?: string
    name: string
    slug: string
    image_url: string | null
    referral_url?: string | null
    issuer: { slug: string; name: string }
  }
}

interface ApiCard {
  id: string
  name: string
  slug: string
  card_type: string
  tier: string
  annual_fee: number
  annual_fee_waived_first_year: boolean
  rewards_program: string | null
  rewards_type: 'points' | 'cashback' | 'hybrid'
  earn_rate_base: number | null
  earn_rate_multipliers: Record<string, number> | null
  transfer_partners?: string[] | null
  lounge_access: boolean
  travel_insurance: boolean
  purchase_protection: boolean
  foreign_transaction_fee: number | null
  credit_score_min?: string | null
  apply_url: string | null
  referral_url: string | null
  image_url: string | null
  short_description: string | null
  pros?: string[]
  cons?: string[]
  best_for?: string[]
  min_income?: number | null
  is_featured: boolean
  tags: string[]
  issuer: { id: string; name: string; slug: string; website?: string }
  current_offers?: ApiOffer[]   // list + detail endpoint (new field name)
}

export interface ApiIssuer {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website: string
}

// ─── Adapters ─────────────────────────────────────────────────────────────────

function toNetwork(cardType: string, issuerSlug: string): CardNetwork {
  if (issuerSlug === 'amex') return 'Amex'
  const t = cardType?.toLowerCase()
  if (t === 'mastercard') return 'Mastercard'
  if (t === 'amex')       return 'Amex'
  if (t === 'discover')   return 'Discover'
  return 'Visa'
}

function toRewardsType(type: string): RewardsType {
  if (type === 'cashback') return 'cash-back'
  if (type === 'hybrid')   return 'cash-back'
  return 'flexible-points'
}

function toCategories(card: ApiCard): CardCategory[] {
  const cats: CardCategory[] = []
  const tags = card.tags ?? []

  // No annual fee — trust API fee value (fixed upstream)
  if (card.annual_fee === 0) cats.push('no-fee')

  // Premium — tier-based OR premium tag (catches mid-tier premium cards like Amex Gold, Cobalt)
  if (card.tier === 'premium' || card.tier === 'super-premium' || tags.includes('premium')) cats.push('premium')

  // Cash back — rewards_type OR cashback tag (API marks many cash-back cards as rewards_type:'points')
  if (card.rewards_type === 'cashback' || tags.includes('cashback')) cats.push('cash-back')

  // Travel — travel, airline, or hotel tag
  if (tags.includes('travel') || tags.includes('airline') || tags.includes('hotel')) cats.push('travel')

  // Business
  if (tags.includes('business')) cats.push('business')

  // Student
  if (tags.includes('student')) cats.push('student')

  // Points — points-earning cards not already in cash-back
  if (card.rewards_type === 'points' && !cats.includes('cash-back') && !cats.includes('travel')) cats.push('points')

  if (cats.length === 0) cats.push('points')
  return cats
}

const MULTIPLIER_LABEL: Record<string, string> = {
  groceries:        'Groceries',
  grocery:          'Groceries',
  dining:           'Dining & restaurants',
  gas:              'Gas & fuel',
  travel:           'Travel',
  transit:          'Transit & commuting',
  streaming:        'Streaming services',
  drugstore:        'Drugstore & pharmacy',
  entertainment:    'Entertainment',
  foreign_currency: 'Foreign currency',
  other:            'Everything else',
}

function toEarnRates(card: ApiCard): EarnRate[] {
  const rates: EarnRate[] = []
  const unit = card.rewards_type === 'cashback' ? 'percent' : 'points'
  const seen = new Set<string>()

  if (card.earn_rate_multipliers) {
    for (const [key, rate] of Object.entries(card.earn_rate_multipliers)) {
      const label = MULTIPLIER_LABEL[key] ?? key
      if (!seen.has(label)) {
        rates.push({ category: label, rate, unit })
        seen.add(label)
      }
    }
  }

  if (card.earn_rate_base && !seen.has('Everything else')) {
    rates.push({ category: 'Everything else', rate: card.earn_rate_base, unit })
  }

  if (rates.length === 0) {
    rates.push({ category: 'All purchases', rate: 1, unit })
  }

  return rates
}

export function adaptCard(api: ApiCard): CreditCard {
  const offer = api.current_offers?.[0]
  const cashback = offer?.cashback_value ? parseFloat(offer.cashback_value) : null

  const welcomeBonus = offer?.headline ?? undefined
  const bonusSummary = offer
    ? offer.points_value
      ? `Earn ${offer.points_value.toLocaleString()} ${api.rewards_program ?? 'points'}`
      : cashback
        ? `${cashback}% cash back welcome offer`
        : offer.headline
    : undefined

  // Only set affiliateLink/applyUrl when a real URL exists
  const applyLink = api.referral_url ?? api.apply_url ?? undefined

  return {
    id:                        api.slug,
    slug:                      api.slug,
    name:                      api.name,
    issuer:                    api.issuer.name,
    network:                   toNetwork(api.card_type, api.issuer.slug),
    annualFee:                 api.annual_fee ?? 0,
    annualFeeWaived:           api.annual_fee_waived_first_year ? 'First year waived' : undefined,
    rewardsType:               toRewardsType(api.rewards_type),
    pointsProgram:             api.rewards_program ?? undefined,
    earnRates:                 toEarnRates(api),
    welcomeBonus,
    bonusSummary,
    perks:                     [],
    insurance:                 { travelMedical: api.travel_insurance, purchaseProtection: api.purchase_protection },
    foreignTransactionFee:     api.foreign_transaction_fee !== null && api.foreign_transaction_fee > 0,
    loungeAccess:              api.lounge_access ? 'Included' : undefined,
    bestFor:                   api.best_for ?? [],
    pros:                      api.pros ?? [],
    cons:                      api.cons ?? [],
    affiliateLink:             applyLink,
    applyUrl:                  applyLink,
    imageUrl:                  api.image_url ?? undefined,
    featured:                  api.is_featured,
    editorsPick:               api.is_featured && (api.tags?.includes('editors-pick') ?? false),
    tags:                      api.tags ?? [],
    categories:                toCategories(api),
    lastUpdated:               new Date().toISOString().split('T')[0],
    incomeRequirementPersonal: api.min_income ?? undefined,
    shortDescription:          api.short_description ?? undefined,
    transferPartners:          api.transfer_partners ?? undefined,
    creditScoreMin:            api.credit_score_min ?? undefined,
    allOffers:                 api.current_offers?.map(o => ({
      id:                o.id,
      headline:          o.headline,
      pointsValue:       o.points_value ?? undefined,
      cashbackValue:     o.cashback_value ? parseFloat(o.cashback_value) : undefined,
      spendRequirement:  o.spend_requirement ?? undefined,
      spendTimeframeDays:o.spend_timeframe_days ?? undefined,
      isLimitedTime:     o.is_limited_time,
      expiresAt:         o.expires_at ?? undefined,
      isVerified:        o.is_verified,
      confidenceScore:   o.confidence_score,
    })) ?? undefined,
  }
}

export function adaptOffer(api: ApiOffer): CardOffer {
  const card = api.card
  const cashback = api.cashback_value ? parseFloat(api.cashback_value) : null

  // Safe expires_at parsing (treat as end-of-day to avoid UTC offset issues)
  const offerExpiry = api.expires_at ? api.expires_at : undefined

  return {
    id:                api.id,
    cardId:            card?.slug ?? api.card_id ?? '',
    cardSlug:          card?.slug ?? '',
    cardName:          card?.name ?? 'Unknown Card',
    issuer:            card?.issuer?.name ?? '',
    offerType:         api.is_limited_time ? 'limited-time' : 'welcome-bonus',
    headline:          api.headline,
    bonusAmount:       api.points_value ?? cashback ?? undefined,
    bonusUnit:         api.points_value ? 'points' : cashback ? 'percent' : undefined,
    spendRequirement:  api.spend_requirement
      ? `$${api.spend_requirement.toLocaleString()}${api.spend_timeframe_days ? ` in ${Math.round(api.spend_timeframe_days / 30)} months` : ''}`
      : undefined,
    spendAmount:       api.spend_requirement ?? undefined,
    spendPeriodMonths: api.spend_timeframe_days ? Math.round(api.spend_timeframe_days / 30) : undefined,
    offerExpiry,
    isLimitedTime:     api.is_limited_time,
    affiliateLink:     card?.referral_url ?? api.source_url ?? undefined,
    imageUrl:          card?.image_url ?? undefined,
    featured:          api.confidence_score >= 70,
    lastUpdated:       api.last_seen_at ?? new Date().toISOString(),
    tags:              [],
  }
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function fetchCards(params?: {
  issuer?: string
  tier?: string
  rewards_type?: string
  tags?: string
  featured?: boolean
  limit?: number
  page?: number
}): Promise<CreditCard[]> {
  try {
    const qs = new URLSearchParams()
    if (params?.issuer)       qs.set('issuer', params.issuer)
    if (params?.tier)         qs.set('tier', params.tier)
    if (params?.rewards_type) qs.set('rewards_type', params.rewards_type)
    if (params?.tags)         qs.set('tags', params.tags)
    if (params?.featured)     qs.set('featured', 'true')
    if (params?.limit)        qs.set('limit', String(params.limit))
    if (params?.page)         qs.set('page', String(params.page))

    const res = await fetch(`${API}/api/cards?${qs}`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const { cards } = await res.json()
    return (cards as ApiCard[]).map(adaptCard)
  } catch {
    return []
  }
}

export async function fetchCard(slug: string): Promise<CreditCard | null> {
  try {
    const res = await fetch(`${API}/api/cards/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const { card } = await res.json()
    return adaptCard(card as ApiCard)
  } catch {
    return null
  }
}

export async function fetchOffers(params?: {
  limited?: boolean
  limit?: number
  page?: number
}): Promise<CardOffer[]> {
  try {
    const qs = new URLSearchParams()
    if (params?.limited) qs.set('limited', 'true')
    qs.set('limit', String(params?.limit ?? 50))
    if (params?.page) qs.set('page', String(params.page))

    const res = await fetch(`${API}/api/offers?${qs}`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const { offers } = await res.json()
    const PLACEHOLDER = ['no bonus offer', 'new offer', 'please fill in']
    return (offers as ApiOffer[])
      .filter(o => {
        const h = (o.headline ?? '').trim().toLowerCase()
        return h.length > 0 && !PLACEHOLDER.some(p => h.includes(p))
      })
      .map(adaptOffer)
  } catch {
    return []
  }
}

export async function fetchIssuers(): Promise<ApiIssuer[]> {
  try {
    const res = await fetch(`${API}/api/issuers`, { next: { revalidate: 86400 } })
    if (!res.ok) return []
    const { issuers } = await res.json()
    return issuers as ApiIssuer[]
  } catch {
    return []
  }
}

export async function trackClick(cardId: string, offerId?: string, sourcePage?: string) {
  try {
    fetch(`${API}/api/track-click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card_id: cardId, offer_id: offerId, source_page: sourcePage }),
    })
  } catch {
    // non-critical — fire and forget
  }
}
