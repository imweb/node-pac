function FindProxyForURL(url, host) {
  if (isResolvable(host)) {
    return "SOCKS isresolvable.com:8080";
  }
  
  return "DIRECT"; 
}