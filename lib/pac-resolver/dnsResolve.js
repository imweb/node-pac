var net = require('net');

module.exports = function dnsResolve (host) {
  return net.isIP(host) ? host : '0.0.0.0';
};
