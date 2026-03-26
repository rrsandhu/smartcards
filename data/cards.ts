/**
 * cards.ts — Credit card seed data
 *
 * All card data is now fetched live from the Smart Card Offers API.
 * This file retains the helper functions for compatibility.
 */

import type { CreditCard, CardCategory } from '@/types'

export const cards: CreditCard[] = []

// Helper: get card by slug
export function getCardBySlug(slug: string): CreditCard | undefined {
  return cards.find(c => c.slug === slug)
}

// Helper: get featured cards
export function getFeaturedCards(): CreditCard[] {
  return cards.filter(c => c.featured)
}

// Helper: get editor's picks
export function getEditorsPicks(): CreditCard[] {
  return cards.filter(c => c.editorsPick)
}

// Helper: get cards by category
export function getCardsByCategory(category: string): CreditCard[] {
  return cards.filter(c => c.categories.includes(category as CardCategory))
}
