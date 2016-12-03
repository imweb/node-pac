function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.test.com")) {
    return "PROXY shexpmatch1.com:8080";
  }
  
  if (shExpMatch(host, "?.test2.com")) {
    return "PROXY shexpmatch2.com:8080";
  }
  
  return "DIRECT"; 
}