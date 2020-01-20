const flatArray = require('./flatArray.js');
const assert = require('assert');

describe('Проверка flatArray:', function() {
  it('Сглаживает массив', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(flatArray([]), []);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
  });
  it('Глубина массива равна 1', function() {
    assert.deepEqual(flatArray([1, [
      [2, 3], 1
    ], 3]), [1, 1, 3]);
  });
  it('Оставляет в массиве только Number', function() {
    assert.deepEqual(flatArray([1, [1], {}, undefined, null, NaN, ['test']]), [1, 1]);
  });
  it('Возвращает false при отсутствии параметров', function() {
    assert.equal(flatArray(), false);
  });
});