function FindProxyForURL(url, host) {
  if (dnsResolve(host) == '0.0.0.0') {
    return "SOCKS dnsresolve.com:8080";
  }
  
  return "DIRECT"; 
}