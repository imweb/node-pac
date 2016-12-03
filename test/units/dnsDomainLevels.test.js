var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/dnsDomainLevels.js'), timeout: 1000});

describe('#dnsDomainLevels', function() {
  it('levels === 0', function(done) {
    testPac.FindWhistleProxyForURL('http://www', function(err, res) {
      expect(res === 'proxy://dnsdomainlevels0.com:8080').to.be.equal(true);
      done();
    });
  });
  it('levels === 1', function(done) {
    testPac.FindWhistleProxyForURL('http://www.test', function(err, res) {
      expect(res === 'proxy://dnsdomainlevels1.com:8080').to.be.equal(true);
      done();
    });
  });
  it('levels === 2', function(done) {
    testPac.FindWhistleProxyForURL('http://www.test.com', function(err, res) {
      expect(res === 'socks://dnsdomainlevels2.com:8080').to.be.equal(true);
      done();
    });
  });
  it('levels === 3', function(done) {
    testPac.FindWhistleProxyForURL('http://www.test.com.cn', function(err, res) {
      expect(res === 'socks://dnsdomainlevels3.com:8080').to.be.equal(true);
      done();
    });
  });
  it('levels > 3', function(done) {
    testPac.FindWhistleProxyForURL('www.test.com.cn.test', function(err, res) {
      expect(res === '').to.be.equal(true);
      done();
    });
  });
});
