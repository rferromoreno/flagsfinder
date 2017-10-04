var Room = require('./modules/Room');

module.exports = io => {
	var usernames = {};
	var games = {};
	var roomIds = [];

	/* Method used for sending information to users in chat */
	var sendInformation = function() {
		io.to('global').emit('information', {
			usernames: usernames,
			rooms: roomIds
		});
	};

	/* Method used for deleting an specific room */
	var deleteRoom = function(roomId) {
		let roomIndex = roomIds.indexOf(roomId);
		if (roomIndex > -1) {
			// room exists
			io.to(roomId).emit('message', {
				turn: null,
				ended: true
			});
			delete games[roomId];
			roomIds.splice(roomIndex, 1);
		}
	};

	// All the socket logic!
	io.on('connection', function(socket) {
		console.log(socket.id + ' connected');
		usernames[socket.id] = socket.id;
		// Emit the list of usernames
		sendInformation();

		/* Handle username change. Then, notify all about this */
		socket.on('user:changeName', function(username) {
			usernames[socket.id] = username;
			sendInformation();
		});

		/* Handle user joining a channel (room) */
		socket.on('join', function(room) {
			if (room === 'global') {
				socket.join(room);
				sendInformation();
			} else {
				if (!(room in games)) {
					// Room doesn't exist
					io.to(socket.id).emit('room:full');
				} else if (games[room].isFull()) {
					// Room full
					io.to(socket.id).emit('room:full');
				} else {
					let players = games[room].getNumberOfPlayers();
					socket.join(room);
					if (players === 0) {
						// First player to join.
						games[room].setPlayerOne(socket.id);
						io.to(socket.id).emit('status', {
							turn: null,
							ended: false
						});
					} else {
						// Second player to join
						games[room].setPlayerTwo(socket.id);
						// Tell all the user that the game has started.
						io.in(room).emit('status', {
							turn: games[room].whoseTurn()
						});
					}
				}
			}
		});

		/* Handle user leaving a channel (room) */
		socket.on('leave', function(room) {
			socket.leave(room);
			if (room !== 'global') {
				// If room is not global, user is quitting a game.
				deleteRoom(room);
			}
			sendInformation();
		});

		/* Handle chat message, depending if user is in a private room or not */
		socket.on('chat:message', function(payload) {
			let newMsg = {
				username: usernames[socket.id],
				message: payload.message,
				date: Date.now()
			};
			io.to(payload.room).emit('chat:message', newMsg);
		});

		/* 
      Handle game creation. If it already exists, do nothing. 
      Else, create the game and notify about the creation to the user.
      Also, notify all users about this creation.
    */
		socket.on('game:create', function(room) {
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

		/* Event logic for game movement */
		socket.on('message', function(data) {
			if (data.room in games) {
				let movementStatus = games[data.room].makeMove(data.row, data.column);
				io.in(data.room).emit('message', movementStatus);
			}
		});

		// when the user disconnects.. perform this
		socket.on('disconnect', function() {
			delete usernames[socket.id];
			// Delete the room and inform everyone in the channel, if possible
			deleteRoom(socket.id);
			// Update rooms and usernames information in global channel.
			sendInformation();
		});
	});
};
