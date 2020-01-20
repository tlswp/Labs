const check = require('./check.js')
const assert = require('assert');
describe('Проверка check:', function() {
  it('Возвращает true, когда тип данных соответстует введенному', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check(null, 'null'), true);
    assert.equal(check(1, 'number'), true);
    assert.equal(check({}, 'object'), true);
    assert.equal(check('123', 'string'), true);
  });
  it('Возвращает false, когда тип данных не соответстует введенному', function() {
    assert.equal(check([], 'number'), false);
    assert.equal(check([], 'null'), false);
    assert.equal(check([], 'string'), false);
    assert.equal(check([], 'object'), false);
    assert.equal(check(null, 'object'), false);
  });
  it('Возвращает false при отсутствии параметров', function() {
    assert.equal(check(), false);
  });
});