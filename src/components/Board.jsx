import { useState, useEffect } from 'react'
import { WinningPatterns } from '../constants'
import Cell from './Cell'
import WinningLine from './WinningLine'
import useGameLogic from '../hooks/useGameLogic'
import useSound from '../hooks/useSound'
import click from '../../src/assets/sounds/click.mp3'

export default function Board({ player1Category, player2Category, onWin, onRestart }) {
  const {
    board,
    currentPlayer,
    playerMoves,
    winner,
    winningPattern,
    handleCellClick,
    resetGame
  } = useGameLogic(player1Category, player2Category)

  const [hasCalledOnWin, setHasCalledOnWin] = useState(false)
  const playClickSound = useSound(click, 0.2)

  useEffect(() => {
    if (winner && !hasCalledOnWin) {
      onWin(winner)
      setHasCalledOnWin(true)
    }
  }, [winner, hasCalledOnWin, onWin])

  const handleRestart = () => {
    playClickSound()
    resetGame()
    setHasCalledOnWin(false)
    onRestart()
  }

  return (
    <div className="relative">
      <div className="mb-4 text-center">
        <p className="text-xl">
          Current Turn: <span className={`font-bold ${currentPlayer === 'player1' ? 'text-yellow-300' : 'text-blue-300'}`}>
            Player {currentPlayer === 'player1' ? '1' : '2'}
          </span>
        </p>
      </div>
      
      <div className="relative grid grid-cols-3 gap-3 w-72 h-72 md:w-80 md:h-80 bg-purple-900 p-3 rounded-xl shadow-lg">
        {winningPattern && <WinningLine pattern={winningPattern} />}
        
        {board.map((cell, index) => (
          <Cell
            key={index}
            index={index}
            emoji={cell.emoji}
            player={cell.player}
            onClick={() => handleCellClick(index)}
            isDisabled={!!winner}
            isNewest={cell.timestamp === playerMoves[cell.player]?.[0]?.timestamp}
            isOldest={cell.timestamp === playerMoves[cell.player]?.[playerMoves[cell.player]?.length - 1]?.timestamp}
          />
        ))}
      </div>
      
      {winner && (
        <div className="mt-6 text-center animate-bounce">
          <h2 className="text-3xl font-bold mb-4">
            Player {winner === 'player1' ? '1' : '2'} Wins! 🎉
          </h2>
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
