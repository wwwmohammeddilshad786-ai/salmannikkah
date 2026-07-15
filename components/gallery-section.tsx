'use client'

import { OrnamentDivider } from './ornament-divider'
import { useReveal } from '@/hooks/use-reveal'

const images = [
  { src: '/images/gallery-1.png', alt: 'Golden wedding rings on emerald silk' },
  { src: '/images/gallery-2.png', alt: 'Elegant mosque interior with golden arches' },
  { src: '/images/gallery-3.png', alt: 'Luxurious white floral arrangement' },
  { src: '/images/gallery-4.png', alt: 'Elegant wedding banquet table setting' },
  { src: '/images/gallery-5.png', alt: 'Ornate golden Arabic calligraphy panel' },
  { src: '/images/gallery-6.png', alt: 'Bridal henna design with gold jewelry' },
  { src: '/images/gallery-8.png', alt: 'Nikah memories' },
]

export function GallerySection() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="gallery" className="px-6 py-10 sm:py-14">
      <div ref={ref} className="reveal mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
            Moments &amp; memories
          </p>
          <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Our Gallery</h2>
          <OrnamentDivider className="mt-6" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {images.map((image, i) => (
            <div
              key={image.src}
              className={`gold-border group relative overflow-hidden rounded-xl ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/10 transition-colors duration-500 group-hover:bg-background/0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
