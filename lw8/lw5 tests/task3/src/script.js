'use strict';
const assert = require('assert');

function flatArray(array = false) {
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
describe('Проверка:', function() {
  it('Возвращает ожидаемый результат', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(flatArray([]), []);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
    assert.deepEqual(flatArray([1, [1], null, NaN, ['test']]), [1, 1]);
    assert.deepEqual(flatArray(), false);
  });
});