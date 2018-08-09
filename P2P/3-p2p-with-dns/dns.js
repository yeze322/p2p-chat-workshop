const fs = require('fs');

function register(username, address) {
  console.log('register:', username, address);

  let filepath = __dirname + '/dns.json';
  let dnsStr = fs.readFileSync(filepath).toString();
  let dnsDic = JSON.parse(dnsStr);
  dnsDic[username] = address;
  fs.writeFileSync(
    filepath,
    JSON.stringify(dnsDic, null, '\t')
  );
}

module.exports = {
  register,
}