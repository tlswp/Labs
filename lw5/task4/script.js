function isTimeRangesIntersect(timeRange1, timeRange2) {
  if (Array.isArray(timeRange1) && Array.isArray(timeRange2)) {
    if (/\d{2}:{1}(?=[0-5]\d$)/.test(timeRange1[0]) && /\d{2}:(?=[0-5]\d$)/.test(timeRange1[1]) &&
      /\d{2}:(?=[0-5]\d$)/.test(timeRange2[0]) && /\d{2}:(?=[0-5]\d$)/.test(timeRange2[1])) {
      if (timeRange1[0] < '23' && timeRange1[1] < '23' && timeRange2[0] < '23' && timeRange2[1] < '23' &&
        timeRange1[0] < timeRange1[1] && timeRange2[0] < timeRange2[1]) {
        if (timeRange1[1] >= timeRange2[0] && timeRange1[0] <= timeRange2[1]) {
          return true;
        }
      }
    }
  }
  return false;
}
//isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00'])
//isTimeRangesIntersect(['08:30', '19:30'], ['10:30', '12:00'])