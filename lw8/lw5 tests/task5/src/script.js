'use strict';
const assert = require('assert');

function check(data = false, expectedType = false) {
  if (expectedType === 'array') {
    return Array.isArray(data);
  }
  if (expectedType === 'null') {
    return data === null;
  }
  if (expectedType === typeof(data) && !Array.isArray(data)) {
    return true;
  } else { return false; }
}

check([null], 'array');
describe('Проверка:', function() {
  it('Возвращает ожидаемый результат', function() {
    assert.equal(check([], 'number'), false);
    assert.equal(check([], 'null'), false);
    assert.equal(check([], 'array'), true);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check(null, 'string'), false);
    assert.equal(check(), false);
  });
});