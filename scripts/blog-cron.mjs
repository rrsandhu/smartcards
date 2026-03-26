/**
 * blog-cron.mjs
 *
 * Publishes a new blog post immediately on start, then every 10 hours.
 * Posts are read from data/post-queue.json — no API key required.
 * Position is tracked in data/queue-index.json (auto-created).
 *
 * Usage:
 *   node scripts/blog-cron.mjs
 *   npm run blog:start
 *
 * Keep this running alongside `npm run dev`.
 * New posts appear on the site automatically — no rebuild needed.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const QUEUE_FILE     = path.join(__dirname, '..', 'data', 'post-queue.json')
const INDEX_FILE     = path.join(__dirname, '..', 'data', 'queue-index.json')
const ARTICLES_FILE  = path.join(__dirname, '..', 'data', 'generated-articles.json')

const INTERVAL_MS = 10 * 60 * 60 * 1000  // 10 hours

function fmt(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return `${h}h ${m}m`
}

function readIndex() {
  if (!fs.existsSync(INDEX_FILE)) return 0
  try { return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8')).index ?? 0 } catch { return 0 }
}

function writeIndex(i) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify({ index: i }, null, 2))
}

function publishNext() {
  const queue    = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'))
  const existing = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'))
  const idx      = readIndex() % queue.length

  const post = {
    ...queue[idx],
    id:          `art-queue-${Date.now()}`,
    publishDate: new Date().toISOString().split('T')[0],
  }

  // Skip if this slug was already published
  if (existing.some(a => a.slug === post.slug)) {
    console.log(`⏭   Slug already published: ${post.slug} — skipping`)
    writeIndex(idx + 1)
    return null
  }

  existing.unshift(post)
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(existing, null, 2))
  writeIndex(idx + 1)

  console.log(`✅  Post published: "${post.title}"`)
  console.log(`    Slug: /blog/${post.slug}`)
  console.log(`    Queue position: ${idx + 1}/${queue.length} (next index: ${(idx + 1) % queue.length})`)
  return post
}

function run() {
  console.log('🚀  SmartCardOffers blog cron started (queue mode — no API key needed)')
  console.log(`    Publishing a post now, then every ${fmt(INTERVAL_MS)}`)
  console.log('    Press Ctrl+C to stop.\n')

  // Publish immediately on start
  publishNext()

  // Then schedule
  setInterval(() => {
    const next = new Date(Date.now() + INTERVAL_MS)
    console.log(`\n⏰  Scheduled run — next post at ${next.toLocaleTimeString()}`)
    publishNext()
  }, INTERVAL_MS)
}

run()
