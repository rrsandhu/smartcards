/**
 * offers.ts — Time-sensitive card offer layer
 *
 * This is SEPARATE from core card data. Welcome bonuses and limited-time
 * promotions change frequently. Update these fields without touching cards.ts.
 *
 * To update an offer: find the entry by cardId and edit the relevant fields.
 * To add a new offer: copy an existing entry and assign a new unique id.
 * To expire an offer: set isLimitedTime: false or update offerExpiry.
 */

import type { CardOffer } from '@/types'

export const offers: CardOffer[] = [
  {
    id: 'offer-amex-cobalt-2024-summer',
    cardId: 'amex-cobalt',
    cardSlug: 'american-express-cobalt',
    cardName: 'American Express Cobalt Card',
    issuer: 'American Express',
    offerType: 'welcome-bonus',
    headline: 'Earn up to 15,000 Amex points in your first year',
    bonusAmount: 15000,
    bonusUnit: 'points',
    spendRequirement: '$12.99/month × 12 months',
    spendAmount: 155.88,
    spendPeriodMonths: 12,
    additionalBonus: '1,250 bonus points each month you spend $500+',
    isLimitedTime: false,
    affiliateLink: '#apply-amex-cobalt',
    featured: true,
    lastUpdated: '2024-07-01',
    tags: ['amex', 'cobalt', 'dining', 'points'],
  },

  {
    id: 'offer-amex-platinum-2024',
    cardId: 'amex-platinum',
    cardSlug: 'american-express-platinum',
    cardName: 'The Platinum Card® from American Express',
    issuer: 'American Express',
    offerType: 'welcome-bonus',
    headline: '70,000 Amex MR points after $10,000 spend in 3 months',
    bonusAmount: 70000,
    bonusUnit: 'points',
    spendRequirement: '$10,000 in 3 months',
    spendAmount: 10000,
    spendPeriodMonths: 3,
    offerExpiry: '2024-12-31',
    isLimitedTime: true,
    affiliateLink: '#apply-amex-platinum',
    featured: true,
    lastUpdated: '2024-07-01',
    tags: ['amex', 'platinum', 'premium', 'lounge', 'luxury'],
  },

  {
    id: 'offer-td-aeroplan-vi-2024',
    cardId: 'td-aeroplan-vi',
    cardSlug: 'td-aeroplan-visa-infinite',
    cardName: 'TD Aeroplan Visa Infinite Card',
    issuer: 'TD',
    offerType: 'welcome-bonus',
    headline: '20,000 Aeroplan points + first year annual fee rebate',
    bonusAmount: 20000,
    bonusUnit: 'miles',
    spendRequirement: '$1,500 in 90 days',
    spendAmount: 1500,
    spendPeriodMonths: 3,
    additionalBonus: 'Annual fee rebated in first year',
    offerExpiry: '2024-09-03',
    isLimitedTime: true,
    affiliateLink: '#apply-td-aeroplan-vi',
    featured: true,
    lastUpdated: '2024-07-01',
    tags: ['td', 'aeroplan', 'air-canada', 'travel', 'limited-time'],
  },

  {
    id: 'offer-scotia-passport-vi-2024',
    cardId: 'scotia-passport-vi',
    cardSlug: 'scotiabank-passport-visa-infinite',
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
    affiliateLink: '#apply-scotia-passport-vi',
    featured: true,
    lastUpdated: '2024-07-01',
    tags: ['scotiabank', 'scene-plus', 'travel', 'no-fx-fee'],
  },

  {
    id: 'offer-bmo-eclipse-vi-2024',
    cardId: 'bmo-eclipse-vi',
    cardSlug: 'bmo-eclipse-visa-infinite',
    cardName: 'BMO eclipse Visa Infinite* Card',
    issuer: 'BMO',
    offerType: 'welcome-bonus',
    headline: '60,000 BMO Rewards points + first year free',
    bonusAmount: 60000,
    bonusUnit: 'points',
    spendRequirement: '$3,000 in 3 months',
    spendAmount: 3000,
    spendPeriodMonths: 3,
    additionalBonus: 'First year annual fee waived ($120 value)',
    offerExpiry: '2024-10-31',
    isLimitedTime: true,
    affiliateLink: '#apply-bmo-eclipse-vi',
    featured: false,
    lastUpdated: '2024-07-01',
    tags: ['bmo', 'eclipse', 'dining', 'groceries', 'first-year-free'],
  },

  {
    id: 'offer-tangerine-2024',
    cardId: 'tangerine-money-back',
    cardSlug: 'tangerine-money-back-mastercard',
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
    affiliateLink: '#apply-tangerine-money-back',
    featured: true,
    lastUpdated: '2024-07-01',
    tags: ['tangerine', 'no-fee', 'cash-back', 'welcome-bonus'],
  },

  {
    id: 'offer-amex-business-gold-2024',
    cardId: 'amex-business-gold',
    cardSlug: 'american-express-business-gold',
    cardName: 'American Express Business Gold Rewards Card',
    issuer: 'American Express',
    offerType: 'welcome-bonus',
    headline: '45,000 Amex MR points after $5,000 spend in 3 months',
    bonusAmount: 45000,
    bonusUnit: 'points',
    spendRequirement: '$5,000 in 3 months',
    spendAmount: 5000,
    spendPeriodMonths: 3,
    isLimitedTime: false,
    affiliateLink: '#apply-amex-business-gold',
    featured: false,
    lastUpdated: '2024-07-01',
    tags: ['amex', 'business', 'no-fx-fee', 'smb'],
  },
]

// Helper: get featured offers
export function getFeaturedOffers(): CardOffer[] {
  return offers.filter(o => o.featured)
}

// Helper: get offer for a specific card
export function getOfferByCardId(cardId: string): CardOffer | undefined {
  return offers.find(o => o.cardId === cardId)
}

// Helper: get limited-time offers
export function getLimitedTimeOffers(): CardOffer[] {
  return offers.filter(o => o.isLimitedTime)
}
