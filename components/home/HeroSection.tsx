import Link from 'next/link'
import { Search, Banknote, Plane, Tag, Briefcase, TrendingDown, Gift } from 'lucide-react'

const cardCategories = [
  { icon: Banknote,     label: 'Best Cashback',      href: '/credit-cards?category=cash-back' },
  { icon: Plane,        label: 'Travel Rewards',      href: '/credit-cards?category=travel'    },
  { icon: Tag,          label: 'No Annual Fee',        href: '/credit-cards?category=no-fee'    },
  { icon: Briefcase,    label: 'Business Cards',       href: '/credit-cards?category=business'  },
  { icon: TrendingDown, label: 'Low Interest',         href: '/search?q=low+interest'           },
  { icon: Gift,         label: 'Best Welcome Bonus',   href: '/best-offers'                     },
]

export default function HeroSection() {
  return (
    <section className="bg-[#0B1628] text-white">
      <div className="container-site py-20 md:py-28 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-teal-400 mb-5">
          🇨🇦 Canada's Credit Card Guide
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight mb-4 max-w-2xl text-white">
          Find the right card{' '}
          <span className="text-teal-400">for you</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
          Compare 78+ Canadian credit cards by rewards, fees, and benefits.
          No bias. No fluff. Just the right card.
        </p>

        {/* Search bar */}
        <form
          action="/search"
          method="get"
          className="flex gap-2 w-full max-w-lg mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              name="q"
              type="search"
              placeholder="Search cards, banks, or rewards..."
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border-0 bg-white text-gray-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Quick-start category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {cardCategories.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/8 hover:bg-white/15 text-slate-300 hover:text-white text-sm font-medium border border-white/10 hover:border-white/25 transition-all duration-150"
            >
              <Icon className="w-3.5 h-3.5 opacity-70" />
              {label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
