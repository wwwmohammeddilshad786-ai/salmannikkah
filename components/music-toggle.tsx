'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const songs = [
  '/audio/wedding-nasheed-lofi.mp3',
  '/audio/wedding-nasheed.mp3',
  '/audio/nasheed.mp3',
]

    const randomSong = songs[Math.floor(Math.random() * songs.length)]

    const audio = new Audio(randomSong)
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'auto'
    audio.addEventListener('error', () => setAvailable(false))

    audioRef.current = audio

    const startAudio = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setAvailable(false)
      }

      document.removeEventListener('click', startAudio)
      document.removeEventListener('touchstart', startAudio)
    }

    document.addEventListener('click', startAudio)
    document.addEventListener('touchstart', startAudio)

    return () => {
      document.removeEventListener('click', startAudio)
      document.removeEventListener('touchstart', startAudio)

      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setAvailable(false)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      aria-pressed={playing}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 text-gold shadow-lg backdrop-blur-md transition-transform hover:scale-105 gold-border"
    >
      {!available ? (
        <Music className="h-5 w-5 opacity-60" />
      ) : playing ? (
        <Volume2 className="h-5 w-5 animate-shimmer" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  )
}