function boardFactory() {
  const board = [['','',''], ['','',''], ['','','']]
  
  function getRow(tileNumber) {
    if(tileNumber <= 2) {
      return 0
    } else if (tileNumber <= 5) {
      return 1
    } else {
      return 2
    }
  }

  function getColumn(tileNumber) {
    return tileNumber % 3
  }

  function updateTile(tileNumber, marker) {
    const row = getRow(tileNumber)
    const column = getColumn(tileNumber)
    if(!board[row][column]) {
      board[row][column] = marker
      return true
    }
    return false // tile was filled
  }

  return {
    updateTile
  }
}

function playerFactory(name, marker) {
  function getName() {
    return name
  }

  function getMarker() {
    return marker
  }

  return {
    getName,
    getMarker
  }
}

const game = (function gameFactory() {
  const board = boardFactory()
  const playerOne = playerFactory('Player 1', 'X')
  const playerTwo = playerFactory('Player 2', 'O')
  let turn = playerOne
  let isOver = false

  function makeMove(tileNumber, marker) {
    console.log(`apply ${marker} at position ${tileNumber}`)
    const isUpdateSuccessful = board.updateTile(tileNumber, marker)
    return isUpdateSuccessful
  }

  function updateTurn() {
    if(turn === playerOne) {
      turn = playerTwo
    } else {
      turn = playerOne
    }
  }

  return {
    turn,
    makeMove,
    updateTurn
  }
})()

const handleTileClick = function (e) {
  const tileNumber = parseInt(e.target.id)
  const { turn, makeMove } = game
  if(makeMove(tileNumber, turn.getMarker())) {
    e.target.textContent = turn.getMarker()
  } else {
    console.log('invalid move!')
  }
} 

const tiles = document.querySelectorAll('.tile')
tiles.forEach(tile => {
  tile.addEventListener('click', handleTileClick)
})
