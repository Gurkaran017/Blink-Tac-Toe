import { useState, useContext } from 'react'
import Board from './components/Board'
import CategorySelector from './components/CategorySelector'
import ScoreBoard from './components/ScoreBoard'
import HelpModal from './components/HelpModal'
import { EmojiCategories } from './constants'
import { SoundContext } from './context/SoundContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [categories, setCategories] = useState({
    player1: null,
    player2: null
  })
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [showHelp, setShowHelp] = useState(false)
  const { soundEnabled, toggleSound } = useContext(SoundContext)

  const startGame = (player1Category, player2Category) => {
    setCategories({
      player1: player1Category,
      player2: player2Category
    })
    setGameStarted(true)
  }

  const restartGame = () => {
    setGameStarted(false)
  }

  const handleWin = (winner) => {
    setScores(prev => ({
      ...prev,
      [winner]: prev[winner] + 1
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white flex flex-col items-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-600 opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Sound toggle */}
      <motion.button 
        onClick={toggleSound}
        className="fixed top-1 right-1 p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-all z-50 shadow-lg"
        aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="">{soundEnabled ? '🔊' : '🔇'}</span>
      </motion.button>
      
      {/* Main content container */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title section */}
        <motion.div 
  className="text-center mb-8 w-full"
  whileHover={{ scale: 1.02 }}
>
  <h1 className="text-5xl md:text-7xl font-extrabold mb-3 text-yellow-300 drop-shadow-md">
    <span className="relative inline-block">
      <span className="relative z-10">Blink Tic Tac</span>
      {/* Subtle glow behind text - now properly positioned */}
      <span className="absolute -inset-2 bg-yellow-400 rounded-full blur-md opacity-20 -z-10"></span>
    </span>
  </h1>
  <motion.p 
    className="text-xl md:text-2xl font-semibold text-purple-100 italic tracking-wider"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    A vanishing twist on a classic!
  </motion.p>
</motion.div>

        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <motion.div
              key="category-selector"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <CategorySelector 
                categories={EmojiCategories} 
                onStart={startGame} 
                onHelp={() => setShowHelp(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="game-board"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center" // Added flex-col and items-center
            >
              <div className="w-full flex justify-center"> {/* Wrapper for ScoreBoard */}
                <ScoreBoard 
                  scores={scores} 
                  currentCategories={categories} 
                  onRestart={restartGame}
                  onHelp={() => setShowHelp(true)}
                />
              </div>
              <div className="w-full flex justify-center mt-6"> {/* Wrapper for Board */}
                <Board 
                  player1Category={categories.player1} 
                  player2Category={categories.player2} 
                  onWin={handleWin}
                  onRestart={restartGame}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        
        <motion.footer 
          className="mt-8 text-sm text-purple-200 text-center w-full"
          whileHover={{ scale: 1.05 }}
        >
          <p className="mb-1">Use the same device or share with a friend!</p>
          <p className="text-xs opacity-70">© {new Date().getFullYear()} Blink Tac Toe Made By Gurkaran Singh</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}
