'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Sparkles } from 'lucide-react'

interface Props {
  variant?: 'default' | 'compact' | 'inline'
}

export default function NewsletterSignup({ variant = 'default' }: Props) {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={variant === 'compact' ? 'py-4' : 'py-12'}>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-semibold text-slate-900">You&apos;re on the list!</h3>
          <p className="text-sm text-slate-500">We&apos;ll send you the best Canadian points deals and card offers every week.</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="input-field flex-1 text-sm"
        />
        <button type="submit" className="btn-primary text-sm whitespace-nowrap">
          Subscribe
        </button>
      </form>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-4.5 h-4.5 w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Get weekly deals in your inbox</h3>
            <p className="text-xs text-slate-500 mt-0.5">Best points offers, card deals, and mortgage news — free, every week.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="input-field flex-1 text-sm"
          />
          <button type="submit" className="btn-primary text-sm whitespace-nowrap">
            Join
          </button>
        </form>
      </div>
    )
  }

  // Default: full-width section
  return (
    <section className="relative overflow-hidden bg-navy-900 rounded-3xl px-8 py-14 text-center">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-13 h-13 w-[52px] h-[52px] bg-white/10 rounded-2xl mb-6 border border-white/10">
          <Mail className="w-6 h-6 text-teal-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 ml-2">
          <Sparkles className="w-3 h-3" />
          25,000+ subscribers
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Canada&apos;s best deals, delivered weekly
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Join Canadians getting the best credit card offers, points strategies, and mortgage news every week. Free, no spam, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/10 text-white text-sm placeholder:text-slate-500
                       focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/15 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white font-semibold text-sm rounded-xl
                       hover:bg-teal-400 active:bg-teal-600 transition-colors whitespace-nowrap
                       shadow-lg shadow-teal-500/20"
          >
            Subscribe Free
          </button>
        </form>

        <p className="text-xs text-slate-600 mt-4">
          No spam. Unsubscribe anytime.{' '}
          <a href="/legal/privacy-policy" className="text-slate-500 underline hover:text-slate-300 transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  )
}
