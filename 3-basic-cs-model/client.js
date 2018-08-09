const net = require('net');

const socket = net.connect(9000, 'localhost');

socket.on('data', (data) => {
  process.stdout.write(data);
});

process.stdin.on('data', (data) => {
  socket.write(data);
});
