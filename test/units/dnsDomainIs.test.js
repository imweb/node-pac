var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/dnsDomainIs.js'), timeout: 1000});

describe('#dnsDomainIs', function() {
  it('match', function(done) {
    testPac.FindWhistleProxyForURL('www.test.com', function(err, res) {
      expect(res === 'proxy://dnsdomainis.com:8080').to.be.equal(true);
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
