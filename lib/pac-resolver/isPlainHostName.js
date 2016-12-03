module.exports = function isPlainHostName (host) {
  return !(/\./.test(host));
};
