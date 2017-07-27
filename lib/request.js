var http = require('http');
var https = require('https');
var extend = require('util')._extend;
var parseUrl = require('url').parse;

var TIMEOUT = 5000;

function request(options, callback) {
  if (typeof options.url === 'string') {
    options = extend(parseUrl(options.url), options);
  }
  if (!options.agent) {
    options.agent = false;
  }
  var done;
  var execCallback = function(err, body) {
    if (done) {
      return;
    }
    done = true;
    callback(err, body);
  };
  var handleResponse = function(res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('error', execCallback);
    if (res.statusCode !== 200) {
      return execCallback(new Error('Respose error: ' + res.statusCode));
    }
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      execCallback(null, body);
    });
  };
  var req;
  if (options.protocol === 'https:') {
    req = https.request(options, handleResponse);
  } else {
    options.protocol = null;
    req = http.request(options, handleResponse);
  }
  var timeout = options.timeout > 0 ? options.timeout : TIMEOUT;
  req.setTimeout(timeout, function() {
    req.abort();
  });
  req.on('error', execCallback);
  req.end(options.body);
  return req;
}

module.exports = request;
