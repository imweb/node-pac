function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, "www.test.com")) {
    return "PROXY localhostordomainis.com:8080";
  }
  
  return "DIRECT"; 
}