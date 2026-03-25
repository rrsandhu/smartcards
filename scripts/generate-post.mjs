/**
 * generate-post.mjs
 *
 * Calls the Anthropic API to write a new Canadian finance blog post,
 * then appends it to data/generated-articles.json.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-post.mjs
 *
 * Or set ANTHROPIC_API_KEY in a .env file and run via the npm script:
 *   npm run blog:generate
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './load-env.mjs'

config() // load .env / .env.local

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '..', 'data', 'generated-articles.json')

// ─── Topic rotation ────────────────────────────────────────────────────────────

const TOPICS = [
  {
    category: 'points-deals',
    prompt: 'Write about the best Aeroplan redemption sweet spots and transfer bonuses available to Canadians right now in 2026. Include specific point costs, routes, and partner airlines.',
  },
  {
    category: 'guides',
    prompt: 'Write a comprehensive guide to maximizing the American Express Cobalt Card in Canada in 2026. Cover earn rates, transfer strategy, best redemption options, and tips most cardholders miss.',
  },
  {
    category: 'credit-card-deals',
    prompt: 'Review the top Canadian travel credit card welcome bonuses and limited-time offers available in 2026. Compare the net first-year value of each offer.',
  },
  {
    category: 'points-deals',
    prompt: 'Write about how Canadians can book business class flights to Japan, Singapore, or Southeast Asia using Aeroplan and Amex Membership Rewards points in 2026. Include specific airlines, point costs, and booking tips.',
  },
  {
    category: 'guides',
    prompt: 'Explain the best Canadian credit card points transfer strategies for 2026 — which bank currencies to use, which airline partners offer the best value, and how to time transfers.',
  },
  {
    category: 'credit-card-deals',
    prompt: 'Compare the top no-fee Canadian travel credit cards in 2026. Which cards offer the best ongoing earn rates, perks, and welcome bonuses without an annual fee?',
  },
  {
    category: 'points-deals',
    prompt: 'Write about Amex Membership Rewards transfer partner strategies for Canadians in 2026. Which partners deliver the best cents-per-point value and how to find availability.',
  },
  {
    category: 'guides',
    prompt: 'Write a beginner-friendly guide to earning and redeeming Scene+ points in Canada in 2026. Cover how to earn at Sobeys, Cineplex, and Scotiabank, and the best ways to redeem.',
  },
]

// ─── Image pools by category ───────────────────────────────────────────────────

const IMAGES = {
  'points-deals': [
    { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80', alt: 'Airplane wing at sunset over the clouds' },
    { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80', alt: 'Airplane on a runway at dusk' },
    { url: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1200&auto=format&fit=crop&q=80', alt: 'View from an airplane window above the clouds' },
    { url: 'https://images.unsplash.com/photo-1583202507519-1b5b7f54c4b0?w=1200&auto=format&fit=crop&q=80', alt: 'Luxury business class airplane seat' },
    { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80', alt: 'Travel adventure — map and planning items on a wooden table' },
  ],
  'guides': [
    { url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&auto=format&fit=crop&q=80', alt: 'World map spread open on a table with coffee' },
    { url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80', alt: 'Person reviewing financial documents and planning' },
    { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80', alt: 'Notebook and pen for planning and strategy' },
    { url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80', alt: 'Person planning a trip on a laptop with coffee' },
  ],
  'credit-card-deals': [
    { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80', alt: 'Person tapping a credit card on a payment terminal' },
    { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80', alt: 'Credit cards fanned out on a table' },
    { url: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=1200&auto=format&fit=crop&q=80', alt: 'Close-up of a premium credit card' },
  ],
}

// ─── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert Canadian personal finance and travel rewards blogger for PointsNorth.ca. You write authoritative, practical content about maximizing Canadian credit card points — specifically Aeroplan, Amex Membership Rewards, RBC Avion, and Scene+.

Your audience: Canadians who want to fly business/first class using points, maximize their credit card rewards, and make smart financial decisions.

Respond ONLY with a valid JSON object — no preamble, no markdown fences. Raw JSON only.

Required format:
{
  "title": "Engaging, SEO-friendly title with numbers or specifics when possible",
  "slug": "url-friendly-slug-in-2026",
  "metaDescription": "150-160 character meta description",
  "excerpt": "2-3 sentence summary for article cards (max 200 characters)",
  "tldr": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "intro": "2-3 sentence hook paragraph",
  "sections": [
    {
      "heading": "Section heading",
      "body": "Section content. Be specific — mention actual point costs, CPP values, transfer ratios, airline partner names, real Canadian card names. Minimum 120 words per section."
    }
  ],
  "proTip": "One advanced insider tip most readers won't know",
  "tags": ["aeroplan", "points", "canada", "relevant-tag"],
  "readTime": "X min read"
}`

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pickImage(category) {
  const pool = IMAGES[category] ?? IMAGES['guides']
  return pool[Math.floor(Math.random() * pool.length)]
}

function getNextTopic(existing) {
  // Rotate through topics based on total article count
  return TOPICS[existing.length % TOPICS.length]
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function buildContent(post) {
  const sections = []

  // TL;DR callout
  sections.push({
    type: 'callout',
    calloutType: 'info',
    heading: 'TL;DR',
    body: post.tldr.join(' · '),
  })

  // Intro paragraph
  sections.push({ type: 'paragraph', body: post.intro })

  // Body sections — each becomes h2 + paragraph
  for (const s of post.sections) {
    sections.push({ type: 'h2', heading: s.heading })
    sections.push({ type: 'paragraph', body: s.body })
  }

  // Pro tip callout
  if (post.proTip) {
    sections.push({
      type: 'callout',
      calloutType: 'tip',
      heading: 'Pro tip',
      body: post.proTip,
    })
  }

  return sections
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export async function generatePost() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('❌  ANTHROPIC_API_KEY is not set. Add it to your .env file.')
    process.exit(1)
  }

  // Load existing generated articles
  const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  const topic = getNextTopic(existing)

  console.log(`\n📝  Generating post — category: ${topic.category}`)
  console.log(`    Topic: ${topic.prompt.slice(0, 80)}...`)

  const client = new Anthropic({ apiKey })

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `${SYSTEM_PROMPT}\n\n---\n\n${topic.prompt}`,
      },
    ],
  })

  const raw = message.content.find(b => b.type === 'text')?.text ?? ''
  const clean = raw.replace(/^```(?:json)?|```$/gm, '').trim()

  let generated
  try {
    generated = JSON.parse(clean)
  } catch (e) {
    console.error('❌  Failed to parse Claude response as JSON:', e.message)
    console.error('Raw response (first 500 chars):', raw.slice(0, 500))
    return null
  }

  const image = pickImage(topic.category)
  const now   = new Date().toISOString().split('T')[0]
  const id    = `art-gen-${Date.now()}`
  const slug  = slugify(generated.slug || generated.title) || id

  const article = {
    id,
    slug,
    title:              generated.title,
    excerpt:            generated.excerpt ?? generated.intro?.slice(0, 180) + '…',
    category:           topic.category,
    author:             { name: 'PointsNorth Editorial', title: 'Staff Writer' },
    publishDate:        now,
    heroImageUrl:       image.url,
    heroImageAlt:       image.alt,
    tags:               generated.tags ?? [topic.category],
    readingTimeMinutes: parseInt(generated.readTime) || 7,
    featured:           true,
    metaDescription:    generated.metaDescription ?? '',
    relatedCards:       [],
    relatedArticleIds:  [],
    content:            buildContent(generated),
  }

  // Prepend to front so newest appears first
  existing.unshift(article)
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2))

  console.log(`✅  Post saved: "${article.title}"`)
  console.log(`    Slug: /blog/${article.slug}`)
  console.log(`    File: data/generated-articles.json (${existing.length} total)`)

  return article
}

// Run directly when called as a script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePost().catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}
