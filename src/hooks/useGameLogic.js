import { useState, useEffect, useRef } from 'react'
import { EmojiCategories, WinningPatterns } from '../constants'
import useSound from './useSound'

export default function useGameLogic(player1Category, player2Category) {
  const [board, setBoard] = useState(Array(9).fill(null).map(() => ({ emoji: null, player: null, timestamp: null })))
  const [currentPlayer, setCurrentPlayer] = useState('player1')
  const [playerMoves, setPlayerMoves] = useState({
    player1: [],
    player2: []
  })
  const [winner, setWinner] = useState(null)
  const [winningPattern, setWinningPattern] = useState(null)
  const hasProcessedWin = useRef(false)

  // Sound effects
  const playPlaceSound = useSound('../../src/assets/sounds/place.mp3', 0.3)
  const playVanishSound = useSound('../../src/assets/sounds/vanish.mp3', 0.3)
  const playWinSound = useSound('../../src/assets/sounds/win.mp3', 0.5)

  const getRandomEmoji = (player) => {
    const category = player === 'player1' ? player1Category : player2Category
    const emojis = EmojiCategories[category]?.emojis || []
    const randomIndex = Math.floor(Math.random() * emojis.length)
    return emojis[randomIndex]
  }

  const checkWinner = (updatedBoard) => {
    for (const pattern of WinningPatterns) {
      const [a, b, c] = pattern
      if (
        updatedBoard[a].player && 
        updatedBoard[a].player === updatedBoard[b].player && 
        updatedBoard[a].player === updatedBoard[c].player
      ) {
        return {
          winner: updatedBoard[a].player,
          pattern
        }
      }
    }
    return { winner: null, pattern: null }
  }

    const handleCellClick = (index) => {
    if (board[index].player === currentPlayer || winner) return

    const newEmoji = getRandomEmoji(currentPlayer)
    const currentTimestamp = Date.now()
    
    const currentPlayerMoves = [...playerMoves[currentPlayer]]
    
    if (currentPlayerMoves.length >= 3) {
      const oldestMove = currentPlayerMoves.pop()
      
      if (oldestMove.index === index) return
      
      playVanishSound()
      setBoard(prev => prev.map((cell, i) => 
        i === oldestMove.index ? { emoji: null, player: null, timestamp: null } : cell
      ))
    }
    
    playPlaceSound()
    
    const updatedMoves = [{ index, timestamp: currentTimestamp }, ...currentPlayerMoves.slice(0, 2)]
    
    setBoard(prev => prev.map((cell, i) => 
      i === index ? { emoji: newEmoji, player: currentPlayer, timestamp: currentTimestamp } : cell
    ))
    
    setPlayerMoves(prev => ({
      ...prev,
      [currentPlayer]: updatedMoves
    }))
    
    setCurrentPlayer(prev => prev === 'player1' ? 'player2' : 'player1')
  }

  useEffect(() => {
    const { winner: newWinner, pattern } = checkWinner(board)
    if (newWinner && !hasProcessedWin.current) {
      setWinner(newWinner)
      setWinningPattern(pattern)
      hasProcessedWin.current = true
      playWinSound()
    }
  }, [board, playWinSound])

  const resetGame = () => {
    setBoard(Array(9).fill(null).map(() => ({ emoji: null, player: null, timestamp: null })))
    setCurrentPlayer('player1')
    setPlayerMoves({
      player1: [],
      player2: []
    })
    setWinner(null)
    setWinningPattern(null)
    hasProcessedWin.current = false
  }

  return {
    board,
    currentPlayer,
    playerMoves,
    winner,
    winningPattern,
    handleCellClick,
    resetGame
  }
}