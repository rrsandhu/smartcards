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
    default: 'SmartCardOffers — Canadian Credit Cards, Points Deals & Mortgage Tools',
    template: '%s | SmartCardOffers',
  },
  description:
    'Compare the best Canadian credit cards, discover points deals, and use free mortgage calculators. Your trusted source for Canadian personal finance.',
  keywords: [
    'Canadian credit cards',
    'best credit cards Canada',
    'Aeroplan points',
    'cash back credit cards',
    'mortgage calculator Canada',
    'credit card rewards',
    'points deals Canada',
  ],
  authors: [{ name: 'SmartCardOffers Editorial Team' }],
  creator: 'SmartCardOffers',
  metadataBase: new URL('https://smartcardoffers.ca'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://smartcardoffers.ca',
    siteName: 'SmartCardOffers',
    title: 'SmartCardOffers — Canadian Credit Cards, Points Deals & Mortgage Tools',
    description:
      'Compare the best Canadian credit cards, discover points deals, and use free mortgage calculators.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCardOffers — Canadian Credit Cards & Points',
    description: 'Your trusted source for Canadian personal finance, credit cards, and mortgage tools.',
  },
  robots: {
    index: true,
    follow: true,
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
