const net = require('net');

const server = net.createServer((socket) => {
  console.log('A client connected!');

  socket.on('data', function (data) {
    console.log('Data arrived:', data);
    // TODO: use socket.write() to send data to client
    // -----------------------------------------------
  });

});

server.listen(9000);
