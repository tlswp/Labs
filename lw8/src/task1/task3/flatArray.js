'use strict';

function flatArray(array = []) {
  if (Array.isArray(array)) {
    var arrayEdited = array.flat(1);
    for (var i = arrayEdited.length - 1; i >= 0; i--) {
      if (typeof(arrayEdited[i]) !== 'number' && i > -1 || isNaN(arrayEdited[i])) {
        arrayEdited.splice(i, 1);
      }
    }
    return arrayEdited;
  }
  return false;
}
module.exports = flatArray;
flatArray([12, ['ru'],
  [''],
  123, '424', 5325, [
    [5325, 5325], 5
  ],
  [NaN],
  [],
  2, ['www'],
  null
]);