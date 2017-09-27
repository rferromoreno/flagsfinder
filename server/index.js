module.exports = () => {
  // Setup basic express server
  var express = require('express');
  var app = express();
  var path = require('path');
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var socket = require('./socket');
  var port = process.env.PORT || 8000;

  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  // Routing
  app.use(express.static(path.join(__dirname, 'public')));

  // Socket
  socket(io);
  
}