/**
 * search.ts — Local full-text search across cards, articles, and tools
 * Uses simple keyword matching against local seed data.
 */

import { cards } from '@/data/cards'
import { articles } from '@/data/articles'
import { tools } from '@/data/tools'
import type { SearchResult } from '@/types'

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

export function search(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return []
  const q = normalize(query)
  const results: SearchResult[] = []

  // Search cards
  cards.forEach(card => {
    const haystack = normalize(
      [card.name, card.issuer, card.bonusSummary, ...card.tags, ...card.bestFor].join(' ')
    )
    if (haystack.includes(q)) {
      results.push({
        type: 'card',
        id: card.id,
        slug: card.slug,
        title: card.name,
        excerpt: card.bonusSummary ?? card.editorialReview?.slice(0, 120) ?? '',
        url: `/credit-cards/${card.slug}`,
        tags: card.tags,
      })
    }
  })

  // Search articles
  articles.forEach(article => {
    const haystack = normalize(
      [article.title, article.excerpt, ...article.tags].join(' ')
    )
    if (haystack.includes(q)) {
      results.push({
        type: 'article',
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        url: `/blog/${article.slug}`,
        tags: article.tags,
      })
    }
  })

  // Search tools
  tools.forEach(tool => {
    const haystack = normalize(
      [tool.name, tool.description, ...tool.tags].join(' ')
    )
    if (haystack.includes(q)) {
      results.push({
        type: 'tool',
        id: tool.id,
        slug: tool.slug,
        title: tool.name,
        excerpt: tool.description,
        url: `/tools/${tool.slug}`,
        tags: tool.tags,
      })
    }
  })

  return results
}
