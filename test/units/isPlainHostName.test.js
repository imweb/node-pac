var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/isPlainHostName.js'), timeout: 1000});

describe('#isPlainHostName', function() {
  it('match', function(done) {
    testPac.FindWhistleProxyForURL('test', function(err, res) {
      expect(res === 'socks://isplainhostname.com:8080').to.be.equal(true);
      done();
    });
  });
  
  it('mismatch', function(done) {
    testPac.FindWhistleProxyForURL('www.ifeng.com', function(err, res) {
      expect(res === 'proxy://isplainhostname.com:8080').to.be.equal(true);
      done();
    });
  });
});
