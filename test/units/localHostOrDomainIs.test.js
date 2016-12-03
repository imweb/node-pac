var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/localHostOrDomainIs.js'), timeout: 1000});

describe('#localHostOrDomainIs', function() {
  it('match', function(done) {
    testPac.FindWhistleProxyForURL('www.test.com', function(err, res) {
      expect(res === 'proxy://localhostordomainis.com:8080').to.be.equal(true);
      done();
    });
  });
  
  it('mismatch', function(done) {
    testPac.FindWhistleProxyForURL('www.ifeng.com', function(err, res) {
      expect(res === '').to.be.equal(true);
      done();
    });
  });
});
