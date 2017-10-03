var Room = require('./modules/Room');

module.exports = (io) => {

  var usernames = {};
  var games = {};
  var roomIds = [];

  var sendInformation = function () {
    io.to('global').emit('information', {
      usernames: usernames,
      rooms: roomIds
    });
  }

  // All the socket logic!
  io.on('connection', function (socket) {
    console.log(socket.id + " connected");
    usernames[socket.id] = socket.id;
    // Emit the list of usernames
    sendInformation();

    /* Handle username change. Then, notify all about this */
    socket.on('user:changeName', function (username) {
      usernames[socket.id] = username;
      sendInformation();
    });

    /* Handle user joining a channel (room) */
    socket.on('join', function (room) {
      if (room === 'global') {
        socket.join(room);
        sendInformation();
      } else {
        if (games[room].isFull() || !(room in games)) {
          // Room full or it doesnt exist. Bye!
          io.to(socket.id).emit('room:full');
        } else {
          let players = games[room].getNumberOfPlayers();
          if (players === 0) {
            games[room].setPlayerOne(socket.id);
          } else {
            games[room].setPlayerTwo(socket.id);
          }
          socket.join(room);
          // Do something to notify users that game starts
          // TODO: REFACTOR!
          io.in(room).emit('message', {
            row: 0,
            column: 0,
            value: '',
            turn: games[room].whoseTurn()
          });
        }
      }
    })

    /* Handle user leaving a channel (room) */
    socket.on('leave', function (room) {
      socket.leave(room);
      sendInformation();
      /*
      if (room === 'global') {
        socket.leave(room);
      } else {
        // TODO: Add some logic here :)
      }
      */
    })

    /* Handle chat message, depending if user is in a private room or not */
    socket.on('chat:message', function (payload) {
      let newMsg = {
        username: usernames[socket.id],
        message: payload.message,
        date: Date.now()
      }
      io.to(payload.room).emit('chat:message', newMsg);
    })

    /* 
      Handle game creation. If it already exists, do nothing. 
      Else, create the game and notify about the creation to the user.
      Also, notify all users about this creation.
    */
    socket.on('game:create', function (room) {
      if (room in games) {
        return; // room name already exist
      }
      games[room] = new Room();
      roomIds.push(room);
      io.to(socket.id).emit('game:created:ok', {
        room
      });
      sendInformation();
    });

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

      let roomIndex = roomIds.indexOf(socket.id);
      if (roomIndex > -1) { // room exists
        // Here, I could broadcast a msg to users in a certain room,
        // and ask them to leave the room.
        delete games[socket.id];
        roomIds.splice(roomIndex, 1);
      }
      // Send usernames and rooms list to all
      sendInformation();
    });
  });
}