const net = require('net');

const socket = net.connect(9000, 'localhost');

socket.on('data', (data) => {
  // TODO: print out the message (use 'console.log' or 'process.stdout.write')
  // ---------------------------------------------
});

process.stdin.on('data', (data) => {
  // TODO: forward stdin to socket
  // ---------------------------------------------
});
