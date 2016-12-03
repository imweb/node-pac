function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, "test.com")) {
    return "PROXY dnsdomainis.com:8080";
  }
  
  return "DIRECT"; 
}