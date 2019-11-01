function isTimeRangesIntersect(timeRange1, timeRange2) {
  myArray = [].concat.apply([], myArray);
  for (var i = myArray.length - 1; i >= 0; i--) {
    if (typeof(myArray[i]) != 'number' && i > -1 || isNaN(myArray[i])) {
      myArray.splice(i, 1);
    }
  }
  alert(myArray);
}