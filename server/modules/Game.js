let Board = require('./Board');
let Misc = require('../utils/Misc');

// Constructor function
let Game = function() {
  this._board = new Board(9);
}

// Prototype methods.
Game.prototype._shuffle = function() {
  let board = this._board;
  let boardSize = board.getSize();
  let flagsNumber = 10;
  // Load the board with flags in random positions.
  while (flagsNumber > 0) {
    let randomRow = Misc.getRandomInt(boardSize);
    let randomColumn = Misc.getRandomInt(boardSize);
    if (board.getCell(randomRow, randomColumn) == null) {
      board.setCell(randomRow, randomColumn, 'F');
      flagsNumber--;
    }
  }
  // Load the right numbers in the rest of the cells.
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board.getCell(row, col) !== 'F') {
        let adjacentFlags = board.getAdjacentFlagsCount(row, col);
        board.setCell(row, col, adjacentFlags);
      }
    }
  }
}

Game.prototype.showBoard = function() {
  this._board.showBoard();
}


module.exports = Game;