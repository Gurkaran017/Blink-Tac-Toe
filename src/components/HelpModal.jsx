import useSound from '../hooks/useSound'

export default function HelpModal({ isOpen, onClose }) {

  if (!isOpen) return null

  const playClickSound = useSound('../../src/assets/sounds/click.mp3', 0.2)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <div onClick={() => {
            playClickSound()        
          }}
        >
          <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-yellow-300"
        >
          &times;
        </button>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">How to Play Blink Tac Toe</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">Game Rules</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Each player selects an emoji category at the start</li>
              <li>Players take turns placing random emojis from their category</li>
              <li>Each player can only have 3 emojis on the board at once</li>
              <li>When placing a 4th emoji, your oldest emoji vanishes</li>
              <li>You can't place your 4th emoji where your 1st emoji was</li>
              <li>First to get 3 of their emojis in a row wins!</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg">Visual Indicators</h3>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center">
                <span className="inline-block w-6 h-6 border-2 border-green-400 mr-2"></span>
                <span>Newest emoji placed by player</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-6 h-6 border-2 border-red-400 mr-2"></span>
                <span>Oldest emoji (will vanish next)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg">Tips</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Plan ahead - your emojis will vanish in order!</li>
              <li>Try to block your opponent's potential winning moves</li>
              <li>Watch for patterns where you can create multiple winning opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}