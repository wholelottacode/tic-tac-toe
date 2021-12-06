function boardFactory() {
  const board = [['','',''], ['','',''], ['','','']]
  return {
    board
  }
}

function playerFactory(name, marker) {
  function makeMove() {
    return `I'm ${name} and I will make a move`
  }

  return {
    makeMove
  }
}

const game = (function gameFactory() {
  const board = boardFactory()
  const playerOne = playerFactory('Player 1', 'X')
  const playerTwo = playerFactory('Player 2', 'O')
  let turn = playerOne
  let isOver = false

  function play() {
    while(!isOver) {
      // let players click on board

      // update board

      // if winner
        // isOver = false
      // else change turns
    }
  }

  return {
    play,
  }
})()

const handleTileClick = function tileClick(e) {
  console.log(typeof e.target.id)
} 

const tiles = document.querySelectorAll('.tile')
tiles.forEach(tile => {
  tile.addEventListener('click', handleTileClick)
})
