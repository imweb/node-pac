
function secondsElapsedToday (hh, mm, ss) {
  return ((hh*3600) + (mm*60) + ss);
}

function getCurrentHour (gmt, currentDate) {
  return (gmt ? currentDate.getUTCHours() : currentDate.getHours());
}

function getCurrentMinute (gmt, currentDate) {
  return (gmt ? currentDate.getUTCMinutes() : currentDate.getMinutes());
}

function getCurrentSecond (gmt, currentDate) {
  return (gmt ? currentDate.getUTCSeconds() : currentDate.getSeconds());
}

// start <= value <= finish
function valueInRange (start, value, finish) {
  return (start <= value) && (value <= finish);
}

module.exports = function timeRange() {
  var args        = Array.prototype.slice.call(arguments),
    lastArg     = args.pop(),
    useGMTzone  = (lastArg == 'GMT'),
    currentDate = new Date();

  if (!useGMTzone) { args.push(lastArg); }

  var noOfArgs    = args.length,
    result      = false,
    numericArgs = args.map(function(n) { return parseInt(n); });

  // timeRange(hour)
  if (noOfArgs == 1) {
    result = getCurrentHour(useGMTzone, currentDate) == numericArgs[0];

  // timeRange(hour1, hour2)
  } else if (noOfArgs == 2) {
    var currentHour = getCurrentHour(useGMTzone, currentDate);
    result = (numericArgs[0] <= currentHour) && (currentHour < numericArgs[1]);

  // timeRange(hour1, min1, hour2, min2)
  } else if (noOfArgs == 4) {
    result =
      valueInRange(
        secondsElapsedToday(numericArgs[0], numericArgs[1], 0),
        secondsElapsedToday(getCurrentHour(useGMTzone, currentDate), getCurrentMinute(useGMTzone, currentDate), 0),
        secondsElapsedToday(numericArgs[2], numericArgs[3], 59)
      );

  // timeRange(hour1, min1, sec1, hour2, min2, sec2)
  } else if (noOfArgs == 6) {
    result =
      valueInRange(
        secondsElapsedToday(numericArgs[0], numericArgs[1], numericArgs[2]),
        secondsElapsedToday(
          getCurrentHour(useGMTzone, currentDate),
          getCurrentMinute(useGMTzone, currentDate),
          getCurrentSecond(useGMTzone, currentDate)
        ),
        secondsElapsedToday(numericArgs[3], numericArgs[4], numericArgs[5])
      );
  }

  return result;
};
