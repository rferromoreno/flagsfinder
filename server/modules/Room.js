let Game = require('./Game');

// Constructor function
let Room = function(playerOneId) {
  this._game = new Game(11,9);
  this._playerOneId = playerOneId;
  this._playerTwoId = null;
  this._players = 1;
}

// Prototype methods.
Room.prototype.setPlayerTwo = function (playerTwoId) {
  this._playerTwoId = playerTwoId;
  this._players++;
  this._game._shuffle();
}

Room.prototype.getNumberOfPlayers = function() {
  return this._players;
}

Room.prototype.isFull = function() {
  return this._players === 2
}

Room.prototype.whoseTurn = function() {
  if (this._game.isPlayerOneTurn()) {
    return this._playerOneId
  } else {
    return this._playerTwoId
  }
}

Room.prototype.makeMove = function(row, column) {
  let playerOne = this._playerOneId;
  let playerTwo = this._playerTwoId;
  let value = this._game.makeMove(row, column);
  let response = {
    row: row,
    column: column,
    value: value,
    playerOneScore: this._game.getPlayerOneScore(),
    playerTwoScore: this._game.getPlayerTwoScore(),
    flagsLeft: this._game.getFlagsLeft(),
    turn: this._game.isPlayerOneTurn() ? playerOne : playerTwo,
    ended: this._game.hasGameEnded(),
    winner: this._game.hasGameEnded() ? this.whoseTurn() : null
  }
  return response;
}

module.exports = Room;