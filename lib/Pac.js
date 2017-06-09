'use strict';
var pac = require('./pac-resolver');
var parseUrl = require('url').parse;
var loadScript = require('./loadScript');
var CACHE_TIME = 1000 * 15;
var DIRECT = function(url, host, cb) {cb(null, 'DIRECT;');};

function Pac(options, dnsResolve) {
  if (!(this instanceof Pac)) {
    return new Pac(options);
  }
  if (options instanceof Buffer) {
    options = options.toString();
  }
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  if (typeof dnsResolve === 'function') {
    this._dnsResolve = dnsResolve;
  }
  this._options = options;
  this._callbacks = [];
  var cacheTime = parseInt(options.cacheTime, 10);
  this._cacheTime = isNaN(cacheTime) ? CACHE_TIME : cacheTime;
}

var proto = Pac.prototype;

proto._setup = function(force) {
  var self = this;
  if (self._pending) {
    return true;
  }
  clearTimeout(self._timer);
  self._timer = null;
  if (!force && self._updateTime &&  Date.now() - self._updateTime < self._cacheTime) {
    self._timer = setTimeout(self._setup.bind(self), self._cacheTime);
    return;
  }
  self._pending = true;
  loadScript(self._options, function(err, script) {
    if (err) {
      if (force === 2 || self._script == null) {
        self._script = null;
        self._FindProxyForURL = function(url, host, cb) {
          cb(err);
        };
      }
    } else {
      try {
        script = script || '';
        if (!self._FindProxyForURL || self._script !== script) {
          self._script = script;
          self._FindProxyForURL = script ? pac(script, self._dnsResolve) : DIRECT;
        }
        self._updateTime = Date.now();
      } catch(e) {
        self._FindProxyForURL = function(url, host, cb) {
          cb(e);
        };
      }
    }
    
    if (!self._FindProxyForURL) {
      self._FindProxyForURL = DIRECT;
    }
    
    self._callbacks.forEach(function(ctx) {
      self.FindProxyForURL(ctx.url, ctx.cb);
    });
    self._callbacks = [];
    self._pending = false;
  });
  return true;
};

proto.FindProxyForURL = proto.findProxyForURL = function(url, cb) {
  if (url.indexOf('://') == -1) {
    url = 'http://' + url;
  }
  if (this._FindProxyForURL) {
    this._FindProxyForURL(url, parseUrl(url).hostname, cb);
  } else {
    this._callbacks.push({
      url: url,
      cb: cb
    });
  }
  this._setup();
};

proto.FindWhistleProxyForURL = proto.findWhistleProxyForURL = function(url, cb) {
  this.FindProxyForURL(url, function(err, res) {
    if (!err && /(PROXY|SOCKS)\s+([^;\s]+)/i.test(res)) {
      cb(err, RegExp.$1.toLowerCase() + '://' + RegExp.$2);
    } else {
      cb(err, '');
    }
  });
};

proto.update = function() {
  return this._setup(1);
};

proto.forceUpdate = function() {
  return this._setup(2);
};

module.exports = Pac;
