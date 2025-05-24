
import { useEffect, useRef, useContext } from 'react'
import { SoundContext } from '../context/SoundContext'

export default function useSound(src, volume = 1) {
  const sound = useRef(null)
  const { soundEnabled } = useContext(SoundContext)

  useEffect(() => {
    sound.current = new Audio(src)
    sound.current.volume = volume
    return () => {
      if (sound.current) {
        sound.current.pause()
        sound.current = null
      }
    }
  }, [src, volume])

  const play = () => {
    if (sound.current && soundEnabled) {
      sound.current.currentTime = 0
      sound.current.play().catch(e => console.log("Audio play failed:", e))
    }
  }

  return play
}