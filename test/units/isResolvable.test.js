var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/isResolvable.js'), timeout: 1000});

describe('#isResolvable', function() {
  it('not in the range', function(done) {
    testPac.FindWhistleProxyForURL('www.ifeng.com', function(err, res) {
      expect(res === 'socks://isresolvable.com:8080').to.be.equal(true);
      done();
    });
  });
});
