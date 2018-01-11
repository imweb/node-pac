var vm = require('vm');
var parseUrl = require('url').parse;
var VM_OPTIONS = {
  displayErrors: false,
  timeout: 100,
  filename: 'proxy.pac'
};
var dateRange = require('./dateRange');
var dnsDomainIs = require('./dnsDomainIs');
var dnsDomainLevels = require('./dnsDomainLevels');
var getDnsResolve = require('./dnsResolve');
var isInNet = require('./isInNet');
var isPlainHostName = require('./isPlainHostName');
var isResolvable = require('./isResolvable');
var localHostOrDomainIs = require('./localHostOrDomainIs');
var myIpAddress = require('./myIpAddress');
var shExpMatch = require('./shExpMatch');
var timeRange = require('./timeRange');
var weekdayRange = require('./weekdayRange');

var CONTEXT = vm.createContext();

setInterval(function() {
  CONTEXT = vm.createContext();
}, 30000);

var initContext = function(dnsResolve) {
  CONTEXT.dateRange = dateRange;
  CONTEXT.dnsDomainIs = dnsDomainIs;
  CONTEXT.dnsDomainLevels = dnsDomainLevels;
  CONTEXT.dnsResolve = getDnsResolve(dnsResolve);
  CONTEXT.isInNet = isInNet;
  CONTEXT.isPlainHostName = isPlainHostName;
  CONTEXT.isResolvable = isResolvable;
  CONTEXT.localHostOrDomainIs = localHostOrDomainIs;
  CONTEXT.myIpAddress = myIpAddress;
  CONTEXT.shExpMatch = shExpMatch;
  CONTEXT.timeRange = timeRange;
  CONTEXT.weekdayRange = weekdayRange;
};

var getScript = function(script) {
  var FindProxyForURL = 'var FindProxyForURL = (function(){\n'
    + script + ';\nreturn FindProxyForURL;})();FindProxyForURL';
  try {
    return new vm.Script(FindProxyForURL);
  } catch(e) {}
};

function generateFn(script, dnsResolve) {
  initContext(dnsResolve);
  try {
    var fn = script && script.runInContext(CONTEXT, VM_OPTIONS);
    return typeof fn === 'function' ? fn : null;
  } catch(e) {}
}

var DIRECT = 'DIRECT';
var directPac = function(url, host, cb) {
  return DIRECT;
};
var emptyDnsResolve = function(host, cb) {
  cb();
};
module.exports = function(script, dnsResolve) {
  var hasDnsResolve = /\bdnsResolve\(/.test(script);
  var _dnsResolve = dnsResolve;
  script = getScript(script);
  if (!hasDnsResolve || typeof dnsResolve !== 'function') {
    dnsResolve = emptyDnsResolve;
  }
  return function FindProxyForURL(url, host, cb) {
    var result;
    dnsResolve(host,  function() {
      try {
        host = host || parseUrl(url).hostname;
        var _FindProxyForURL = generateFn(script, _dnsResolve) || directPac;
        result = _FindProxyForURL(url, host);
        result = typeof result == 'string' ? result : DIRECT;
      } catch(e) {} finally {
        Object.keys(CONTEXT).forEach(function(key) {
          delete CONTEXT[key];
        });
      }
      if (typeof cb == 'function') {
        cb(null, result || DIRECT);
      }
    });
    return result || DIRECT;
  };
};
