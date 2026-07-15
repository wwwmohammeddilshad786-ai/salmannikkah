import { HeroSection } from '@/components/hero-section'
import { CountdownTimer } from '@/components/countdown-timer'
import { InviteImageSection } from '@/components/invite-image-section'
import { EventDetails } from '@/components/event-details'
import { GallerySection } from '@/components/gallery-section'
import { VideoSection } from '@/components/video-section'
import { RsvpSection } from '@/components/rsvp-section'
import { FooterSection } from '@/components/footer-section'
import { MusicToggle } from '@/components/music-toggle'

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <CountdownTimer />
      <InviteImageSection />
      <EventDetails />
      <GallerySection />
      <VideoSection />
      <RsvpSection />
      <FooterSection />
      <MusicToggle />

      <div className="fixed bottom-6 left-6 z-[1000] flex items-center gap-2 rounded-lg border border-white/10 bg-[#121212] px-3 py-2 text-sm text-white shadow-lg">
        <a
          href="https://instagram.com/dilshad__shazz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <img
            src="/shazz-logo.png"
            alt="Shazz Logo"
            className="h-5 w-5 rounded-full"
          />
          <span>Built by Mohammed Dilshad</span>
        </a>
      </div>
    </main>
  )
}