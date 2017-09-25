// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom
var numUsers = 0;

var Game = require('./server/modules/Game');
var gameMatch = new Game(11,9);
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

  // when the client emits 'new message', this listens and executes
  socket.on('message', function (data) {
    console.log("Llego el mensaje "+JSON.stringify(data));

    let value = gameMatch.makeMove(data.row, data.column);
    let msg = {
      row: data.row,
      column: data.column,
      value: value,
      turn: gameMatch.isPlayerOneTurn() ? playerOne : playerTwo
    }
    io.sockets.emit('message', msg);
  });

   // when the client emits 'new message', this listens and executes
   socket.on('message2', function (data) {
    console.log("Llego el mensaje "+data);
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