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
  isWinner = false

  function getName() {
    return name
  }

  function getMarker() {
    return marker
  }

  function toString() {
    return `${name}, ${marker}`
  }

  function setIsWinner(winner) {
    isWinner = winner
  }

  function getIsWinner() {
    return isWinner
  }

  return {
    getName,
    getMarker,
    setIsWinner,
    getIsWinner,
    toString,
    marker
  }
}

const game = (function gameFactory() {
  let board = boardFactory()
  const playerOne = playerFactory('Player 1', 'X')
  const playerTwo = playerFactory('Player 2', 'O')
  let turn = playerOne
  let isOver = false

  function makeMove(tileNumber, marker) {
    const isUpdateSuccessful = board.updateTile(tileNumber, marker)
    if(isUpdateSuccessful) {
      if(board.isWin(tileNumber)) {
        console.log('winner!')
        gameOver()
        turn.setIsWinner(true)
      } else if(!board.getTilesRemaining()) {
        console.log('tie game')
        gameOver()
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

  function getTurn() {
    return turn
  }

  function gameOver() {
    isOver = true
  }

  function getIsOver() {
    return isOver
  }

  function restart() {
    board = boardFactory()
    // playerOne.setIsWinner(false)
    // playerTwo.setIsWinner(false)
    turn.setIsWinner(false)
    turn = playerOne
    isOver = false
  }

  return {
    getTurn,
    makeMove,
    getIsOver,
    restart
  }
})()

const displayController = (function createDislayController(){
  const tiles = document.querySelectorAll('.tile')
  const gameStatus = document.querySelector('.status')
  const playAgain = document.querySelector('.play-again')

  const { getTurn, makeMove, getIsOver, restart } = game

  const handleTileClick = function (e) {
    const tileNumber = parseInt(e.target.id)
    const turn = getTurn()
    console.log(`${turn.getName()} clicked tile: ${tileNumber}`)
    if(makeMove(tileNumber, turn.getMarker())) {
      e.target.textContent = turn.getMarker()
      if(getIsOver()) { // could be a tie or winner
        console.log('game over no more clicking')
        tearDown()
        // displayMessage()
      } 
      else {
        // updateTurn()
      }
      displayMessage()
    }
  }

  function setup() {
    console.log('sindie setup')
    tiles.forEach(tile => {
      tile.addEventListener('click', handleTileClick)
      tile.textContent = ''
      tile.setAttribute('style', 'cursor: pointer')
    })
    playAgain.addEventListener('click', handlePlayAgain)
    playAgain.setAttribute('style', 'display: none')
    gameStatus.setAttribute('style', 'text-align: center')
    displayMessage()
  }

  function tearDown() {
    tiles.forEach(tile => {
      tile.removeEventListener('click', handleTileClick)
      tile.setAttribute('style', 'cursor: not-allowed')
    })
  }

  function displayMessage() {
    const turn = game.getTurn()
    if(getIsOver()) {
      if(turn.getIsWinner()) {
        gameStatus.textContent = `${turn.getName()} wins!`
      } else {
        gameStatus.textContent = 'Tie game!'
      }
      playAgain.setAttribute('style', 'display: block')
    } else {
      gameStatus.textContent = `Turn: ${turn.getName()}`
    }
  }

  const handlePlayAgain = function(e) {
    console.log('start a new game!!!')
    e.target.setAttribute('style', 'display: none')
    restart()
    setup()
  }
 
  return {
    setup
  }
})()

displayController.setup()




