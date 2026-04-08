/**
 * search.ts — Full-text search across cards (live API), articles, and tools
 */

import type { CreditCard } from '@/types'
import { articles } from '@/data/articles'
import { tools } from '@/data/tools'
import type { SearchResult } from '@/types'

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

function searchCards(cards: CreditCard[], q: string): SearchResult[] {
  return cards
    .filter(card => {
      const haystack = normalize(
        [card.name, card.issuer, card.bonusSummary, card.shortDescription, ...card.tags, ...card.bestFor].join(' ')
      )
      return haystack.includes(q)
    })
    .map(card => ({
      type: 'card' as const,
      id: card.id,
      slug: card.slug,
      title: card.name,
      excerpt: card.shortDescription ?? card.bonusSummary ?? '',
      url: `/credit-cards/${card.slug}`,
      tags: card.tags,
    }))
}

function searchArticles(q: string): SearchResult[] {
  return articles
    .filter(article => {
      const haystack = normalize([article.title, article.excerpt, ...article.tags].join(' '))
      return haystack.includes(q)
    })
    .map(article => ({
      type: 'article' as const,
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      url: `/blog/${article.slug}`,
      tags: article.tags,
    }))
}

function searchTools(q: string): SearchResult[] {
  return tools
    .filter(tool => {
      const haystack = normalize([tool.name, tool.description, ...tool.tags].join(' '))
      return haystack.includes(q)
    })
    .map(tool => ({
      type: 'tool' as const,
      id: tool.id,
      slug: tool.slug,
      title: tool.name,
      excerpt: tool.description,
      url: `/tools/${tool.slug}`,
      tags: tool.tags,
    }))
}

/** Synchronous search — pass live cards fetched by the caller */
export function search(query: string, liveCards: CreditCard[] = []): SearchResult[] {
  if (!query || query.trim().length < 2) return []
  const q = normalize(query)
  return [
    ...searchCards(liveCards, q),
    ...searchArticles(q),
    ...searchTools(q),
  ]
}
