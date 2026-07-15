'use client'

import { useReveal } from '@/hooks/use-reveal'
import { OrnamentDivider } from './ornament-divider'

export function InviteImageSection() {
  const ref = useReveal()

  return (
    <section
      id="invite-image"
      className="flex flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div ref={ref} className="reveal mx-auto w-full max-w-xl">
        {/* Title */}
        <p className="font-sans text-sm uppercase tracking-[0.4em] text-gold">
          With the blessings of Allah
        </p>
        <OrnamentDivider className="mt-6" />
        <h2 className="mt-6 font-serif text-4xl font-semibold gold-gradient-text sm:text-5xl">
          The Invitation
        </h2>
        <OrnamentDivider className="mt-6" />

        {/* 9:16 Portrait Image */}
        <div className="mt-10 flex w-full justify-center">
          <div
            className="relative overflow-hidden rounded-2xl gold-border shadow-2xl w-full"
            style={{
              aspectRatio: '9 / 16',
              maxWidth: 'min(90vw, calc(85vh * 9 / 16))',
            }}
          >
            <img
              src="/invite-photo.jpeg"
              alt="Nikah Invitation"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Gold shimmer border overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: 'inset 0 0 0 1px oklch(0.78 0.13 85 / 35%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
