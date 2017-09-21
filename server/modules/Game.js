var Board = require('./Board');

var GameModule = (function () {
  
    var _board = new Board();
    var _playerOneTurn = true;
    var _playerOneScore = 0;
    var _playerTwoScore = 0;
  
    var _privateMethod = function () {
      // private stuff
      return _board;
    };
  
    var publicMethod = function () {
      _privateMethod();
    };
  
    var hasGameEnded = function() {
      return false;
    }
  
    return {
      publicMethod: publicMethod,
      hasGameEnded: hasGameEnded
    };
  
  })();
  
  module.exports = GameModule;