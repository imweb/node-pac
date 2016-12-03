function FindProxyForURL(url, host) {
  if (isPlainHostName(host)) {
    return "SOCKS isplainhostname.com:8080";
  }
  
  return "PROXY isplainhostname.com:8080"; 
}