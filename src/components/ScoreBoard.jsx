import { EmojiCategories } from '../constants'
import useSound from '../hooks/useSound'
import click from '../../src/assets/sounds/click.mp3'

export default function ScoreBoard({ scores, currentCategories, onRestart, onHelp }) {
  const playClickSound = useSound(click, 0.2)
  return (
    <div className="w-full max-w-md bg-purple-700 bg-opacity-50 rounded-xl p-4 mb-6 shadow-lg backdrop-blur-sm flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className={`text-center ${scores.player1 > scores.player2 ? 'scale-110' : ''}`}>
          <div className="text-2xl">{EmojiCategories[currentCategories.player1]?.emojis[0]}</div>
          <div className="font-bold text-yellow-300">P1: {scores.player1}</div>
        </div>
        
        <div className="text-xl font-bold">VS</div>
        
        <div className={`text-center ${scores.player2 > scores.player1 ? 'scale-110' : ''}`}>
          <div className="text-2xl">{EmojiCategories[currentCategories.player2]?.emojis[0]}</div>
          <div className="font-bold text-blue-300">P2: {scores.player2}</div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div onClick={() => {
            playClickSound()        
          }}
        >
          <button 
          onClick={onHelp}
          className="px-3 py-1 bg-purple-900 rounded-lg hover:bg-purple-800 transition text-sm"
        >
          Help
        </button>
        </div>
        <div onClick={() => {
            playClickSound()        
          }}>
          <button 
          onClick={onRestart}
          className="px-3 py-1 bg-purple-900 rounded-lg hover:bg-purple-800 transition text-sm"
        >
          New Game
        </button>
        </div>
      </div>
    </div>
  )
}
