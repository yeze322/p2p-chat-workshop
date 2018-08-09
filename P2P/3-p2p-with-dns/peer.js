const topology = require('fully-connected-topology');
const jsonStream = require('duplex-json-stream');
const streamSet = require('stream-set');
const toPort = require('hash-to-port');

const { register } = require('./dns');

const me = process.argv[2];
const firends = process.argv.slice(3);
console.log('me: ', me);
console.log('friends: ', firends);


function toAddress(name) {
  // TODO: implement your own address hash function. (you can also use 'toPort()')
  // -----------------------------------------------------------------------
  return '?';
}

// Register DNS
register(me, toAddress(me));

// Build fully-connected topology
const swarm = topology(toAddress(me), firends.map(toAddress));
const streams = streamSet();

// Handle firend -> you
swarm.on('connection', (newFriend) => {
  newFriend = jsonStream(newFriend);
  streams.add(newFriend);

  newFriend.on('data', (data) => {
    console.log(data.username + '> ' + data.message);
  });

  console.log('new connection');
});

// Handle you -> friend
process.stdin.on('data', (data) => {
  const payload = {
    username: me,
    message: data.toString().trim()
  };

  // TODO: broadcast your input to each friend in 'firends'
  // ('firends' is an iterable list of socket, use 'firends.forEach()' to iterate on it)
  // ----------------------------------------------------------------------------
  streams.forEach((friend) => {
    friend.write(payload);
  })
});