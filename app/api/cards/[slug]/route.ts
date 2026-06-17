// Public API — for external frontend use only
// app/api/cards/[slug]/route.ts
// GET /api/cards/:slug — single card with all active offers, issuer, and full metadata

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, getOfferHistoryStats } from '@/lib/supabase'
import { canonicalProgram } from '@/lib/sources'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabaseAdmin
      .from('credit_cards')
      .select(`
        *,
        issuer:issuers(*),
        current_offers:card_offers(
          id, offer_type, headline, details,
          points_value, cashback_value,
          spend_requirement, spend_timeframe_days,
          extra_perks, is_limited_time, expires_at,
          is_verified, source_priority, last_seen_at,
          confidence_score, source_url, scraped_at,
          is_monthly_bonus, monthly_points_value, monthly_spend_requirement,
          monthly_cashback_value, bonus_months, start_month,
          review_reason, content_source
        ),
        insurance:card_insurance(coverage_type, maximum, details),
        earn_rates:card_earn_rates(category, rate_multiplier, details),
        transfer_partners:card_transfer_partners(partner_name, ratio, transfer_time, alliance, best_for),
        credits:card_credits(credit_type, amount, details),
        lounge_access:card_lounge_access(lounge_network, visits_per_year, guest_policy, details)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .eq('card_offers.is_active', true)
      .eq('card_offers.review_status', 'approved')
      .maybeSingle()

    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Card not found' }, { status: 404 })

    // Fetch offer history stats + CPP valuations in parallel
    const [statsMap, valuationsResult] = await Promise.all([
      getOfferHistoryStats([data.id]),
      supabaseAdmin.from('points_valuations').select('program, cpp_low, cpp_mid, cpp_high'),
    ])

    if (valuationsResult.error) {
      console.warn('/api/cards/[slug] points_valuations query failed:', valuationsResult.error.message)
    }
    const valuationMap = new Map<string, { cpp_low: number; cpp_mid: number; cpp_high: number }>(
      (valuationsResult.data ?? []).map((v: any) => [
        v.program,
        { cpp_low: Number(v.cpp_low), cpp_mid: Number(v.cpp_mid), cpp_high: Number(v.cpp_high) },
      ])
    )

    const cpp          = valuationMap.get(canonicalProgram(data.rewards_program) ?? '')
    const annualFee    = data.annual_fee ?? 0
    const annualCredits = (data.credits ?? []).reduce((sum: number, c: any) => sum + (Number(c.amount) || 0), 0)

    const current_offers = (data.current_offers ?? []).map((o: any) => {
      const stats = statsMap.get(`${data.id}:${o.offer_type}`)
      let is_better_than_usual = false
      const avg_points_12mo   = stats?.avg_points_12mo   ?? null
      const avg_cashback_12mo = stats?.avg_cashback_12mo ?? null
      if (stats) {
        if (o.points_value   != null && avg_points_12mo   != null && o.points_value   > avg_points_12mo)   is_better_than_usual = true
        if (o.cashback_value != null && avg_cashback_12mo != null && o.cashback_value > avg_cashback_12mo) is_better_than_usual = true
      }

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

      return { ...o, is_better_than_usual, avg_points_12mo, avg_cashback_12mo, estimated_value_low, estimated_value_mid, estimated_value_high }
    })

    return NextResponse.json({ card: { ...data, current_offers } })
  } catch (err) {
    console.error('/api/cards/[slug] error:', err)
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 })
  }
}
