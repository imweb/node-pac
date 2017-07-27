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

function generateFn(script, dnsResolve) {
  try {
    var fn = vm.runInNewContext(script + ';FindProxyForURL', {
      dateRange: dateRange,
      dnsDomainIs: dnsDomainIs,
      dnsDomainLevels: dnsDomainLevels,
      dnsResolve: getDnsResolve(dnsResolve),
      isInNet: isInNet,
      isPlainHostName: isPlainHostName,
      isResolvable: isResolvable,
      localHostOrDomainIs: localHostOrDomainIs,
      myIpAddress: myIpAddress,
      shExpMatch: shExpMatch,
      timeRange: timeRange,
      weekdayRange: weekdayRange
    }, VM_OPTIONS);
    return typeof fn === 'function' ? fn : null;
  } catch(e) {}
}

var DIRECT = 'DIRECT';
var directPac = function(url, host, cb) {
  cb(null, DIRECT);
};
var emptyDnsResolve = function(host, cb) {
  cb();
};
module.exports = function(script, dnsResolve) {
  var hasDnsResolve = /\bdnsResolve\(/.test(script);
  var _FindProxyForURL = generateFn(script, dnsResolve) || directPac;
  if (!hasDnsResolve || typeof dnsResolve !== 'function') {
    dnsResolve = emptyDnsResolve;
  }
  return function FindProxyForURL(url, host, cb) {
    var result;
    dnsResolve(host,  function() {
      try {
        host = host || parseUrl(url).hostname;
        result = _FindProxyForURL(url, host);
        result = typeof result == 'string' ? result : DIRECT;
      } catch(e) {}
      if (typeof cb == 'function') {
        cb(null, result || DIRECT);
      }
    });
    return result || DIRECT;
  };
};
