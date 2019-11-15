function isTimeRangesIntersect(timeRange1, timeRange2) {
  var validateTimeRanges = /\d{2}:{1}(?=[0-5]\d$)/.test(timeRange1[0]) && 
    /\d{2}:(?=[0-5]\d$)/.test(timeRange1[1]) &&
    /\d{2}:(?=[0-5]\d$)/.test(timeRange2[0]) && 
    /\d{2}:(?=[0-5]\d$)/.test(timeRange2[1]) && 
    timeRange1[0] < '24' && timeRange1[1] < '24' && 
    timeRange2[0] < '24' && timeRange2[1] < '24' &&
    timeRange1[0] < timeRange1[1] && 
    timeRange2[0] < timeRange2[1] && 
    timeRange1[1] >= timeRange2[0] && 
    timeRange1[0] <= timeRange2[1];
  if (Array.isArray(timeRange1) && Array.isArray(timeRange2) && validateTimeRanges) {
      return true;
  }
  return false;
}
//isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00'])
//isTimeRangesIntersect(['08:30', '19:30'], ['10:30', '12:00'])
