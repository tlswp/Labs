function isArrayEqual(array1, array2) {
  var booleanStatus = true;
  if (array1.length === array2.length) {
    for (var i = 0; i < array1.length; i++) {
      if (typeof(array1[i]) !== typeof(array2[i]) || array1[i] !== array2[i]) {
        booleanStatus = false;
      }
    }
    booleanStatus = booleanStatus && true
    return booleanStatus;
  } else {
    return false;
  }
}
isArrayEqual(['a', 2], ['a', 2]);