import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in CAD
export function formatCAD(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

// Format a number with commas
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-CA').format(n)
}

// Format date to a readable string (e.g. "July 1, 2024")
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Slug → title: "some-slug" → "Some Slug"
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// Truncate text to a given length
export function truncate(text: string, length = 120): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

// Convert annual fee to "No annual fee" or "$XXX/year"
export function formatAnnualFee(fee: number): string {
  if (fee === 0) return 'No annual fee'
  return `$${fee}/yr`
}

// Human-readable category label
export function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    'points-deals': 'Points Deals',
    'credit-card-deals': 'Credit Card Deals',
    'mortgage-news': 'Mortgage News',
    guides: 'Guides',
    news: 'News',
    travel: 'Travel',
    'cash-back': 'Cash Back',
    'no-fee': 'No Annual Fee',
    'low-interest': 'Low Interest',
    business: 'Business',
    student: 'Student',
    points: 'Points',
    premium: 'Premium',
    secured: 'Secured',
  }
  return map[cat] ?? slugToTitle(cat)
}

// Mortgage calculation helpers
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number, // e.g. 5.5 for 5.5%
  amortizationYears: number
): number {
  if (annualRate === 0) return principal / (amortizationYears * 12)
  const monthlyRate = annualRate / 100 / 12
  const n = amortizationYears * 12
  return (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1)
}

export function calculateCMHCPremium(
  homePrice: number,
  downPayment: number
): { rate: number; premium: number } {
  const ltv = (homePrice - downPayment) / homePrice
  let rate = 0
  if (ltv <= 0.65) rate = 0
  else if (ltv <= 0.75) rate = 0.017
  else if (ltv <= 0.80) rate = 0.024
  else if (ltv <= 0.85) rate = 0.028
  else if (ltv <= 0.90) rate = 0.031
  else rate = 0.04
  return { rate: rate * 100, premium: (homePrice - downPayment) * rate }
}
