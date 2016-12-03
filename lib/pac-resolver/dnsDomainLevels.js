module.exports = function dnsDomainLevels (host) {
  var match = String(host).match(/\./g);
  var levels = 0;
  if (match) {
    levels = match.length;
  }
  return levels;
};
