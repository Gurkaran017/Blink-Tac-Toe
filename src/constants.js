export const EmojiCategories = {
  animals: {
    name: "Animals",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]
  },
  food: {
    name: "Food",
    emojis: ["🍎", "🍕", "🍔", "🌭", "🍟", "🍦", "🍩", "🍪"]
  },
  sports: {
    name: "Sports",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🎱", "🏓"]
  },
  travel: {
    name: "Travel",
    emojis: ["✈️", "🚗", "🚢", "🚲", "🛵", "🚀", "🛸", "🚁"]
  },
  weather: {
    name: "Weather",
    emojis: ["☀️", "🌤️", "⛅", "🌧️", "⛈️", "❄️", "🌪️", "🌈"]
  }
}

export const WinningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
]