import Link from 'next/link'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  'Credit Cards': [
    { label: 'All Cards',      href: '/credit-cards' },
    { label: 'Travel Cards',   href: '/credit-cards?category=travel' },
    { label: 'Cash Back',      href: '/credit-cards?category=cash-back' },
    { label: 'No-Fee Cards',   href: '/credit-cards?category=no-fee' },
    { label: 'Business Cards', href: '/credit-cards?category=business' },
    { label: 'Compare Cards',  href: '/compare' },
    { label: 'Best Offers',    href: '/best-offers' },
  ],
  'Points Guides': [
    { label: 'All Programs',    href: '/points' },
    { label: 'Amex MR Guide',   href: '/points/amex-membership-rewards' },
    { label: 'Aeroplan Guide',  href: '/points/aeroplan' },
    { label: 'RBC Avion',       href: '/points/rbc-avion' },
    { label: 'Scene+',          href: '/points/scene-plus' },
    { label: 'Marriott Bonvoy', href: '/points/marriott-bonvoy' },
  ],
  'Content': [
    { label: 'Points Deals',      href: '/blog/points-deals' },
    { label: 'Credit Card Deals', href: '/blog/credit-card-deals' },
    { label: 'Mortgage News',     href: '/blog/mortgage-news' },
    { label: 'Blog',               href: '/blog' },
  ],
  'Tools': [
    { label: 'All Tools',              href: '/tools' },
    { label: 'Mortgage Calculator',    href: '/tools/mortgage-payment-calculator' },
    { label: 'Rewards Calculator',     href: '/tools/rewards-value-calculator' },
    { label: 'Affordability Calc',     href: '/tools/mortgage-affordability-calculator' },
    { label: 'Debt Payoff Calc',       href: '/tools/debt-payoff-calculator' },
  ],
  'Company': [
    { label: 'About Us',             href: '/about' },
    { label: 'Contact',              href: '/contact' },
    { label: 'Affiliate Disclosure', href: '/legal/affiliate-disclosure' },
    { label: 'Privacy Policy',       href: '/legal/privacy-policy' },
    { label: 'Terms of Use',         href: '/legal/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 mt-20">

      {/* Main footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-6">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-4">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <span className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-sm group-hover:bg-teal-400 transition-colors">
                P
              </span>
              <span className="font-bold text-[1.1rem] tracking-tight">
                <span className="text-white">Points</span><span className="text-teal-400">North</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Canada's trusted source for credit card comparisons, points strategy, and mortgage tools.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <span>Canada</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <a href="mailto:hello@pointsnorth.ca" className="hover:text-teal-400 transition-colors">
                  hello@pointsnorth.ca
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 opacity-60">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/[0.06]">
        <div className="container-site py-7">
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            <strong className="text-slate-500 font-semibold">Affiliate Disclosure:</strong>{' '}
            PointsNorth may earn a commission when you apply for products through our links. This does not affect our editorial independence or the way we review and rank financial products. We are committed to providing accurate, unbiased information to help Canadians make informed financial decisions.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-500 font-semibold">Editorial Note:</strong>{' '}
            Rates, fees, and offer details are accurate as of the dates shown and are subject to change. Always verify current terms directly with the card issuer before applying. PointsNorth is not a financial advisor; this content is for informational purposes only.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            © {new Date().getFullYear()} PointsNorth. All rights reserved.
          </span>
          <div className="flex items-center gap-5 text-xs text-slate-600">
            <Link href="/legal/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/legal/terms"           className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/legal/affiliate-disclosure" className="hover:text-slate-300 transition-colors">Disclosure</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
