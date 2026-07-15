'use client'

import { useEffect, useRef } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { OrnamentDivider } from './ornament-divider'

export function VideoSection() {
  const ref = useReveal()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVolumeChange = () => {
      // Fire a custom event so MusicToggle can react
      window.dispatchEvent(
        new CustomEvent('video-mute-change', { detail: { muted: video.muted } })
      )
    }

    video.addEventListener('volumechange', handleVolumeChange)
    return () => video.removeEventListener('volumechange', handleVolumeChange)
  }, [])

  return (
    <section
      id="video"
      className="relative flex flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div ref={ref} className="reveal mx-auto w-full max-w-xl">
        {/* Section Title */}
        <p className="font-sans text-sm uppercase tracking-[0.4em] text-gold">
          A Special Moment
        </p>
        <OrnamentDivider className="mt-6" />
        <h2 className="mt-6 font-serif text-4xl font-semibold gold-gradient-text sm:text-5xl">
          Our Nikah Film
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed tracking-wide text-muted-foreground">
          Relive the blessed moments of our Nikah ceremony.
        </p>
        <OrnamentDivider className="mt-6" />

        {/* 9:16 Portrait Video Player */}
        <div className="mt-12 flex w-full justify-center">
          <div
            className="relative overflow-hidden rounded-2xl gold-border shadow-2xl w-full"
            style={{
              aspectRatio: '9 / 16',
              maxWidth: 'min(90vw, calc(85vh * 9 / 16))',
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              controls
              playsInline
              poster="/images/hero-bg.png"
            >
              <source src="/IMG_3664.mp4" type="video/mp4" />
              <source src="/IMG_3664.MOV" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

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
