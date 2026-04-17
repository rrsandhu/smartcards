/**
 * offers.ts — Fallback offer data used when the live API is unavailable.
 * All links point to real bank application pages.
 */

import type { CardOffer } from '@/types'

export const offers: CardOffer[] = [
  {
    id: 'offer-amex-cobalt-fallback',
    cardId: 'amex-cobalt',
    cardSlug: 'amex-cobalt',
    cardName: 'American Express Cobalt Card',
    issuer: 'American Express',
    offerType: 'welcome-bonus',
    headline: 'Earn up to 15,000 Amex points in your first year',
    bonusAmount: 15000,
    bonusUnit: 'points',
    spendRequirement: '$12.99/month × 12 months',
    spendAmount: 155.88,
    spendPeriodMonths: 12,
    isLimitedTime: false,
    affiliateLink: 'https://www.americanexpress.com/en-ca/credit-cards/cobalt-card/',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['amex', 'cobalt', 'dining', 'points'],
  },

  {
    id: 'offer-amex-platinum-fallback',
    cardId: 'american-express-platinum-card',
    cardSlug: 'american-express-platinum-card',
    cardName: 'The Platinum Card® from American Express',
    issuer: 'American Express',
    offerType: 'welcome-bonus',
    headline: '70,000 Amex MR points after $10,000 spend in 3 months',
    bonusAmount: 70000,
    bonusUnit: 'points',
    spendRequirement: '$10,000 in 3 months',
    spendAmount: 10000,
    spendPeriodMonths: 3,
    isLimitedTime: false,
    affiliateLink: 'https://www.americanexpress.com/en-ca/credit-cards/platinum-card/',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['amex', 'platinum', 'premium', 'lounge', 'luxury'],
  },

  {
    id: 'offer-td-aeroplan-vi-fallback',
    cardId: 'td-aeroplan-visa-infinite',
    cardSlug: 'td-aeroplan-visa-infinite',
    cardName: 'TD Aeroplan Visa Infinite Card',
    issuer: 'TD',
    offerType: 'welcome-bonus',
    headline: 'Earn up to 20,000 Aeroplan points in your first year',
    bonusAmount: 20000,
    bonusUnit: 'points',
    spendRequirement: '$1,500 in 90 days',
    spendAmount: 1500,
    spendPeriodMonths: 3,
    isLimitedTime: false,
    affiliateLink: 'https://www.td.com/ca/en/personal-banking/products/credit-cards/travel-rewards/aeroplan-visa-infinite-card/',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['td', 'aeroplan', 'air-canada', 'travel'],
  },

  {
    id: 'offer-scotia-passport-vi-fallback',
    cardId: 'scotiabank-passport-visa-infinite-card',
    cardSlug: 'scotiabank-passport-visa-infinite-card',
    cardName: 'Scotiabank Passport™ Visa Infinite* Card',
    issuer: 'Scotiabank',
    offerType: 'welcome-bonus',
    headline: '35,000 Scene+ points after $1,000 spend in 3 months',
    bonusAmount: 35000,
    bonusUnit: 'points',
    spendRequirement: '$1,000 in 3 months',
    spendAmount: 1000,
    spendPeriodMonths: 3,
    isLimitedTime: false,
    affiliateLink: 'https://www.scotiabank.com/ca/en/personal/credit-cards/visa/passport-visa-infinite-card.html',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['scotiabank', 'scene-plus', 'travel', 'no-fx-fee'],
  },

  {
    id: 'offer-bmo-eclipse-vi-fallback',
    cardId: 'bmo-eclipse-visa-infinite',
    cardSlug: 'bmo-eclipse-visa-infinite',
    cardName: 'BMO eclipse Visa Infinite* Card',
    issuer: 'BMO',
    offerType: 'welcome-bonus',
    headline: '60,000 BMO Rewards points + first year annual fee waived',
    bonusAmount: 60000,
    bonusUnit: 'points',
    spendRequirement: '$3,000 in 3 months',
    spendAmount: 3000,
    spendPeriodMonths: 3,
    isLimitedTime: false,
    affiliateLink: 'https://www.bmo.com/en-ca/main/personal/credit-cards/bmo-eclipse-visa-infinite/',
    featured: false,
    lastUpdated: '2026-04-01',
    tags: ['bmo', 'eclipse', 'dining', 'groceries'],
  },

  {
    id: 'offer-rbc-avion-fallback',
    cardId: 'rbc-avion-visa-infinite',
    cardSlug: 'rbc-avion-visa-infinite',
    cardName: 'RBC Avion Visa Infinite Card',
    issuer: 'RBC',
    offerType: 'welcome-bonus',
    headline: 'Earn 35,000 RBC Avion points as a welcome bonus',
    bonusAmount: 35000,
    bonusUnit: 'points',
    spendRequirement: '$5,000 in 6 months',
    spendAmount: 5000,
    spendPeriodMonths: 6,
    isLimitedTime: false,
    affiliateLink: 'https://www.rbcroyalbank.com/credit-cards/avion-visa-infinite/',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['rbc', 'avion', 'travel', 'points'],
  },

  {
    id: 'offer-tangerine-fallback',
    cardId: 'tangerine-money-back',
    cardSlug: 'tangerine-money-back',
    cardName: 'Tangerine Money-Back Credit Card',
    issuer: 'Tangerine',
    offerType: 'welcome-bonus',
    headline: '10% cash back in your first 2 months (up to $100)',
    bonusAmount: 100,
    bonusUnit: 'dollars',
    spendRequirement: 'Up to $1,000 spend in first 2 months',
    spendAmount: 1000,
    spendPeriodMonths: 2,
    isLimitedTime: false,
    affiliateLink: 'https://www.tangerine.ca/en/products/spending/creditcard/money-back/',
    featured: true,
    lastUpdated: '2026-04-01',
    tags: ['tangerine', 'no-fee', 'cash-back'],
  },
]

export function getFeaturedOffers(): CardOffer[] {
  return offers.filter(o => o.featured)
}

export function getOfferByCardId(cardId: string): CardOffer | undefined {
  return offers.find(o => o.cardId === cardId)
}

export function getLimitedTimeOffers(): CardOffer[] {
  return offers.filter(o => o.isLimitedTime)
}
