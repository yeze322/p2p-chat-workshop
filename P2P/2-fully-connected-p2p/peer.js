const topology = require('fully-connected-topology');
const jsonStream = require('duplex-json-stream');
const streamSet = require('stream-set');

const me = process.argv[2];
const firends = process.argv.slice(3);
console.log('me: ', me);
console.log('friends: ', firends);


const swarm = topology(me, firends);
const streams = streamSet();

swarm.on('connection', (newFriend) => {
  newFriend = jsonStream(newFriend);
  streams.add(newFriend);

  newFriend.on('data', (data) => {
    console.log(data.username + '> ' + data.message);
  });

  console.log('new connection');
});


process.stdin.on('data', (data) => {
  const payload = {
    username: me,
    message: data.toString().trim()
  };

  // TODO: broadcast your input to each friend in 'firends'
  // ('firends' is an iterable list of socket, use 'firends.forEach()' to iterate on it)
  // ----------------------------------------------------------------------------
});