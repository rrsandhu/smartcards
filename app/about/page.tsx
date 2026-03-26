import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Users, TrendingUp, Heart } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About SmartCardOffers — Canadian Personal Finance Editorial Team',
  description: 'SmartCardOffers is a trusted Canadian personal finance website covering credit cards, points programs, and mortgage news for Canadians.',
}

const values = [
  {
    icon: Shield,
    title: 'Editorial Independence',
    body: 'Our rankings and reviews are based entirely on product merit. Affiliate relationships never influence how we rate or rank cards.',
  },
  {
    icon: TrendingUp,
    title: 'Always Up to Date',
    body: 'We monitor offer changes, rate updates, and policy shifts across all major Canadian issuers and update our content promptly.',
  },
  {
    icon: Users,
    title: 'Built for Canadians',
    body: 'We write specifically for the Canadian market — CAD fees, Canadian issuers, Canadian tax rules, and the products Canadians can actually apply for.',
  },
  {
    icon: Heart,
    title: 'Genuinely Helpful',
    body: "We only recommend products we'd actually use ourselves. If a card isn't worth it, we say so — even if it pays us a higher commission.",
  },
]

export default function AboutPage() {
  return (
    <div className="container-site py-8 max-w-4xl">
      <Breadcrumbs crumbs={[{ label: 'About Us' }]} />

      <div className="mt-8">
        <p className="section-label mb-3">About SmartCardOffers</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-5">
          We help Canadians make smarter financial decisions
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-10">
          SmartCardOffers is a Canadian personal finance website focused on credit cards, travel rewards, and mortgage guidance. We're a small editorial team with deep expertise in Canadian loyalty programs, card products, and the mortgage market.
        </p>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {values.map(v => (
            <div key={v.title} className="card-surface p-6">
              <div className="w-10 h-10 bg-navy-100 text-navy-600 rounded-xl flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        {/* How we make money */}
        <div className="bg-parchment-50 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How We Make Money</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            SmartCardOffers earns revenue through affiliate referral commissions. When you click an "Apply Now" link and are approved for a credit card, we may receive a commission from the card issuer. This is how we keep the site free for readers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Importantly, our editorial reviews, rankings, and recommendations are not influenced by these commercial relationships. We maintain a strict separation between our business operations and editorial content.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We include cards in our comparisons regardless of whether we have an affiliate relationship. Not every card on SmartCardOffers pays us a commission — we include them because they're relevant and useful to Canadians.
          </p>
          <div className="mt-4">
            <Link href="/legal/affiliate-disclosure" className="text-navy-600 text-sm font-medium hover:text-navy-800 transition-colors">
              Read our full affiliate disclosure →
            </Link>
          </div>
        </div>

        {/* Team */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Our Editorial Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: 'Sarah Mitchell',  title: 'Senior Finance Editor',        bio: '10 years covering Canadian personal finance. Specializes in credit card rewards and Aeroplan strategy.' },
              { name: 'James Park',      title: 'Points & Deals Reporter',       bio: 'Tracks daily promotions across Canadian loyalty programs. Former Aeroplan community moderator.' },
              { name: 'Lisa Chen',       title: 'Mortgage & Real Estate Analyst', bio: 'Former mortgage broker with 8 years experience in the Canadian housing market.' },
            ].map(person => (
              <div key={person.name} className="card-surface p-5">
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 font-bold text-lg flex items-center justify-center mb-3">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{person.name}</h3>
                <p className="text-xs text-gold-600 font-medium mb-2">{person.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-navy-600 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
          <p className="text-navy-200 mb-5">Questions, feedback, or partnership inquiries? We'd love to hear from you.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy-700 font-semibold rounded-xl hover:bg-parchment-50 transition-colors text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
