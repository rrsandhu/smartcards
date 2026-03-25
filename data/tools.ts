/**
 * tools.ts — Financial calculator and tool definitions
 *
 * Add new tools here. The actual calculator logic lives in components/tools/calculators/.
 */

import type { Tool } from '@/types'

export const tools: Tool[] = [
  {
    id: 'mortgage-payment-calculator',
    slug: 'mortgage-payment-calculator',
    name: 'Mortgage Payment Calculator',
    description:
      'Calculate your monthly mortgage payment based on home price, down payment, interest rate, and amortization period. Includes a full payment breakdown.',
    category: 'mortgage',
    icon: 'Home',
    featured: true,
    tags: ['mortgage', 'monthly-payment', 'amortization', 'home-buying'],
    lastUpdated: '2024-07-01',
  },
  {
    id: 'mortgage-affordability-calculator',
    slug: 'mortgage-affordability-calculator',
    name: 'Mortgage Affordability Calculator',
    description:
      'Find out how much mortgage you can afford based on your income, debts, and down payment. Uses Canadian GDS and TDS ratio guidelines.',
    category: 'mortgage',
    icon: 'DollarSign',
    featured: true,
    tags: ['mortgage', 'affordability', 'gds', 'tds', 'income'],
    lastUpdated: '2024-07-01',
  },
  {
    id: 'max-mortgage-calculator',
    slug: 'max-mortgage-calculator',
    name: 'Maximum Mortgage Calculator',
    description:
      'Estimate the maximum mortgage amount you qualify for based on your annual income, stress test rate, and amortization period.',
    category: 'mortgage',
    icon: 'TrendingUp',
    featured: true,
    tags: ['mortgage', 'max-mortgage', 'stress-test', 'qualifying'],
    lastUpdated: '2024-07-01',
  },
  {
    id: 'rewards-value-calculator',
    slug: 'rewards-value-calculator',
    name: 'Credit Card Rewards Value Calculator',
    description:
      'See how much your monthly spending is worth in points or cash back across popular Canadian credit cards. Compare cards side-by-side.',
    category: 'credit-card',
    icon: 'CreditCard',
    featured: true,
    tags: ['rewards', 'cash-back', 'points', 'comparison', 'calculator'],
    lastUpdated: '2024-07-01',
  },
  {
    id: 'balance-transfer-calculator',
    slug: 'balance-transfer-calculator',
    name: 'Balance Transfer Savings Calculator',
    description:
      'Calculate how much interest you can save by transferring a high-interest balance to a promotional-rate credit card.',
    category: 'credit-card',
    icon: 'ArrowLeftRight',
    featured: true,
    tags: ['balance-transfer', 'interest', 'debt', 'savings'],
    lastUpdated: '2024-07-01',
  },
  {
    id: 'debt-payoff-calculator',
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    description:
      'Compare the avalanche and snowball debt payoff methods. Enter your debts and see how quickly you can become debt-free.',
    category: 'debt',
    icon: 'CheckCircle',
    featured: true,
    tags: ['debt', 'payoff', 'avalanche', 'snowball', 'credit-card-debt'],
    lastUpdated: '2024-07-01',
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug)
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured)
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category)
}
