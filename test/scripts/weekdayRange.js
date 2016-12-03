function FindProxyForURL(url, host) {
  if (weekdayRange("SUN", "SAT")) {
    return "SOCKS weekdayrange.com:8080";
  }
  
  return "DIRECT"; 
}