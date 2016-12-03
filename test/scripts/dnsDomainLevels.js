function FindProxyForURL(url, host) {
  if (dnsDomainLevels(host) === 0) {
    return "PROXY dnsdomainlevels0.com:8080";
  }
  
  if (dnsDomainLevels(host) === 1) {
    return "PROXY dnsdomainlevels1.com:8080";
  }
  
  if (dnsDomainLevels(host) === 2) {
    return "SOCKS dnsdomainlevels2.com:8080";
  }
  
  if (dnsDomainLevels(host) === 3) {
    return "SOCKS dnsdomainlevels3.com:8080";
  }
  
  return "DIRECT"; 
}