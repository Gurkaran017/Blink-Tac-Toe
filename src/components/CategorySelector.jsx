import { useState } from 'react'
import { EmojiCategories } from '../constants'
import useSound from '../hooks/useSound'
import click from '../../src/assets/sounds/click.mp3'

export default function CategorySelector({ categories, onStart, onHelp }) {
  const [player1Category, setPlayer1Category] = useState(null)
  const [player2Category, setPlayer2Category] = useState(null)
  const [activePanel, setActivePanel] = useState('player1') // For mobile view
  // const playClickSound = useSound('../../src/assets/sounds/click.mp3', 0.2)
   const playClickSound = useSound(click, 0.2)

  const handleStart = () => {
    playClickSound()
    if (player1Category && player2Category) {
      onStart(player1Category, player2Category)
    }
  }

  const handleCategorySelect = (player, category) => {
    playClickSound()
    if (player === 'player1') {
      setPlayer1Category(category)
      setActivePanel('player2') // Auto-advance to player 2 selection
    } else {
      setPlayer2Category(category)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/80 to-indigo-900/80 rounded-2xl p-8 shadow-2xl backdrop-blur-lg border border-purple-500/20">
      {/* Header with animated decoration */}
      <div className="relative mb-8 text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-300">
          Select Emoji Categories
        </h2>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden flex justify-center mb-6">
        <div className="inline-flex bg-purple-800/50 rounded-lg p-1">
          <button
            onClick={() => {
              playClickSound()
              setActivePanel('player1')
            }}
            className={`px-4 py-2 rounded-md transition-all ${activePanel === 'player1' ? 'bg-purple-600 text-white' : 'text-purple-200'}`}
          >
            Player 1
          </button>
          <button
            onClick={() => {
              playClickSound()
              setActivePanel('player2')
            }}
            className={`px-4 py-2 rounded-md transition-all ${activePanel === 'player2' ? 'bg-purple-600 text-white' : 'text-purple-200'}`}
          >
            Player 2
          </button>
        </div>
      </div>

      {/* Category selection panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Player 1 Panel */}
        <div className={`${activePanel === 'player1' ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
            <h3 className="text-xl font-semibold text-yellow-300">Player 1</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={`p1-${key}`}
                onClick={() => {handleCategorySelect('player1', key)
                  playClickSound()
                }}
                className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center 
                  ${player1Category === key 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-400/50 shadow-lg scale-[1.02]' 
                    : 'bg-purple-800/50 hover:bg-purple-700/70 border border-purple-600/20 hover:border-purple-400/30'
                  }`}
              >
                <div className="text-4xl mb-2 hover:scale-110 transition-transform duration-200">
                  {category.emojis[0]}
                </div>
                <div className="text-sm font-medium text-purple-100">
                  {category.name}
                </div>
                {player1Category === key && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Player 2 Panel */}
        <div className={`${activePanel === 'player2' ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
            <h3 className="text-xl font-semibold text-blue-300">Player 2</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={`p2-${key}`}
                onClick={() => {handleCategorySelect('player2', key)
                  playClickSound()
                }}
                className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center 
                  ${player2Category === key 
                    ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-400/50 shadow-lg scale-[1.02]' 
                    : 'bg-purple-800/50 hover:bg-purple-700/70 border border-purple-600/20 hover:border-purple-400/30'
                  }`}
              >
                <div className="text-4xl mb-2 hover:scale-110 transition-transform duration-200">
                  {category.emojis[0]}
                </div>
                <div className="text-sm font-medium text-purple-100">
                  {category.name}
                </div>
                {player2Category === key && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <button 
          onClick={() => {
            playClickSound()
            onHelp()
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-500 transition-all duration-300 flex items-center group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How to Play
        </button>
        
        <button
          onClick={handleStart}
          disabled={!player1Category || !player2Category}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center
            ${player1Category && player2Category 
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          Start Game
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Selection status */}
      {(player1Category || player2Category) && (
        <div className="mt-6 text-center text-sm text-purple-300">
          {player1Category && player2Category ? (
            "Both players ready!"
          ) : player1Category ? (
            "Waiting for Player 2 to select..."
          ) : (
            "Waiting for Player 1 to select..."
          )}
        </div>
      )}
    </div>
  )
}
