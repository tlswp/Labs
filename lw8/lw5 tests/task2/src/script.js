'use strict';

const assert = require('assert');

function isArrayEqual(array1 = false, array2 = false) {
  var booleanStatus = true;
  if (array1 !== null && array2 !== null) {
    if (array1.length === array2.length && Array.isArray(array1) && Array.isArray(array2)) {
      for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          booleanStatus = false;
        }
      }
      booleanStatus = booleanStatus && true;
      return booleanStatus;
    }
  }
  return false;
}
isArrayEqual(['a', 2], ['a', 2]);

describe('Проверка:', function() {
  it('Возвращает ожидаемый результат', function() {
    assert.equal(isArrayEqual([], null), false);
    assert.equal(isArrayEqual([], []), true);
    assert.equal(isArrayEqual(['a', 2], ['a', 2]), true);
    assert.equal(isArrayEqual([], ['test']), false);
    assert.equal(isArrayEqual([1, 2, 3], [1, 2, 3]), true);
    assert.equal(isArrayEqual([1, null, 3], [1, undefined, 3]), false);
    assert.equal(isArrayEqual([false, null], [true, null]), false);
    assert.equal(isArrayEqual(), false);
  });
});