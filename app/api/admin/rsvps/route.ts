import { NextResponse } from 'next/server'
import { getRsvps } from '@/lib/rsvp'
import { isFirebaseConfigured } from '@/lib/firebase'

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: 'Admin password is not configured. Set the ADMIN_PASSWORD environment variable.' },
      { status: 500 },
    )
  }

  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  if (!isFirebaseConfigured) {
    return NextResponse.json(
      { error: 'Firebase is not configured. Add your Firebase environment variables.' },
      { status: 500 },
    )
  }

  try {
    const rsvps = await getRsvps()
    return NextResponse.json({ rsvps })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load responses.' },
      { status: 500 },
    )
  }
}
