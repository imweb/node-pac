module.exports = function localHostOrDomainIs (host, hostdom) {
  var parts = String(host).split('.');
  var domparts = String(hostdom).split('.');
  var matches = true;

  for (var i = 0; i < parts.length; i++) {
    if (parts[i] !== domparts[i]) {
      matches = false;
      break;
    }
  }

  return matches;
};
