function FindProxyForURL(url, host) {
  var hours = new Date().getHours();
  var start, end;
  if (hours > 0) {
    start = hours - 1;
    end = hours + 1;
  } else {
    start = hours;
    end = hours + 1;
  }
  if (timeRange(start, end)) {
    return "PROXY timerange.com:8080";
  }
  
  return "DIRECT"; 
}