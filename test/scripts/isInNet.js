function FindProxyForURL(url, host) {
  if (!isInNet(dnsResolve(host), '192.168.0.0', '255.255.255.0')) {
    return "SOCKS isinnet.com:8080";
  }
  
  return "DIRECT"; 
}