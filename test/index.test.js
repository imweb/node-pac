'use strict';
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var Pac = require('../index');
var filePac = new Pac(path.join(__dirname, 'scripts/normal.pac'));
var fileOptionsPac = new Pac({url: path.join(__dirname, 'scripts/normal.pac'), timeout: 3000});
var fileEmptyPac = Pac(path.join(__dirname, 'scripts/empty.pac'));
var textPac = new Pac(fs.readFileSync(path.join(__dirname, 'scripts/normal.pac')));
var textOptionsPac = new Pac({url: fs.readFileSync(path.join(__dirname, 'scripts/normal.pac')), timeout: 1000});
var textErrPac = Pac(fs.readFileSync(path.join(__dirname, 'scripts/error.pac'), {encoding: 'utf8'}));
var textEmptyPac = new Pac(fs.readFileSync(path.join(__dirname, 'scripts/empty.pac'), {encoding: 'utf8'}));
var proxyPac = new Pac({url: fs.readFileSync(path.join(__dirname, 'scripts/proxy.pac')), timeout: 1000});


describe('#FindProxyForURL(url, cb)', function() {

  it('file: scripts/normal.pac', function(done) {
    filePac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('PROXY 0.0.0.0:80;');
      done();
    });
  });

  it('file: scripts/normal.pac', function(done) {
    fileOptionsPac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('PROXY 0.0.0.0:80;');
      done();
    });
  });

  it('file: scripts/empty.pac', function(done) {
    fileEmptyPac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('DIRECT;');
      done();
    });
  });

  it('text: scripts/normal.pac', function(done) {
    textPac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('PROXY 0.0.0.0:80;');
      done();
    });
  });

  it('text: scripts/normal.pac', function(done) {
    textOptionsPac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('PROXY 0.0.0.0:80;');
      done();
    });
  });

  it('text: scripts/empty.pac', function(done) {
    textEmptyPac.FindProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('DIRECT;');
      done();
    });
  });
});

describe('#forceUpdate()', function() {
  it('return true', function() {
    expect(filePac.forceUpdate()).to.be.equal(true);
    expect(filePac.forceUpdate()).to.be.equal(true);
  });

});

describe('#update()', function() {
  it('return true', function() {
    expect(filePac.update()).to.be.equal(true);
    expect(filePac.update()).to.be.equal(true);
  });

});

describe('#FindProxyForURL(url, cb)', function() {

  it('file: scripts/normal.pac', function(done) {
    filePac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('proxy://0.0.0.0:80');
      done();
    });
  });

  it('file: scripts/normal.pac', function(done) {
    fileOptionsPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('proxy://0.0.0.0:80');
      done();
    });
  });

  it('file: scripts/empty.pac', function(done) {
    fileEmptyPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('');
      done();
    });
  });

  it('text: scripts/normal.pac', function(done) {
    textPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('proxy://0.0.0.0:80');
      done();
    });
  });

  it('text: scripts/normal.pac', function(done) {
    textOptionsPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('proxy://0.0.0.0:80');
      done();
    });
  });

  it('text: scripts/empty.pac', function(done) {
    textEmptyPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      expect(res).to.be.equal('');
      done();
    });
  });

  it('text: scripts/error.pac', function(done) {
    textErrPac.FindWhistleProxyForURL('9v.cn', function(err, res) {
      done();
    });
  });

  it('text: scripts/proxy.pac', function(done) {
    proxyPac.FindProxyForURL('http://www.google.com/', function(err, res) {
      expect(res).to.be.equal('PROXY 127.0.0.1:8123');
      done();
    });
  });

});
