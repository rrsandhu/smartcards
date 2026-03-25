'use client'

import { useState } from 'react'
import { Mail, MessageSquare, CheckCircle } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'General inquiry', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container-site py-8 max-w-4xl">
      <Breadcrumbs crumbs={[{ label: 'Contact' }]} />

      <div className="mt-6 mb-8">
        <p className="section-label mb-2">Contact Us</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h1>
        <p className="text-gray-600 text-lg">Questions, corrections, partnership inquiries, or just a hello — we read every email.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact info */}
        <div className="space-y-5">
          <div className="card-surface p-5">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-navy-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Email Us</h3>
            </div>
            <a href="mailto:hello@pointsnorth.ca" className="text-sm text-navy-600 hover:text-navy-800 transition-colors">
              hello@pointsnorth.ca
            </a>
            <p className="text-xs text-gray-500 mt-1">We aim to respond within 1–2 business days.</p>
          </div>
          <div className="card-surface p-5">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-navy-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Corrections & Feedback</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Spotted an error or an outdated offer? Please let us know — we take accuracy seriously and will update content promptly.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="card-surface p-10 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Message sent!</h3>
              <p className="text-gray-600 text-sm">Thanks for reaching out. We'll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  className="select-field"
                >
                  <option>General inquiry</option>
                  <option>Report an error</option>
                  <option>Partnership / advertising</option>
                  <option>Press inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="input-field resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
              <p className="text-xs text-gray-400 text-center">
                By submitting this form you agree to our{' '}
                <a href="/legal/privacy-policy" className="underline hover:text-navy-600">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
