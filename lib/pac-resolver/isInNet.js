var Netmask = require('netmask').Netmask;

module.exports = function isInNet (host, pattern, mask) {
  if (!net.isIP(host)) {
    return false;
  }
  try {
    var netmask = new Netmask(pattern, mask);
    return netmask.contains(host|| '127.0.0.1');
  } catch(e) {}
  return false;
};
