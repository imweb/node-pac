var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/shExpMatch.js'), timeout: 1000});

describe('#shExpMatch', function() {
  it('*', function(done) {
    testPac.FindWhistleProxyForURL('http://www.test.com', function(err, res) {
      expect(res === 'proxy://shexpmatch1.com:8080').to.be.equal(true);
      done();
    });
  });
  it('*', function(done) {
    testPac.FindWhistleProxyForURL('http://.test.com', function(err, res) {
      expect(res === 'proxy://shexpmatch1.com:8080').to.be.equal(true);
      done();
    });
  });
  it('?', function(done) {
    testPac.FindWhistleProxyForURL('http://1.test2.com', function(err, res) {
      expect(res).to.be.equal('proxy://shexpmatch2.com:8080');
      done();
    });
  });
  it('others', function(done) {
    testPac.FindWhistleProxyForURL('http://wwwitesticom', function(err, res) {
      expect(res === '').to.be.equal(true);
      done();
    });
  });
  it('others', function(done) {
    testPac.FindWhistleProxyForURL('http://22.test2.com', function(err, res) {
      expect(res === '').to.be.equal(true);
      done();
    });
  });
});
