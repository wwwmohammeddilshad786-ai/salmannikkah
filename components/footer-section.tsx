'use client'

import { wedding } from '@/lib/wedding-config'
import { OrnamentDivider } from './ornament-divider'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

export function FooterSection() {
  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const text = `You are invited to the Nikah of ${wedding.groom} & ${wedding.bride} on ${wedding.dateLabel} at ${wedding.venue}. ${shareUrl}`

    // Prefer the native share sheet on mobile, fall back to WhatsApp web.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${wedding.groom} & ${wedding.bride} — Nikah Invitation`,
          text,
          url: shareUrl,
        })
        return
      } catch {
        // user cancelled or unsupported — fall through to WhatsApp
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer className="px-6 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-2xl italic text-gold">
          &ldquo;And among His signs is that He created for you mates from among yourselves.&rdquo;
        </p>
        <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Surah Ar-Rum, 30:21
        </p>

        <OrnamentDivider className="mt-8" />

        <Button
          onClick={handleShare}
          className="mt-8 rounded-full bg-gold px-8 py-6 font-sans text-sm uppercase tracking-[0.2em] text-[var(--primary-foreground)] hover:bg-[var(--gold-muted)]"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share the Invitation
        </Button>

        <div className="mt-12">
          <p className="font-serif text-3xl text-foreground">
            {wedding.groom} <span className="text-gold">&amp;</span> {wedding.bride}
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {wedding.dateLabel}
          </p>
        </div>
        <div className="mt-10">
  <p className="font-sans text-sm text-foreground/80">
    For any queries regarding the Nikah ceremony, venue, or directions,
    please feel free to contact us.
  </p>

  <div className="mt-4 flex justify-center gap-4">
    <a
      href="https://wa.me/917902631896?text=Assalamu%20Alaikum,%20I%20have%20a%20query%20regarding%20the%20Nikah%20ceremony,%20venue,%20or%20directions."
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-green-600 px-5 py-3 text-sm text-white transition hover:opacity-90"
    >
      💬 WhatsApp
    </a>

    <a
      href="tel:+917902631896"
      className="rounded-full bg-blue-600 px-5 py-3 text-sm text-white transition hover:opacity-90"
    >
      📞 Call
    </a>
  </div>

  <p className="mt-4 font-sans text-xs text-muted-foreground">
    +91 79026 31896
  </p>
</div>
      </div>
    </footer>
  )
}
