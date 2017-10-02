// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = require('./socket');
var port = process.env.PORT || 3000;

// Routing
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(port, function() {
	console.log('Server listening at port %d', port);
});

// Socket
socket(io);
