//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var socketio = require('socket.io');
var io = socketio.listen(server);

var routers=require('./routes/index.js');
var ioreq=require('./routes/io.js');

router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');
router.use(flash());
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));
router.use(session({
    secret: 'chatroom',
    key: 'chatroom',//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
}));

routers(router);
ioreq(io);
server.listen(process.env.PORT || 80, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
