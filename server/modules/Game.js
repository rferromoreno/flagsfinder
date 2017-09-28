let Board = require('./Board');
let Misc = require('../utils/Misc');

// Constructor function
let Game = function(numberOfFlags, boardSize) {
  this._board = new Board(boardSize);
  this._playerOneTurn = true;
  this._flagsInMap = numberOfFlags;
  this._playerOneScore = 0;
  this._playerTwoScore = 0;
}

// Prototype methods.
Game.prototype._shuffle = function() {
  let board = this._board;
  let boardSize = board.getSize();
  let flagsNumber = this._flagsInMap;
  // Load the board with flags in random positions.
  let randomRow, randomColumn;
  while (flagsNumber > 0) {
    randomRow = Misc.getRandomInt(boardSize);
    randomColumn = Misc.getRandomInt(boardSize);
    if (board.getCell(randomRow, randomColumn) == null) {
      board.setCell(randomRow, randomColumn, 'F');
      flagsNumber--;
    }
  }
  // Load the right numbers in the rest of the cells.
  let adjacentFlags;
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board.getCell(row, col) !== 'F') {
        adjacentFlags = board.getAdjacentFlagsCount(row, col);
        board.setCell(row, col, adjacentFlags);
      }
    }
  }
}

Game.prototype.makeMove = function(row, column) {
  let cellValue = this._board.getCell(row, column);
  if (cellValue !== 'F') {  // flag not found, change turn
    this._playerOneTurn = !this._playerOneTurn; 
  } else {                  // flag found, update the score
    if (this._playerOneTurn) {
      this._playerOneScore++
    } else {
      this._playerTwoScore++
    }
  }
  return cellValue
}

Game.prototype.isPlayerOneTurn = function() {
  return this._playerOneTurn
}

Game.prototype.showBoard = function() {
  this._board.showBoard();
}

Game.prototype.hasGameEnded = function() {
  let flagsToWin = Misc.div(this._flagsInMap,2)+1;
  return (this._playerOneScore >= flagsToWin || this._playerTwoScore >= flagsToWin)
}

Game.prototype.getPlayerOneScore = function() {
  return this._playerOneScore
}

Game.prototype.getPlayerTwoScore = function() {
  return this._playerTwoScore
}

Game.prototype.getFlagsLeft = function() {
  return this._flagsInMap - this.getPlayerOneScore() + this.getPlayerTwoScore()
}

module.exports = Game;