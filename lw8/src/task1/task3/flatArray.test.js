const flatArray = require('./flatArray.js');
const assert = require('assert');

describe('Проверка flatArray:', function() {
  it('Все элементы валидно поднимаются на глубину №1', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(flatArray([]), []);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
  });
  it('Глубина обработки вложенных массивов = 1', function() {
    assert.deepEqual(flatArray([1, [
      [2, 3], 1
    ], 3]), [1, 1, 3]);
  });
  it('Оставляет в массиве только Number', function() {
    assert.deepEqual(flatArray([1, {}, undefined, 1, null, NaN, 'test']), [1, 1]);
  });
  it('Возвращает false при неверных параметров', function() {
    assert.equal(flatArray({}), false);
    assert.equal(flatArray(1), false);
    assert.equal(flatArray(undefined), false);
    assert.equal(flatArray('test'), false);
    assert.equal(flatArray(NaN), false);
    assert.equal(flatArray(true), false);
  });
  it('Возвращает false при отсутствии параметров', function() {
    assert.equal(flatArray(), false);
  });
});