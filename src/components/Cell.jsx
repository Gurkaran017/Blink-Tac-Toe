import { useEffect, useState } from 'react'

export default function Cell({ index, emoji, player, onClick, isDisabled, isNewest, isOldest }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVanishing, setIsVanishing] = useState(false)

  useEffect(() => {
    if (emoji) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [emoji])

  const handleClick = () => {
    if (!isDisabled) {
      onClick()
    }
  }

  const getBackgroundColor = () => {
    if (!player) return 'bg-purple-800 hover:bg-purple-700'
    return player === 'player1' 
      ? 'bg-yellow-500 bg-opacity-30 hover:bg-opacity-40' 
      : 'bg-blue-500 bg-opacity-30 hover:bg-opacity-40'
  }

  const getBorderColor = () => {
    if (isNewest) return 'border-2 border-green-400'
    if (isOldest) return 'border-2 border-red-400'
    return ''
  }

  return (
    <button
      onClick={handleClick}
      className={`
        relative flex items-center justify-center text-4xl rounded-lg transition-all
        ${getBackgroundColor()}
        ${getBorderColor()}
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${isVanishing ? 'animate-ping' : ''}
      `}
      onAnimationEnd={() => setIsVanishing(false)}
    >
      {emoji}
    </button>
  )
}