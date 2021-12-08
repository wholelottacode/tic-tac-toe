const NUMBER_OF_TILES = 9

function boardFactory() {
  const board = [['','',''], ['','',''], ['','','']]
  let tilesRemaining = NUMBER_OF_TILES
  
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

  function checkRow(tileNumber) {
    const row = getRow(tileNumber)
    return board[row][0] === board[row][1] && board[row][0] === board[row][2]
  }

  function checkColumn(tileNumber) {
    const column = getColumn(tileNumber)
    return board[0][column] === board[1][column] && board[0][column] === board[2][column]
  }

  function checkTopLeftToBottomRight(tileNumber) {
    const isOnDiagonal = [0,4,8].includes(tileNumber)
    if(isOnDiagonal) {
      return board[0][0] === board[1][1] && board[0][0] === board[2][2]
    }
    return false
  }

  function checkTopRightToBottomLeft(tileNumber) {
    const isOnDiagonal = [2,4,6].includes(tileNumber)
    if(isOnDiagonal) {
      return board[0][2] === board[1][1] && board[0][2] === board[2][0]
    }
    return false
  }

  function isWin(tileNumber) {
    return checkRow(tileNumber) || checkColumn(tileNumber) || checkTopLeftToBottomRight(tileNumber) || checkTopRightToBottomLeft(tileNumber)
  }

  function updateTile(tileNumber, marker) {
    const row = getRow(tileNumber)
    const column = getColumn(tileNumber)
    if(!board[row][column]) {
      board[row][column] = marker
      tilesRemaining -= 1
      return true
    }
    return false
  }

  function getTilesRemaining() {
    return tilesRemaining
  }

  return {
    updateTile,
    isWin,
    getTilesRemaining
  }
}

function playerFactory(name, marker) {
  function getName() {
    return name
  }

  function getMarker() {
    return marker
  }

  function toString() {
    return `${name}, ${marker}`
  }

  return {
    getName,
    getMarker,
    toString,
    marker
  }
}

const game = (function gameFactory() {
  const board = boardFactory()
  const playerOne = playerFactory('Player 1', 'X')
  const playerTwo = playerFactory('Player 2', 'O')
  let turn = playerOne
  let isOver = false

  function makeMove(tileNumber, marker) {
    const isUpdateSuccessful = board.updateTile(tileNumber, marker)
    if(isUpdateSuccessful) {
      if(board.isWin(tileNumber)) {
        console.log('winner!')
      } else if(!board.getTilesRemaining()) {
        console.log('tie game')
      } else {
        updateTurn()
      }
    }
    return isUpdateSuccessful
  }

  function updateTurn() {
    if(turn === playerOne) {
      console.log('p1 -> p2')
      turn = playerTwo
    } else {
      console.log('p2 -> p1')
      turn = playerOne
    }
    console.log(`next turn belongs to ${turn.getName()}`)
  }

  return {
    turn,
    makeMove,
  }
})()


const handleTileClick = function (e) {
  const tileNumber = parseInt(e.target.id)
  const { turn, makeMove } = game
  console.log(`${turn.getName()} clicked tile: ${tileNumber}`)
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
