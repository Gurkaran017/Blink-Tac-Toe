export default function WinningLine({ pattern }) {
  const getLineStyle = () => {
    // Convert pattern indexes to grid positions
    const positions = pattern.map(index => {
      const row = Math.floor(index / 3)
      const col = index % 3
      return { row, col }
    })
    
    // Determine line orientation
    const isHorizontal = positions[0].row === positions[1].row
    const isVertical = positions[0].col === positions[1].col
    
    if (isHorizontal) {
      const row = positions[0].row
      return {
        gridRowStart: row + 1,
        gridRowEnd: row + 2,
        gridColumnStart: 1,
        gridColumnEnd: 4,
        className: 'h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-1/2'
      }
    } else if (isVertical) {
      const col = positions[0].col
      return {
        gridColumnStart: col + 1,
        gridColumnEnd: col + 2,
        gridRowStart: 1,
        gridRowEnd: 4,
        className: 'w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent left-1/2'
      }
    } else {
      // Diagonal
      if (pattern.includes(0)){ // Top-left to bottom-right
        return {
          gridColumnStart: 1,
          gridColumnEnd: 4,
          gridRowStart: 1,
          gridRowEnd: 4,
          className: 'w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-1/2 transform rotate-45 origin-center'
        }
      } else { // Top-right to bottom-left
        return {
          gridColumnStart: 1,
          gridColumnEnd: 4,
          gridRowStart: 1,
          gridRowEnd: 4,
          className: 'w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-1/2 transform -rotate-45 origin-center'
        }
      }
    }
  }

  const lineStyle = getLineStyle()

  return (
    <div
      className={`absolute ${lineStyle.className} animate-pulse`}  
      style={{
        gridRowStart: lineStyle.gridRowStart,
        gridRowEnd: lineStyle.gridRowEnd,
        gridColumnStart: lineStyle.gridColumnStart,
        gridColumnEnd: lineStyle.gridColumnEnd,
      }}
    />
  )
}