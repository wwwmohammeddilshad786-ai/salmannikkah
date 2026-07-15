'use client'

import { useEffect, useState } from 'react'
import { wedding } from '@/lib/wedding-config'
import { OrnamentDivider } from './ornament-divider'
import { useReveal } from '@/hooks/use-reveal'

function getTimeLeft(target: number) {
  const now = Date.now()
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

export function CountdownTimer() {
  const target = new Date(wedding.date).getTime()
  const [time, setTime] = useState(() => getTimeLeft(target))
  const [mounted, setMounted] = useState(false)
  const ref = useReveal<HTMLDivElement>()

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <section id="countdown" className="px-6 py-10 sm:py-14">
      <div ref={ref} className="reveal mx-auto max-w-3xl text-center">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
          Counting the moments
        </p>
        <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
          {time.done ? 'Alhamdulillah, the day is here' : 'Until we celebrate'}
        </h2>
        <OrnamentDivider className="mt-6" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="gold-border rounded-xl bg-card/60 px-2 py-6 backdrop-blur-sm"
            >
              <div className="font-serif text-4xl font-semibold text-gold sm:text-6xl tabular-nums">
                {mounted ? String(unit.value).padStart(2, '0') : '--'}
              </div>
              <div className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
