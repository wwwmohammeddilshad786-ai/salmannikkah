import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Salmanul Faris & Rinshiya | Nikah Invitation',

  description:
    'With the blessings of Allah, join us in celebrating the Nikah of Salmanul Faris & Rinshiya on 17 July 2025 at 9:30 AM at Azharippara Juma Masjid.',

  openGraph: {
    title: 'Salmanul Faris & Rinshiya | Nikah Invitation',
    description:
      'With the blessings of Allah, join us in celebrating the Nikah of Salmanul Faris & Rinshiya on 17 July 2025 at 9:30 AM at Azharippara Juma Masjid.',
    images: [
      {
        url: '/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Salmanul Faris & Rinshiya Nikah Invitation',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Salmanul Faris & Rinshiya | Nikah Invitation',
    description:
      'With the blessings of Allah, join us in celebrating the Nikah of Salmanul Faris & Rinshiya on 17 July 2025 at 9:30 AM at Azharippara Juma Masjid.',
    images: ['/cover.jpg'],
  },

  generator: '@dilshad__shazz / @mhmmed_dilshad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}