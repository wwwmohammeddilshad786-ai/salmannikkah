'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { RsvpRecord } from '@/lib/rsvp'
import { Lock, Loader2, Users, Check, X, RefreshCw, Download } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-card/60 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const load = async (pwd: string) => {
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to load responses.')
      setRsvps(data.rsvps)
      setAuthed(true)
      setStatus('idle')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    load(password)
  }

  const exportCsv = () => {
    const header = ['Name', 'Phone', 'Attending', 'Guests', 'Message', 'Submitted']
    const rows = rsvps.map((r) => [
      r.name,
      r.phone,
      r.attending === 'yes' ? 'Yes' : 'No',
      String(r.guests),
      r.message.replace(/\n/g, ' '),
      r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rsvps.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const attendingCount = rsvps.filter((r) => r.attending === 'yes').length
  const declinedCount = rsvps.filter((r) => r.attending === 'no').length
  const totalGuests = rsvps
    .filter((r) => r.attending === 'yes')
    .reduce((sum, r) => sum + (r.guests || 0), 0)

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="gold-border w-full max-w-sm rounded-2xl bg-card/60 p-8 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-serif text-3xl text-foreground">Admin Access</h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Enter the password to view RSVP responses.
            </p>
          </div>

          <div className="mt-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={inputClass}
              autoFocus
            />
          </div>

          {status === 'error' && (
            <p className="mt-4 rounded-lg bg-destructive/15 px-4 py-2 font-sans text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="mt-6 w-full rounded-full bg-gold py-6 font-sans text-sm uppercase tracking-[0.2em] text-[var(--primary-foreground)] hover:bg-[var(--gold-muted)]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Enter'
            )}
          </Button>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">Dashboard</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground">RSVP Responses</h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => load(password)}
            className="rounded-full border-[var(--gold-muted)] bg-transparent font-sans text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={exportCsv}
            disabled={rsvps.length === 0}
            className="rounded-full bg-gold font-sans text-xs uppercase tracking-[0.15em] text-[var(--primary-foreground)] hover:bg-[var(--gold-muted)]"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Responses', value: rsvps.length, icon: Users },
          { label: 'Attending', value: attendingCount, icon: Check },
          { label: 'Declined', value: declinedCount, icon: X },
          { label: 'Total Guests', value: totalGuests, icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="gold-border rounded-xl bg-card/60 px-4 py-6 text-center">
            <div className="font-serif text-4xl font-semibold text-gold tabular-nums">
              {stat.value}
            </div>
            <div className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {rsvps.length === 0 ? (
        <p className="mt-16 text-center font-sans text-sm text-muted-foreground">
          No responses yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {rsvps.map((r) => (
            <div key={r.id} className="gold-border rounded-xl bg-card/50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl text-foreground">{r.name}</h3>
                  <a
                    href={`tel:${r.phone}`}
                    className="font-sans text-sm text-muted-foreground hover:text-gold"
                  >
                    {r.phone}
                  </a>
                </div>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs uppercase tracking-wider ${
                    r.attending === 'yes'
                      ? 'bg-gold/15 text-gold'
                      : 'bg-destructive/15 text-destructive-foreground'
                  }`}
                >
                  {r.attending === 'yes' ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> {r.guests}{' '}
                      {r.guests === 1 ? 'guest' : 'guests'}
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5" /> Not attending
                    </>
                  )}
                </span>
              </div>
              {r.message && (
                <p className="mt-3 border-t border-[var(--border)] pt-3 font-sans text-sm italic leading-relaxed text-foreground/80">
                  &ldquo;{r.message}&rdquo;
                </p>
              )}
              {r.createdAt && (
                <p className="mt-3 font-sans text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
