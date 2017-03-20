/// @addtogroup watchstock-server
/// @{
/// @file app.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');

// DB Setup
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/stocks');
}

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '.')));
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

router(app);

var socket_connections = [];

exports.fordwardMessage = function (message_id, data){

     socket_connections.forEach(connectedSocket => {
           connectedSocket.emit(message_id, data);
      });
}

io.on('connection', function (socket) {

    console.log("Connected succesfully to the socket ...");

    socket_connections.push(socket);

    socket.on('disconnect', () => {
      const index = socket_connections.indexOf(socket);
      socket_connections.splice(index, 1);
    });
});


module.exports = server;

/// @}