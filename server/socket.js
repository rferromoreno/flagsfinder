module.exports = (io) => {

  // Chatroom
  var numUsers = 0;

  var games = {};

  var Game = require('./modules/Game');
  var gameMatch = new Game(11, 9);
  gameMatch._shuffle();

  let playerOne, playerTwo;

  io.on('connection', function (socket) {
    console.log(socket.id);
    if (numUsers === 0) {
      playerOne = socket.id;
    } else if (numUsers === 1) {
      playerTwo = socket.id;
    }
    numUsers++;

    // Initial message, so both know that it is Player One's turn.
    socket.emit('message', {
      row: 0,
      column: 0,
      value: '',
      turn: playerOne
    });

    socket.on('game:create', function (room) {
      if (room in games) {
        return ;  // room name already exist
      }

      socket.join(room); 
      games[room].match = new Game(11,9);
      games[room].players = 1;

      // setPlayerOne(socket.id)

    });

    socket.on('game:join', function (room) {
      if (!(room in games)) {
        return ;  // room doesn't exist anymore
      } 

      if (games[room].players >= 2) {
        return ;  // room full
      }

      socket.join(room)
      games[room].players++;

      // setPlayerTwo(socket.id)
      
      // game start
    })

    // when the client emits 'new message', this listens and executes
    socket.on('message', function (data) {
      let value = gameMatch.makeMove(data.row, data.column);
      let msg = {
        row: data.row,
        column: data.column,
        value: value,
        playerOneScore: gameMatch.getPlayerOneScore(),
        playerTwoScore: gameMatch.getPlayerTwoScore(),
        flagsLeft: gameMatch.getFlagsLeft(),
        turn: gameMatch.isPlayerOneTurn() ? playerOne : playerTwo
      }
      io.sockets.emit('message', msg);
    });

    // when the client emits 'new message', this listens and executes
    socket.on('message2', function (data) {
      console.log("Llego el mensaje " + data);
      // we tell the client to execute 'new message'
      socket.broadcast.emit('message2', {
        username: socket.username,
        message: data
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      numUsers--;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    });
  });
}