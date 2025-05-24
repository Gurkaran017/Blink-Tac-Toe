
import { createContext, useState } from 'react'

export const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleSound = () => {
    setSoundEnabled(prev => !prev)
  }

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}