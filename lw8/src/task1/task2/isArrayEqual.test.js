const isArrayEqual = require('./isArrayEqual.js');
const assert = require('assert');
describe('Проверка isArrayEqual:', function() {
  it('Возвращает true при одинаковых массивах', function() {
    assert.equal(isArrayEqual([], []), true);
    assert.equal(isArrayEqual(['a', 2], ['a', 2]), true);
    assert.equal(isArrayEqual([1, 2, 3], [1, 2, 3]), true);
    assert.equal(isArrayEqual([1, 2, undefined], [1, 2, undefined]), true);
    assert.equal(isArrayEqual([1, 2, null], [1, 2, null]), true);
    assert.equal(isArrayEqual([1, 2, false], [1, 2, false]), true);
  });
  it('Возвращает false при разных массивах', function() {
    assert.equal(isArrayEqual([], null), false);
    assert.equal(isArrayEqual([], ['test']), false);
    assert.equal(isArrayEqual([1, null, 3], [1, undefined, 3]), false);
    assert.equal(isArrayEqual([false, null], [true, null]), false);;
  });
  it('Возвращает true при отсутствии параметров', function() {
    assert.equal(isArrayEqual(), true);
  });
});