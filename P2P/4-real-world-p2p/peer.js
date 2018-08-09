const topology = require('fully-connected-topology');
const jsonStream = require('duplex-json-stream');
const streamSet = require('stream-set');
const toPort = require('hash-to-port');

const { register } = require('../lib/dns');

const me = process.argv[2];
const firends = process.argv.slice(3);
console.log('me: ', me);
console.log('friends: ', firends);


// Register DNS
register(me, toAddress(me));

// Build fully-connected topology
const swarm = topology(toAddress(me), firends.map(toAddress));
const streams = streamSet();

// Handle firend -> you
swarm.on('connection', (newFriend) => {
  console.log('new connection');
  newFriend = jsonStream(newFriend);
  streams.add(newFriend);

  newFriend.on('data', (data) => {
    if (isMessageRegistered(data)) {
      return;
    }
    process.stdout.write(data.username + '> ' + data.message + '\n');
    registerId(data.id);
    broadcast(data);
  });
});

// Handle you -> friend
process.stdin.on('data', (data) => {
  const payload = {
    username: me,
    message: data.toString().trim()
  };

  assignIdToNewMessage(payload);

  registerId(payload.id);
  broadcast(payload);
});


// TODO: implement your own rule to solve the 'echo' issue
// (maybe you can use a unique message id to distinct your message?)
// ------------------------------------------------------
let n = 0;
let logs = {}

function genUniqId() {
  // ------------------------------------------------------
}

function isMessageRegistered(payload) {
  // ------------------------------------------------------
}

function registerId(id) {
  // ------------------------------------------------------
}

function assignIdToNewMessage(payload) {
  let id = genUniqId();
  payload.id = id;
  return payload;
}

function broadcast(payload) {
  streams.forEach((friend) => {
    friend.write(payload);
  });
}

function toAddress(name) {
  return 'localhost:' + toPort(name);
}
