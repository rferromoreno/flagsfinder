var Room = require('./modules/Room');

module.exports = (io) => {

  var usernames = {};
  var games = {};
  var roomIds = [];

  var sendInformation = function() {
    console.log("Emitting...");
    io.sockets.emit('information', {
      usernames: usernames,
      rooms: roomIds
    });
  }

  // All the socket logic!
  io.on('connection', function (socket) {
    console.log(socket.id);

    usernames[socket.id] = socket.id;
    // Emit the list of usernames
    sendInformation();

    socket.on('user:changeName', function (username) {
      usernames[socket.id] = username;
      // User changed its name. Emit all usernames again (to all)
      sendInformation();
    });

    socket.on('chat:message', function(msg) {
      let newMsg = {
        username: usernames[socket.id],
        message: msg,
        date: Date.now()
      }
      io.sockets.emit('chat:message', newMsg);
    })

    socket.on('game:create', function (room) {
      if (room in games) {
        return ;  // room name already exist
      }

      socket.join(room); 
      games[room] = new Room(socket.id);
      roomIds.push(room);
      // Do something to notify player one that game was created.
      io.to(room).emit('game:created:ok', {room});
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

      // TODO: Remove this. REFACTOR!
      io.in(room).emit('message', {
        row: 0,
        column: 0,
        value: '',
        turn: games[room].whoseTurn()
      });
  
    })

    // when the client emits 'new message', this listens and executes
    socket.on('message', function (data) {
      if (data.room in games) { 
        let movementStatus = games[data.room].makeMove(data.row, data.column);
        io.in(data.room).emit('message', movementStatus);
      }
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      delete usernames[socket.id];
      // User left. Send username list to all
      io.sockets.emit('user:list', usernames);
    });
  });
}