'use client'

import { useState } from 'react'
import { OrnamentDivider } from './ornament-divider'
import { useReveal } from '@/hooks/use-reveal'
import { Button } from '@/components/ui/button'
import { submitRsvp, type Attendance } from '@/lib/rsvp'
import { Check, Loader2, PartyPopper } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-card/60 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]'

export function RsvpSection() {
  const ref = useReveal<HTMLDivElement>()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState(1)
  const [attending, setAttending] = useState<Attendance>('yes')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in your name and phone number.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setError('')
    try {
      await submitRsvp({
        name: name.trim(),
        phone: phone.trim(),
        guests: attending === 'yes' ? guests : 0,
        attending,
        message: message.trim(),
      })
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="px-6 py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
            Kindly respond
          </p>
          <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Confirm Your Presence</h2>
          <OrnamentDivider className="mt-6" />
          <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-foreground/80">
            Please let us know if you will be joining us. We would be honoured by your presence.
          </p>
        </div>

        {status === 'done' ? (
          <div className="gold-border card-hover mt-10 flex flex-col items-center rounded-2xl bg-card/60 px-6 py-12 text-center backdrop-blur-sm animate-fade-up">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
              <PartyPopper className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-2xl text-foreground">
  جَزَاكُمُ اللَّهُ خَيْرًا
</h3>
            <p className="mt-2 font-sans text-sm text-foreground/80">
              {attending === 'yes'
                ? 'Your response has been received. We look forward to celebrating with you.'
                : 'Thank you for letting us know. You will be missed, and we value your prayers.'}
            </p>
          </div>
        ) : (
          <form
  onSubmit={handleSubmit}
  className="gold-border card-hover mt-10 space-y-5 rounded-2xl bg-card/50 p-6 backdrop-blur-sm sm:p-8"
>
            <div>
              <label htmlFor="name" className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 12345 67890"
                className={inputClass}
                required
              />
            </div>

            <div>
              <span className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Will you attend?
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { key: 'yes', label: 'Joyfully accept' },
                    { key: 'no', label: 'Regretfully decline' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAttending(opt.key)}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-sans text-sm transition-colors ${
                      attending === opt.key
                        ? 'border-[var(--gold)] bg-gold/15 text-gold'
                        : 'border-[var(--border)] bg-card/40 text-foreground/70 hover:border-[var(--gold-muted)]'
                    }`}
                  >
                    {attending === opt.key && <Check className="h-4 w-4" />}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {attending === 'yes' && (
              <div className="animate-fade-up">
                <label htmlFor="guests" className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={inputClass}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-card text-foreground">
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="message" className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Message / Duʿā (optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your wishes and prayers for the couple"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p className="rounded-lg bg-destructive/15 px-4 py-2 font-sans text-sm text-destructive-foreground">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-gold py-6 font-sans text-sm uppercase tracking-[0.2em] text-[var(--primary-foreground)] transition-transform duration-300 hover:scale-105 hover:bg-[var(--gold-muted)]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
