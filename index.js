var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(app.router);

[ 'app', 'assets' ].forEach(function(dir) {
  app.use('/' + dir, express.static(__dirname + '/' + dir));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/sensors', function(req, res) {
  io.sockets.emit('sensordata', req.body.data);
  res.end('received');
});

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
console.log('listening on localhost:3000');