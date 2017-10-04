var Room = require('./modules/Room');

module.exports = io => {
	var usernames = {};
	var games = {};
	var roomIds = [];

	/* Method used for sending information to users in chat */
	var sendInformation = function() {
		let notFullRooms = [];
		Object.keys(games).forEach(roomId => {
			if (!games[roomId].isFull()) {
				notFullRooms.push(roomId);
			}
		});

		io.to('global').emit('information', {
			usernames: usernames,
			rooms: notFullRooms
		});
	};

	/* Method used for deleting an specific room */
	var deleteRoom = function(roomId) {
		let roomIndex = roomIds.indexOf(roomId);
		if (roomIndex > -1) {
			// room exists
			io.to(roomId).emit('status', {
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
					if (players === 0) {
						// First player to join.
						socket.join(room);
						games[room].setPlayerOne(socket.id);
						io.to(socket.id).emit('room:joined');
						io.to(socket.id).emit('status', {
							turn: null,
							ended: false
						});
					} else if (players === 1) {
						// Second player to join
						socket.join(room);
						games[room].setPlayerTwo(socket.id);
						io.to(socket.id).emit('room:joined');
						// Tell all the users that the game has started.
						io.in(room).emit('status', {
							turn: games[room].whoseTurn()
						});
						sendInformation();
					} else {
						// Room full. This shouldn't happen, but I don't trust in race conditions.
						io.to(socket.id).emit('room:full');
					}
				}
			}
		});

		/* Handle user leaving a channel (room) */
		socket.on('leave', function(room) {
			socket.leave(room);
			if (room !== 'global') {
				// If room is not global, user is quitting a game.
				if (room in games) {
					// Check if user quitting was actually playing the game.
					let game = games[room];
					let playerOne = game.getPlayerOneId();
					let playerTwo = game.getPlayerTwoId();
					if (socket.id === playerOne || socket.id === playerTwo) {
						deleteRoom(room);
					}
				}
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
			Object.keys(games).forEach(roomId => {
				let room = games[roomId];
				let playerOne = room.getPlayerOneId();
				let playerTwo = room.getPlayerTwoId();
				if (playerOne === socket.id || playerTwo === socket.id) {
					deleteRoom(roomId);
				}
			});
			// Update rooms and usernames information in global channel.
			sendInformation();
		});
	});
};
