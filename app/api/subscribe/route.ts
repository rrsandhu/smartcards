import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const dc     = process.env.MAILCHIMP_DC
  const listId = process.env.MAILCHIMP_LIST_ID
  const apiKey = process.env.MAILCHIMP_API_KEY

  if (!dc || !listId || !apiKey) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  })

  const data = await res.json()

  // Already subscribed is fine — treat as success
  if (res.ok || data.title === 'Member Exists') {
    return NextResponse.json({ success: true })
  }

  const message = data.detail ?? data.title ?? 'Something went wrong. Please try again.'
  return NextResponse.json({ error: message }, { status: res.status })
}
