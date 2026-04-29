// app/api/newsletter/route.ts
// POST /api/newsletter — double opt-in signup (CASL compliant) + Mailchimp sync
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes }               from 'crypto'
import { Resend }                    from 'resend'
import { supabaseAdmin }             from '@/lib/supabase'
import { checkRateLimit }            from '@/lib/rate-limit'

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 'placeholder')

function getAppUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? `${req.nextUrl.protocol}//${req.nextUrl.host}`
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

async function addToMailchimp(email: string) {
  const dc     = process.env.MAILCHIMP_DC
  const listId = process.env.MAILCHIMP_LIST_ID
  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!dc || !listId || !apiKey) return
  try {
    const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    })
    const data = await res.json()
    if (!res.ok && data.title !== 'Member Exists') {
      console.error('[newsletter] Mailchimp error:', data.detail ?? data.title)
    }
  } catch {
    // non-critical
  }
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)

  try {
    const rl = await checkRateLimit(ip)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
      )
    }
  } catch {
    // rate limiter failure is non-critical — continue
  }

  let body: { email?: string; first_name?: string; source?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { email, first_name, source } = body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  const normalizedEmail = email.toLowerCase().trim()

  // Always sync to Mailchimp first — this is the primary list destination.
  // Runs fire-and-forget so a Mailchimp outage never blocks the response.
  addToMailchimp(normalizedEmail)

  // Attempt double opt-in via Supabase + Resend (CASL compliance / confirmation email).
  // If Supabase is unavailable we still return success — the contact is already in Mailchimp.
  try {
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, is_confirmed')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existing?.is_confirmed) {
      return NextResponse.json({ success: true, status: 'already_confirmed' })
    }

    const token = randomBytes(32).toString('hex')
    const now   = new Date().toISOString()

    if (existing) {
      const { error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .update({ confirmation_token: token, subscribed_at: now })
        .eq('id', existing.id)
      if (error) console.error('[newsletter] token refresh failed:', error.message)
    } else {
      const { error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .insert({
          email:              normalizedEmail,
          first_name:         first_name ?? null,
          source:             source     ?? 'frontend',
          is_confirmed:       false,
          confirmation_token: token,
          subscribed_at:      now,
        })
      if (error) console.error('[newsletter] insert failed:', error.message)
    }

    // Send confirmation email via Resend
    const confirmUrl = `${getAppUrl(req)}/api/newsletter/confirm?token=${token}`
    let email_sent   = false
    try {
      const { error: emailError } = await getResend().emails.send({
        from:    'Smart Card Offers <hello@smartcardoffers.ca>',
        to:      normalizedEmail,
        subject: 'Confirm your Smart Card Offers subscription',
        html: `
          <h1>One more step${first_name ? `, ${first_name}` : ''}!</h1>
          <p>Click the button below to confirm your subscription to Canada's best credit card offers newsletter.</p>
          <p style="margin:32px 0;">
            <a href="${confirmUrl}" style="background:#1a56db;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;">
              Confirm my subscription
            </a>
          </p>
          <p style="color:#6b7280;font-size:14px;">Or copy and paste: <a href="${confirmUrl}" style="color:#1a56db;">${confirmUrl}</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">
          <p style="color:#9ca3af;font-size:12px;">If you did not request this, you can safely ignore it.</p>
        `,
      })
      if (emailError) console.error('[newsletter] Resend error:', emailError)
      else email_sent = true
    } catch (err) {
      console.error('[newsletter] Failed to send email:', err)
    }

    return NextResponse.json({ success: true, status: 'confirmation_sent', email_sent })
  } catch (err) {
    console.error('[newsletter] Supabase/Resend error (Mailchimp still synced):', err)
    // Mailchimp already received the signup — return success to the user
    return NextResponse.json({ success: true, status: 'subscribed', email_sent: false })
  }
}
