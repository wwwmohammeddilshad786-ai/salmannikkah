'use client'

import { wedding } from '@/lib/wedding-config'
import { OrnamentDivider } from './ornament-divider'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background" />
      </div>

      <div className="mx-auto max-w-2xl">
        <p
          className="animate-fade-up font-sans text-sm uppercase tracking-[0.4em] text-gold"
          style={{ animationDelay: '0.1s' }}
          dir="rtl"
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
        </p>
        <p
          className="mt-4 animate-fade-up font-sans text-xs uppercase tracking-[0.35em] text-muted-foreground"
          style={{ animationDelay: '0.25s' }}
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <OrnamentDivider className="mt-8 animate-fade-up" />

        <p
          className="mt-8 animate-fade-up font-sans text-xs uppercase tracking-[0.35em] text-foreground/80"
          style={{ animationDelay: '0.4s' }}
        >
          Together with their families
        </p>

        <h1 className="mt-6 font-serif leading-none">
          <span
            className="block animate-fade-up gold-gradient-text text-6xl font-semibold sm:text-7xl md:text-8xl"
            style={{ animationDelay: '0.5s' }}
          >
            {wedding.groom}
          </span>
          <span
            className="my-3 block animate-fade-up font-serif text-3xl italic text-gold sm:text-4xl"
            style={{ animationDelay: '0.65s' }}
          >
            &amp;
          </span>
          <span
            className="block animate-fade-up gold-gradient-text text-6xl font-semibold sm:text-7xl md:text-8xl"
            style={{ animationDelay: '0.8s' }}
          >
            {wedding.bride}
          </span>
        </h1>

        <p
          className="mt-10 animate-fade-up font-sans text-sm leading-relaxed tracking-widest text-foreground/85 sm:text-base"
          style={{ animationDelay: '0.95s' }}
        >
          {wedding.dayLabel} &middot; {wedding.dateLabel}
        </p>
        <p
          className="mt-2 animate-fade-up font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground"
          style={{ animationDelay: '1.05s' }}
        >
          {wedding.venue}
        </p>

        <OrnamentDivider className="mt-10 animate-fade-up" />
      </div>

      <a
        href="#countdown"
        aria-label="Scroll to countdown"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slow text-gold"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  )
}
