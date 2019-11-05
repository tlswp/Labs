function isArrayEqual(array1, array2) {
  var booleanStatus = true;
  if (array1.length === array2.length && Array.isArray(array1) && Array.isArray(array2)) {
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
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