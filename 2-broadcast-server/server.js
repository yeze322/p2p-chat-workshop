const net = require('net');
const streamSet = require('stream-set');

const streams = streamSet();

const server = net.createServer((thisSocket) => {
  console.log('A client connected!');

  streams.forEach((otherSocket) => {

    // 1 - connect other client -> this client
    otherSocket.on('data', (data) => {
      // TODO: forward other client's message to this client. (socket.write)
      // -----------------------------------------------
    });

    // 2 - connect this client -> other client
    thisSocket.on('data', (data) => {
      // TODO: broadcast this client's message to other client. (socket.write)
      // -----------------------------------------------
    });

  });


  // 3 - add thisSocket to stream set
  streams.add(thisSocket);
});

server.listen(9000);
