import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SmartCardOffers — Best Canadian Credit Cards, Points & Mortgage Tools',
    template: '%s | SmartCardOffers',
  },
  description:
    'Compare the best Canadian credit cards, discover points deals, and use free mortgage calculators. Expert reviews and unbiased comparisons for Canadians.',
  keywords: [
    'Canadian credit cards',
    'best credit cards Canada',
    'Aeroplan credit card',
    'cash back credit cards Canada',
    'no fee credit card Canada',
    'travel rewards Canada',
    'mortgage calculator Canada',
    'Scene+ credit card',
    'credit card comparison Canada',
    'best welcome bonus credit card',
  ],
  authors: [{ name: 'SmartCardOffers Editorial Team' }],
  creator: 'SmartCardOffers',
  publisher: 'SmartCardOffers',
  metadataBase: new URL('https://smartcardoffers.ca'),
  alternates: {
    canonical: 'https://smartcardoffers.ca',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://smartcardoffers.ca',
    siteName: 'SmartCardOffers',
    title: 'SmartCardOffers — Best Canadian Credit Cards, Points & Mortgage Tools',
    description:
      'Compare the best Canadian credit cards, discover points deals, and use free mortgage calculators. Expert reviews for Canadians.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartCardOffers — Canadian Credit Cards & Points',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCardOffers — Best Canadian Credit Cards & Points',
    description: 'Compare Canadian credit cards, find the best welcome bonuses, and use free financial tools.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',   // Add Google Search Console verification code here when available
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-parchment-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
