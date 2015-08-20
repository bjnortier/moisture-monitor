var app = require('express')();
var path = require('path');
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var child_process = require('child_process');

app.use('/bundles', express.static(path.join(__dirname, '..', 'bundles')));
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

io.on('connection', function(socket) {
  console.log('websocket connection');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

var p = child_process.spawn(
  'ssh',
  ['pi@192.168.0.3', 'python /home/pi/moisture-monitor/read_values.py'], 
  {});

p.stdout.on('data', function (data) {
  console.log('data:', String(data));
  io.emit('data', JSON.parse(String(data)));
});
p.stderr.on('data', function (data) {
  console.error('err', String(data));
});
p.on('close', function (code) {
  console.log('child process exited with code ' + code);
});