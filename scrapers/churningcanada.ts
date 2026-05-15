// scrapers/churningcanada.ts
// Scrapes the r/churningcanada community-maintained GitHub repo for Canadian CC offers.
// Source: https://github.com/stnlykwk/canada-best-cc-offers
//
// Rules:
//   • Never creates new credit_cards rows — offer-only upsert.
//   • Cards are matched via an alias map (README short name → DB slug) with a
//     keyword-search fallback.  Unknown cards are warned and skipped.
//   • FYF (First Year Free) sets annual_fee_waived_first_year = true on the card.
//   • Portal incentive references (CCG, FF, FW, GCR) are completely ignored.
//   • SHA-gating: only re-scrapes when the README's latest commit SHA differs
//     from the one stored in scrape_logs after the last successful run.

import { BaseScraper } from '@/lib/scraper-base'
import { supabaseAdmin, logScrape } from '@/lib/supabase'
import { expandBonusAbbreviations } from '@/lib/churning-glossary'
import type { ScrapedOffer, ScrapeResult } from '@/types/scraper'

const README_URL   = 'https://raw.githubusercontent.com/stnlykwk/canada-best-cc-offers/main/README.md'
const COMMITS_API  = 'https://api.github.com/repos/stnlykwk/canada-best-cc-offers/commits?path=README.md&per_page=1'
const SOURCE_URL   = 'https://github.com/stnlykwk/canada-best-cc-offers'
const SCRAPER_NAME = 'churningcanada'
const SHA_LOG_NAME = 'churningcanada-sha'

// ── Alias map: README card name (lowercased + trimmed) → canonical DB slug ───
const CARD_SLUG_ALIASES: Record<string, string> = {
  // Amex
  'amex business platinum':         'amex-biz-platinum',
  'amex platinum':                  'amex-platinum',
  'amex cobalt':                    'amex-cobalt',
  'amex gold personal':             'american-express-gold-rewards-card',
  'amex marriott personal':         'amex-marriott-pers',
  'amex marriott business':         'amex-marriott-biz',
  'amex aeroplan core':             'american-express-aeroplan-card',
  'amex aeroplan reserve':          'american-express-aeroplan-reserve-card',
  'amex business gold':             'amex-biz-gold',
  // BMO
  'bmo ascend we mc':               'bmo-ascend-world-elite-mastercard',
  'bmo we air miles':               'bmo-we-air-miles',
  'bmo eclipse visa infinite':      'bmo-eclipse-visa-infinite',
  'bmo viporter we mc':             'bmo-viporter-we-mc',
  // CIBC
  'cibc aventura visa infinite':    'cibc-aventura-visa-infinite',
  'cibc aventura visa gold':        'cibc-aventura-gold-visa',
  'cibc dividend visa infinite':    'cibc-dividend-visa-infinite',
  'cibc aeroplan visa infinite':    'cibc-aeroplan-visa-infinite',
  'cibc aeroplan visa privilege':   'cibc-aeroplan-visa-infinite-privilege',
  // MBNA
  'mbna rewards we mc':             'mbna-rewards-we-mc',
  // RBC
  'rbc avion visa platinum':        'rbc-visa-platinum-avion',
  'rbc avion visa infinite':        'rbc-avion-visa-infinite',
  'rbc westjet we':                 'westjet-rbc-world-elite',
  'rbc british airways visa infinite': 'rbc-british-airways-visa-infinite',
  // Scotiabank
  'scotia passport infinite':       'scotiabank-passport-visa-infinite',
  'scotia amex gold':               'scotiabank-gold-american-express-card',
  'scotia momentum visa infinite':  'scotiabank-momentum-visa-infinite',
  'scotia amex platinum':           'scotiabank-american-express-platinum-card',
  // TD
  'td fct visa infinite':           'td-first-class-travel',
  'td cashback visa infinite':      'td-cash-back-visa-infinite-card',
  'td fct visa platinum':           'td-platinum-travel-visa-card',
  'td aeroplan platinum':           'td-aeroplan-visa-platinum-card',
  'td aeroplan visa infinite':      'td-aeroplan-visa-infinite',
  'td aeroplan visa privilege':     'td-aeroplan-visa-privilege',
}

function normalizeCardName(name: string): string {
  return name
    .replace(/\bBiz\b/g,   'Business')
    .replace(/\bpers\b/gi, 'Personal')
    .replace(/\bInf\b/g,   'Infinite')
    .replace(/\bpts\b/gi,  'Points')
}

const FUZZY_STOP = new Set([
  'card', 'visa', 'from', 'with', 'world', 'elite',
  'infinite', 'mastercard', 'rewards', 'preferred', 'platinum',
])

function stripLink(s: string): string {
  return s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim()
}

function parseApplyBy(cell: string): string | undefined {
  const text = cell.replace(/<br\s*\/?>/gi, ' ')
  const DATE_RE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},?\s+\d{4}/gi
  const dates: Date[] = []
  for (const m of text.matchAll(DATE_RE)) {
    const d = new Date(m[0].replace(/\./g, ''))
    if (!isNaN(d.getTime())) dates.push(d)
  }
  if (!dates.length) return undefined
  dates.sort((a, b) => a.getTime() - b.getTime())
  return dates[0].toISOString().split('T')[0]
}

