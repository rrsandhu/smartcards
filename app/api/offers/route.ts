// Public API — for external frontend use only
import { NextRequest, NextResponse } from 'next/server'
import { getActiveOffers, getOfferHistoryStats, supabaseAdmin } from '@/lib/supabase'
import { canonicalProgram } from '@/lib/sources'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limitedOnly = searchParams.get('limited') === 'true'
  const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1'))
  const limit = Math.min(100, parseInt(searchParams.get('limit') ?? '20'))
  try {
    let offers: any[], total: number, valuationsResult: any
    try {
      ;[{ data: offers, total }, valuationsResult] = await Promise.all([
        getActiveOffers(limitedOnly, page, limit),
        supabaseAdmin.from('points_valuations').select('program, cpp_low, cpp_mid, cpp_high'),
      ])
    } catch (fetchErr) {
      console.error('/api/offers fetch stage failed:', fetchErr)
      throw fetchErr
    }

    if (valuationsResult.error) {
      console.warn('/api/offers points_valuations query failed (CPP values unavailable):', valuationsResult.error.message)
    }
    const valuationMap = new Map<string, { cpp_low: number; cpp_mid: number; cpp_high: number }>(
      (valuationsResult.data ?? []).map((v: any) => [v.program, { cpp_low: Number(v.cpp_low), cpp_mid: Number(v.cpp_mid), cpp_high: Number(v.cpp_high) }])
    )

    // Enrich with is_better_than_usual and estimated first-year value
    const cardIds = Array.from(new Set(offers.map((o: any) => o.card_id).filter(Boolean)))
    const statsMap = await getOfferHistoryStats(cardIds as string[])

    const enriched = offers.map((o: any) => {
      const stats = statsMap.get(`${o.card_id}:${o.offer_type}`)
      let is_better_than_usual = false
      if (stats) {
        if (o.points_value   != null && stats.avg_points_12mo   != null && o.points_value   > stats.avg_points_12mo)   is_better_than_usual = true
        if (o.cashback_value != null && stats.avg_cashback_12mo != null && o.cashback_value > stats.avg_cashback_12mo) is_better_than_usual = true
      }

      const card         = o.card
      const cpp          = valuationMap.get(canonicalProgram(card?.rewards_program) ?? '')
      const annualFee    = card?.annual_fee ?? 0
      const annualCredits = (card?.credits ?? [])
        .reduce((sum: number, c: any) => sum + (Number(c.amount) || 0), 0)

      let bonus_points = o.points_value ?? 0
      if (o.is_monthly_bonus && o.monthly_points_value && o.bonus_months) {
        bonus_points = o.monthly_points_value * o.bonus_months
      }
      const cashback = o.cashback_value ? parseFloat(o.cashback_value) : 0

      let estimated_value_low:  number | null = null
      let estimated_value_mid:  number | null = null
      let estimated_value_high: number | null = null

      if (bonus_points > 0 && cpp) {
        estimated_value_low  = Math.round((bonus_points * cpp.cpp_low  / 100) + annualCredits - annualFee)
        estimated_value_mid  = Math.round((bonus_points * cpp.cpp_mid  / 100) + annualCredits - annualFee)
        estimated_value_high = Math.round((bonus_points * cpp.cpp_high / 100) + annualCredits - annualFee)
      } else if (cashback > 0) {
        const val = Math.round(cashback + annualCredits - annualFee)
        estimated_value_low  = val
        estimated_value_mid  = val
        estimated_value_high = val
      }

      return { ...o, is_better_than_usual, estimated_value_low, estimated_value_mid, estimated_value_high }
    })

    // Group by card — one object per card with welcome_bonus + additional_offers nested.
    // Offer ordering from getActiveOffers (source_priority ASC, points DESC) is preserved,
    // so the first welcome_bonus seen per card is always the highest-trust one.
    const cardMap = new Map<string, any>()
    for (const offer of enriched) {
      const { card, card_id, ...offerData } = offer
      if (!cardMap.has(card_id)) {
        cardMap.set(card_id, {
          ...card,
          has_no_bonus: card.has_no_bonus ?? false,
          welcome_bonus: null,
          additional_offers: [],
        })
      }
      const entry = cardMap.get(card_id)!
      if (offer.offer_type === 'welcome_bonus' && !entry.welcome_bonus) {
        entry.welcome_bonus = { ...offerData, card_id }
      } else if (offer.offer_type !== 'welcome_bonus') {
        entry.additional_offers.push({ ...offerData, card_id })
      }
    }

    // Sort cards by estimated first-year value of their best offer (welcome_bonus first, then additional)
    const cards = Array.from(cardMap.values()).sort((a, b) => {
      const aVal = a.welcome_bonus?.estimated_value_mid ?? a.additional_offers[0]?.estimated_value_mid ?? -Infinity
      const bVal = b.welcome_bonus?.estimated_value_mid ?? b.additional_offers[0]?.estimated_value_mid ?? -Infinity
      return bVal - aVal
    })

    return NextResponse.json({ cards, count: cards.length, total, page, limit })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('/api/offers error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
