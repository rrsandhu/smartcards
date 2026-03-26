'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Credit Cards',
    href: '/credit-cards',
    children: [
      { label: 'All Cards',      href: '/credit-cards' },
      { label: 'Travel Cards',   href: '/credit-cards?category=travel' },
      { label: 'Cash Back',      href: '/credit-cards?category=cash-back' },
      { label: 'No-Fee Cards',   href: '/credit-cards?category=no-fee' },
      { label: 'Business Cards', href: '/credit-cards?category=business' },
      { label: 'Compare Cards',  href: '/compare' },
    ],
  },
  {
    label: 'Best Offers',
    href: '/best-offers',
  },
  {
    label: 'Points',
    href: '/points',
    children: [
      { label: 'Transfer Guides',          href: '/points' },
      { label: 'Amex Membership Rewards',  href: '/points/amex-membership-rewards' },
      { label: 'Aeroplan',                 href: '/points/aeroplan' },
      { label: 'RBC Avion',               href: '/points/rbc-avion' },
      { label: 'Scene+',                   href: '/points/scene-plus' },
      { label: 'Marriott Bonvoy',          href: '/points/marriott-bonvoy' },
      { label: 'Points Deals',             href: '/blog/points-deals' },
    ],
  },
  { label: 'Card Deals',     href: '/blog/credit-card-deals' },
  { label: 'Mortgage News',  href: '/blog/mortgage-news' },
  { label: 'Tools',          href: '/tools' },
  { label: 'Blog',           href: '/blog' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function handleDropdown(label: string) {
    setOpenDropdown(prev => (prev === label ? null : label))
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-[0_1px_3px_0_rgb(0,0,0,0.06)]">

      {/* Top announcement bar */}
      <div className="hidden sm:block bg-navy-900 text-slate-300 text-xs py-1.5">
        <div className="container-site flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
            Canadian credit cards &amp; personal finance
          </span>
          <div className="flex items-center gap-5">
            <Link href="/legal/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-site">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
              S
            </span>
            <span className="font-bold text-[1.2rem] tracking-tight">
              <span className="text-slate-900">SmartCard</span><span className="text-teal-500">Offers</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <button
                    onClick={() => handleDropdown(item.label)}
                    onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                      openDropdown === item.label
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 text-slate-400 transition-transform duration-200',
                      openDropdown === item.label && 'rotate-180 text-blue-500'
                    )} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150 block"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-2xl border border-slate-200 shadow-[0_8px_24px_-4px_rgb(0,0,0,0.12),0_2px_8px_-2px_rgb(0,0,0,0.06)] py-2 z-50 animate-fade-in">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className={cn(
                'p-2.5 rounded-xl text-slate-500 transition-all duration-150',
                searchOpen
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-slate-100 hover:text-slate-700'
              )}
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-150"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 pt-3 border-t border-slate-100 animate-fade-in-up">
            <form onSubmit={handleSearch} className="flex gap-2.5">
              <input
                type="search"
                placeholder="Search cards, articles, tools..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-fade-in">
          <nav className="container-site py-4 space-y-0.5">
            {navItems.map(item => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-3">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
