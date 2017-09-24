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
var gameMatch = new Game();
gameMatch._shuffle();

io.on('connection', function (socket) {
  console.log(socket.id);

  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on('message', function (data) {
    console.log("Llego el mensaje "+JSON.stringify(data));

    let value = gameMatch.makeMove(data.row, data.column);
    var msg = {
      row: data.row,
      column: data.column,
      value: value
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
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});