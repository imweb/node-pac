var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/weekdayRange.js'), timeout: 1000});

describe('#weekdayRange', function() {
  it('in the range', function(done) {
    testPac.FindWhistleProxyForURL('www.ifeng.com', function(err, res) {
      expect(res).to.be.equal('socks://weekdayrange.com:8080');
      done();
    });
  });
});
