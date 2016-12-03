function toRegExp (str) {
  str = String(str)
    .replace(/\./, '\\.')
    .replace(/\?/g, '.')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + str + '$');
}

module.exports = function shExpMatch (str, shexp) {
  var re = toRegExp(shexp);
  return re.test(str);
};