function parseSpendAmount(cell: string): number | undefined {
  const match = cell.match(/\$?([\d,]+)/)
  if (!match) return undefined
  const n = parseInt(match[1].replace(/,/g, ''))
  return isNaN(n) ? undefined : n
}

function isCashbackBonus(bonus: string): boolean {
  return /\d+\s*%/.test(bonus) || /^\$[\d,]+$/.test(bonus.trim())
}

function parsePoints(bonus: string): number | undefined {
  if (isCashbackBonus(bonus)) return undefined
  const match = bonus.match(/([\d,]+)/)
  if (!match) return undefined
  const n = parseInt(match[1].replace(/,/g, ''))
  return n > 100 ? n : undefined
}

function parseCashbackPct(bonus: string): number | undefined {
  const match = bonus.match(/([\d.]+)\s*%/)
  if (!match) return undefined
  return parseFloat(match[1])
}

interface TableRow {
  cardName: string
  annualFee: string
  welcomeBonus: string
  spendRequirement: string
  applyBy: string
}

function parseMarkdownTables(markdown: string): TableRow[] {
  const rows: TableRow[] = []
  const lines = markdown.split('\n')
  let inTable = false
  let pastSeparator = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed.startsWith('|')) {
      inTable = false
      pastSeparator = false
      continue
    }

    const cells = trimmed
      .split('|')
      .map(c => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1)

    if (!cells.length) continue

    if (!inTable && cells.some(c => /card\s+name|annual\s+fee/i.test(c))) {
      inTable = true
      pastSeparator = false
      continue
    }

    if (inTable && !pastSeparator) {
      if (cells.every(c => /^[-:|]+$/.test(c))) {
        pastSeparator = true
        continue
      }
    }

    if (!inTable || !pastSeparator) continue
    if (cells.length < 4) continue

    const clean = (s: string) => s.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim()

    rows.push({
      cardName:         stripLink(cells[0]),
      annualFee:        clean(cells[1]),
      welcomeBonus:     clean(cells[2]),
      spendRequirement: clean(cells[3]),
      applyBy:          cells[4] ? cells[4] : '',
    })
  }

  return rows
}

export class ChurningCanadaScraper extends BaseScraper {
  name       = SCRAPER_NAME
  issuerSlug = 'amex'  // unused — each offer resolves its own card

  protected sourcePriority = 3
  protected sourceName     = 'churningcanada'
  protected isVerified     = true

  private async resolveCardId(readmeName: string, issuerSlug: string): Promise<string | null> {
    const key = normalizeCardName(readmeName).toLowerCase().replace(/\s+/g, ' ').trim()

    const targetSlug = CARD_SLUG_ALIASES[key]
    if (targetSlug) {
      const { data } = await supabaseAdmin
        .from('credit_cards')
        .select('id, is_active')
        .eq('slug', targetSlug)
        .maybeSingle()
      if (data) {
        if (!data.is_active) {
          console.log(`[${SCRAPER_NAME}] card "${targetSlug}" is inactive, skipping reactivation`)
        }
        return data.id
      }
      console.warn(`[${SCRAPER_NAME}] alias slug "${targetSlug}" not found in DB for "${readmeName}"`)
    }

    const { data: issuer } = await supabaseAdmin
      .from('issuers')
      .select('id')
      .eq('slug', issuerSlug)
      .maybeSingle()
    if (!issuer) return null

    const keywords = key
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 4 && !FUZZY_STOP.has(w))
      .slice(0, 3)

    for (const kw of keywords) {
      const { data: matches } = await supabaseAdmin
        .from('credit_cards')
        .select('id')
        .eq('issuer_id', issuer.id)
        .ilike('name', `%${kw}%`)
        .eq('is_active', true)
        .limit(1)
      if (matches?.length) return matches[0].id
    }

