var dayOrder = { 'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6 };

function getTodaysDay (gmt) {
  return (gmt ? (new Date()).getUTCDay() : (new Date()).getDay());
}

// start <= value <= finish
function valueInRange (start, value, finish) {
  return (start <= value) && (value <= finish);
}

module.exports = function weekdayRange (wd1, wd2, gmt) {

  var useGMTzone = (wd2 == 'GMT' || gmt == 'GMT'),
    todaysDay  = getTodaysDay(useGMTzone),
    wd1Index   = dayOrder[wd1] || -1,
    wd2Index   = dayOrder[wd2] || -1,
    result     = false;

  if (wd2Index < 0) {
    result = (todaysDay == wd1Index);
  } else {
    if (wd1Index <= wd2Index) {
      result = valueInRange(wd1Index, todaysDay, wd2Index);
    } else {
      result = valueInRange(wd1Index, todaysDay, 6) || valueInRange(0, todaysDay, wd2Index);
    }
  }
  return result;
};
