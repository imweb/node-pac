var net = require('net');

module.exports = function (dnsResolve) {
  if (typeof dnsResolve !== 'function') {
    dnsResolve = null;
  }
  return function (host) {
    if (dnsResolve && !net.isIP(host)) {
      host = dnsResolve(host);
    }
    return net.isIP(host) ? host : '0.0.0.0';
  };
};
