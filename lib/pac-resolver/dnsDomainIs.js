module.exports = function dnsDomainIs (host, domain) {
  host = String(host);
  domain = String(domain);
  return host.substr(domain.length * -1) === domain;
};
