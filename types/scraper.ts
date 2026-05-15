// types/scraper.ts
// Types used by the scraper pipeline only. Kept separate from types/index.ts
// which defines API-response shapes for the frontend components.

export type OfferType = 'welcome_bonus' | 'additional_offer' | 'referral'
export type RateType  = 'fixed' | 'variable' | 'hybrid'

export interface ScrapeResult {
  scraper: string
  status: 'success' | 'partial' | 'failed'
  records_found: number
  records_updated: number
  records_skipped: number
  error?: string
  duration_ms: number
}

// Output shape every scraper's scrape() method returns
export interface ScrapedOffer {
  card_name: string
  issuer_slug: string
  offer_type: OfferType
  headline: string
  details?: string
  points_value?: number
  cashback_value?: number
  spend_requirement?: number
  spend_timeframe_days?: number
  extra_perks?: string[]
  is_limited_time?: boolean
  expires_at?: string
  source_url: string
  apply_url?: string
  image_url?: string
  earn_rate_multipliers?: Record<string, number>

  // Card-level fields written back to credit_cards (null-guarded)
  card_annual_fee?: number
  card_annual_fee_waived?: boolean
  card_supplementary_fee?: number
  card_foreign_transaction_fee?: number | null
  card_min_income?: number
  card_min_household_income?: number
  card_purchase_rate?: number
  card_cash_advance_rate?: number
  card_balance_transfer_rate?: number

  // Per-offer trust overrides (take precedence over scraper class defaults)
  sourcePriority?: number
  isVerified?: boolean

  // Pre-resolved card UUID — skips the card name lookup/creation step entirely
  _card_id?: string

  // Extended card detail table rows (upserted after card_id is resolved)
  insurance_rows?: Array<{
    coverage_type: string
    maximum?: string
    details?: string
  }>

  earn_rate_rows?: Array<{
    category: string
    rate_multiplier: number
    details: string
  }>

  transfer_partner_rows?: Array<{
    partner_name: string
    ratio?: string
    transfer_time?: string
    alliance?: string
    best_for?: string
  }>

  credit_rows?: Array<{
    credit_type: string
    amount?: number
    details?: string
  }>

  lounge_access_rows?: Array<{
    lounge_network: string
    visits_per_year?: number
    guest_policy?: string
    details?: string
  }>
}

export interface ScrapedMortgageRate {
  lender: string
  lender_slug: string
  rate_type: RateType
  term_years: number
  rate: number
  posted_rate?: number
  insured_rate?: number
  uninsured_rate?: number
  source_url: string
  notes?: string
}

export interface OfferHistory {
  id: string
  card_id: string
  offer_type: string
  headline: string
  points_value: number | null
  cashback_value: number | null
  spend_requirement: number | null
  spend_timeframe_days: number | null
  source_priority: number
  first_seen_at: string
  last_seen_at: string
  is_active: boolean
  created_at: string
}

export interface OfferHistoryStats {
  card_id: string
  offer_type: string
  all_time_high_points: number | null
  avg_points_12mo: number | null
  all_time_high_cashback: number | null
  avg_cashback_12mo: number | null
  total_offers_seen: number
}
