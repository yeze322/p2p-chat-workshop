To start a peer, you need:
1. assign an ip to yourself
2. provide a list of peer's ip

example:
Peer1: `node ./peer.js localhost:9001 localhost:9002 localhost:9003`
Peer2: `node ./peer.js localhost:9002 localhost:9001 localhost:9003`
Peer1: `node ./peer.js localhost:9003 localhost:9001 localhost:9002`

Then your topology will be a fully connected triangle.