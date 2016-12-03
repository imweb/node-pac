function FindProxyForURL(url, host) {
  if (myIpAddress(host) === '127.0.0.1') {
    return "SOCKS myipaddress.com:8080";
  }
  
  return "DIRECT"; 
}