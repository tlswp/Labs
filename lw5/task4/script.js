function isTimeRangesIntersect(timeRange1, timeRange2) {
  if (Array.isArray(timeRange1) && Array.isArray(timeRange2)) {
    if (/\d{2}:{1}(?=\d{2})/.test(timeRange1[0]) && /\d{2}:(?=\d{2})/.test(timeRange1[1]) &&
      /\d{2}:(?=\d{2})/.test(timeRange2[0]) && /\d{2}:(?=\d{2})/.test(timeRange2[1]) &&
      timeRange1[0].length === 5 && timeRange1[1].length === 5 &&
      timeRange2[0].length === 5 && timeRange2[1].length === 5) {
      var timeRange1Minutes1 = timeRange1[0];
      var timeRange1Minutes2 = timeRange1[1];
      var timeRange2Minutes1 = timeRange2[0];
      var timeRange2Minutes2 = timeRange2[1];
      if (timeRange1[0] < '23' && timeRange1[1] < '23' && timeRange2[0] < '23' && timeRange2[1] < '23' &&
        timeRange1Minutes1[3] < '6' && timeRange1Minutes2[3] < '6' && timeRange2Minutes1[3] < '6' &&
        timeRange2Minutes2[3] < '6' && timeRange1[0] < timeRange1[1] && timeRange2[0] < timeRange2[1]) {
        if (timeRange1[1] >= timeRange2[0]) {
          return true;
        }
      }
    }
  }
  return false;
}
//isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00'])
//isTimeRangesIntersect(['08:30', '19:30'], ['10:30', '12:00'])