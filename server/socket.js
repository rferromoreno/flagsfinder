var Room = require('./modules/Room');

module.exports = (io) => {

  // Chatroom
  var numUsers = 0;

  var usernames = {};
  var games = {};

  io.on('connection', function (socket) {
    console.log(socket.id);

    usernames[socket.id] = socket.id;
    // Emit the list of usernames
    io.sockets.emit('user:list', usernames);

    socket.on('user:changeName', function (username) {
      usernames[socket.id] = username;
      // User changed its name. Emit all usernames again (to all)
      io.sockets.emit('user:list', usernames);
    });

    socket.on('chat:message', function(msg) {
      let newMsg = {
        username: usernames[socket.id],
        message: msg,
        date: Date.now()
      }
      io.sockets.emit('chat:message', newMsg);
    })

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
      games[room] = new Room(socket.id);
      // Do something to notify player one that game was created.
    });

    socket.on('game:join', function (room) {
      if (!(room in games)) {
        return ;  // room doesn't exist anymore
      } 

      if (games[room].isFull()) {
        return ;  // room full, can't join!
      }

      games[room].setPlayerTwo(socket.id);
      socket.join(room);
      // Do something to notify users that game starts
    })

    // when the client emits 'new message', this listens and executes
    socket.on('message', function (data) {
      let movementStatus = games[room].makeMove(data.row, data.column);
      io.sockets.emit('message', movementStatus);
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
      delete usernames[socket.id];
      // User left. Send username list to all
      io.sockets.emit('user:list', usernames);
    });
  });
}