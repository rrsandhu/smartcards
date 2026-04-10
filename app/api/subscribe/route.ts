import { NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_SMART_CARD_API ?? 'https://smart-card-offers.vercel.app'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  // 1. Save to Ryan's backend DB and trigger welcome email
  try {
    await fetch(`${API}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'frontend' }),
    })
  } catch {
    // non-critical — continue to Mailchimp
  }

  // 2. Add to Mailchimp audience (if configured)
  const dc     = process.env.MAILCHIMP_DC
  const listId = process.env.MAILCHIMP_LIST_ID
  const apiKey = process.env.MAILCHIMP_API_KEY

  if (dc && listId && apiKey) {
    try {
      const mcRes = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      })
      const mcData = await mcRes.json()
      // Already subscribed is fine
      if (!mcRes.ok && mcData.title !== 'Member Exists') {
        // Log but don't fail — DB save already succeeded
        console.error('Mailchimp error:', mcData.detail ?? mcData.title)
      }
    } catch {
      // non-critical
    }
  }

  return NextResponse.json({ success: true })
}
