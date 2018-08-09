const net = require('net');
const jsonStream = require('duplex-json-stream');

const username = process.argv[2];

const socket = jsonStream(net.connect(9000, 'localhost'));

socket.on('data', (data) => {
  console.log(data.username + '> ' + data.message);
});

process.stdin.on('data', (data) => {
  socket.write({
    username: username,
    message: data.toString().trim()
  });
});
