'use client'

import { wedding } from '@/lib/wedding-config'
import { OrnamentDivider } from './ornament-divider'
import { useReveal } from '@/hooks/use-reveal'
import { CalendarDays, Clock, MapPin, Navigation } from 'lucide-react'

export function EventDetails() {
  const ref = useReveal<HTMLDivElement>()

  const items = [
    { icon: CalendarDays, label: 'Date', value: `${wedding.dayLabel}, ${wedding.dateLabel}` },
    { icon: Clock, label: 'Time', value: wedding.timeLabel },
    { icon: MapPin, label: 'Venue', value: wedding.venue },
  ]

  return (
    <section id="details" className="px-6 py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-3xl text-center">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
          You are cordially invited
        </p>
        <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
          The Nikah Ceremony
        </h2>
        <OrnamentDivider className="mt-6" />

        <p className="mx-auto mt-8 max-w-xl font-sans text-sm leading-relaxed text-foreground/80">
          With hearts full of gratitude to Allah, we invite you to share in our joy as we begin
          our journey together in marriage. Your presence and prayers would be a cherished
          blessing.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value }) => (
            <div
  key={label}
  className="gold-border card-hover flex flex-col items-center rounded-xl bg-card/60 px-4 py-8 backdrop-blur-sm"
>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 font-serif text-xl text-foreground text-balance">
  {value}
</p>

{label === 'Date' && (
  <p className="mt-2 text-sm text-gold" dir="rtl">
    {wedding.hijriDateArabic}
  </p>
)}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--gold-muted)]"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Open in Google Maps
          </a>
          <p className="mt-4 font-sans text-xs text-muted-foreground">{wedding.venueAddress}</p>
        </div>
      </div>
    </section>
  )
}