    return null
  }

  private resolveIssuerSlug(cardName: string): string {
    const lower = cardName.toLowerCase()
    if (/\bscotia/i.test(lower))                           return 'scotiabank'
    if (/\btd\b/i.test(lower))                             return 'td'
    if (/\bcibc\b/i.test(lower))                           return 'cibc'
    if (/\bmbna\b/i.test(lower))                           return 'mbna'
    if (/\brbc\b|westjet|british\s+airways/i.test(lower))  return 'rbc'
    if (/\bbmo\b/i.test(lower))                            return 'bmo'
    if (/\bamex\b|american\s+express/i.test(lower))        return 'amex'
    if (/\bnational\s+bank/i.test(lower))                  return 'national-bank'
    if (/\bdesjardins/i.test(lower))                       return 'desjardins'
    if (/\btangerine/i.test(lower))                        return 'tangerine'
    return 'unknown'
  }

  private async fetchLatestSha(): Promise<string | null> {
    try {
      const res = await fetch(COMMITS_API, {
        headers: {
          'User-Agent': 'smart-card-offers-scraper',
          'Accept':     'application/vnd.github+json',
        },
      })
      if (!res.ok) return null
      const data = await res.json()
      return (data as Array<{ sha: string }>)?.[0]?.sha ?? null
    } catch (err) {
      console.error(`[${SCRAPER_NAME}] fetchLatestSha error:`, err)
      return null
    }
  }

  private async getLastScrapedSha(): Promise<string | null> {
    const { data, error } = await supabaseAdmin
      .from('scrape_logs')
      .select('error_message')
      .eq('scraper_name', SHA_LOG_NAME)
      .order('ran_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error) console.warn(`[${SCRAPER_NAME}] getLastScrapedSha DB error: ${error.message}`)
    const msg = (data as { error_message?: string } | null)?.error_message ?? ''
    return msg.startsWith('sha:') ? msg.slice(4) : null
  }

  private async storeScrapedSha(sha: string): Promise<void> {
    const { error } = await supabaseAdmin.from('scrape_logs').insert({
      scraper_name:    SHA_LOG_NAME,
      status:          'success',
      records_found:   0,
      records_updated: 0,
      records_skipped: 0,
      error_message:   `sha:${sha}`,
      duration_ms:     0,
    })
    if (error) console.warn(`[${SCRAPER_NAME}] storeScrapedSha failed: ${error.message}`)
  }

  async run(): Promise<ScrapeResult> {
    const startTime = Date.now()

    let latestSha: string | null = null
    let lastSha: string | null = null

    try {
      ;[latestSha, lastSha] = await Promise.all([
        this.fetchLatestSha(),
        this.getLastScrapedSha(),
      ])
    } catch (err) {
      console.error(`[${SCRAPER_NAME}] SHA fetch failed:`, err)
    }

    if (latestSha && latestSha === lastSha) {
      const duration_ms = Date.now() - startTime
      await logScrape({
        scraper_name:    SCRAPER_NAME,
        status:          'success',
        records_found:   0,
        records_updated: 0,
        records_skipped: 0,
        duration_ms,
      })
      return { scraper: SCRAPER_NAME, status: 'success', records_found: 0, records_updated: 0, records_skipped: 0, duration_ms }
    }

    const result = await super.run()

    if (latestSha && result.status !== 'failed') {
      await this.storeScrapedSha(latestSha)
    }

    return result
  }

  async scrape(): Promise<ScrapedOffer[]> {
    const res = await fetch(README_URL, {
      headers: {
        'User-Agent':    'smart-card-offers-scraper',
        'Cache-Control': 'no-cache',
      },
    })
    if (!res.ok) throw new Error(`Failed to fetch README: HTTP ${res.status}`)
    const markdown = await res.text()

    const rows = parseMarkdownTables(markdown)
    console.log(`[${SCRAPER_NAME}] parsed ${rows.length} table rows from README`)

    const offers: ScrapedOffer[] = []
    let skipped = 0

    for (const row of rows) {
      const rawBonus = row.welcomeBonus
      if (!rawBonus || rawBonus === '-' || rawBonus.length < 2) continue

      const issuerSlug = this.resolveIssuerSlug(row.cardName)
      if (issuerSlug === 'unknown') {
        console.warn(`[${SCRAPER_NAME}] unresolvable issuer for: "${row.cardName}" — skipping`)
        skipped++
        continue
      }

      const card_id = await this.resolveCardId(row.cardName, issuerSlug)
      if (!card_id) {
        console.warn(`[${SCRAPER_NAME}] no DB match for: "${row.cardName}" — skipping (add to CARD_SLUG_ALIASES if valid)`)
        skipped++
        continue
      }

      const fyf = /\bfyf\b|first\s+year\s+free/i.test(row.annualFee)
      if (fyf) {
        await supabaseAdmin
          .from('credit_cards')
          .update({ annual_fee_waived_first_year: true })
          .eq('id', card_id)
          .eq('annual_fee_waived_first_year', false)
      }

      const bonus = expandBonusAbbreviations(rawBonus)

      const spendAmount  = parseSpendAmount(row.spendRequirement)
      const expires_at   = parseApplyBy(row.applyBy)
      const isCashback   = isCashbackBonus(bonus)

      const parts: string[] = [bonus]
      if (spendAmount) parts.push(`after $${spendAmount.toLocaleString()} spend`)
      if (fyf)         parts.push('(first year free)')
      const headline = parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 250)

      const extra_perks: string[] = []
      if (fyf) extra_perks.push('First year annual fee waived')

      offers.push({
        _card_id:          card_id,
        card_name:         row.cardName,
        issuer_slug:       issuerSlug,
        offer_type:        'welcome_bonus',
        headline,
        points_value:      isCashback ? undefined : parsePoints(bonus),
        cashback_value:    isCashback ? parseCashbackPct(bonus) : undefined,
        spend_requirement: spendAmount,
        is_limited_time:   !!expires_at,
        expires_at,
        extra_perks:       extra_perks.length ? extra_perks : undefined,
        source_url:        SOURCE_URL,
        apply_url:         undefined,
      })
    }

    if (skipped) console.log(`[${SCRAPER_NAME}] skipped ${skipped} unmatched rows`)
    return offers
  }
}
