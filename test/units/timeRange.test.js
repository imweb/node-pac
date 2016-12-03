var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../../index');
var testPac = new Pac({url: path.join(__dirname, '../scripts/timeRange.js'), timeout: 1000});

describe('#timeRange', function() {
  it('not in the range', function(done) {
    testPac.FindWhistleProxyForURL('www.ifeng.com', function(err, res) {
      expect(res).to.be.equal('proxy://timerange.com:8080');
      done();
    });
  });
});
