'use strict';

function isArrayEqual(array1 = [], array2 = []) {
  var booleanStatus = true;
  if (Array.isArray(array1) && Array.isArray(array2) && array1.length === array2.length) {
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        booleanStatus = false;
      }
    }
    booleanStatus = booleanStatus && true;
    return booleanStatus;
  }
  return false;
}
module.exports = isArrayEqual;