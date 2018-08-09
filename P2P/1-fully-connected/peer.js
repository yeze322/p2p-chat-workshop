const topology = require('fully-connected-topology');

const me = process.argv[2];
const firends = process.argv.slice(3);

const swarm = topology(me, firends);

swarm.on('connection', (socket) => {
  console.log('new connection');
});