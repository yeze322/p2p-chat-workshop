const net = require('net');
const streamSet = require('stream-set');

const streams = streamSet();

const server = net.createServer((thisSocket) => {
  console.log('A client connected!');
  streams.forEach((otherSocket) => {
    otherSocket.on('data', (data) => {
      thisSocket.write(data);
    });
    thisSocket.on('data', (data) => {
      otherSocket.write(data);
    });
  });
  streams.add(thisSocket);
});

server.listen(9000, '0.0.0.0');
