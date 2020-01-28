const isTimeRangesIntersect = require('./isTimeRangesIntersect.js');
const assert = require('assert');
describe('Проверка isTimeRangesIntersect:', function() {
  it('Возвращает false, при не правильно введенных параметрах', function() {
    assert.equal(isTimeRangesIntersect(['09:30'], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(['08:30', '19:3'], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(['08:30', 23], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect([null, '08:30'], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(['08:30', '19:30'], [false, '12:00']), false);
    assert.equal(isTimeRangesIntersect(['08:30', '19:30'], ['10:30', {}]), false);
    assert.equal(isTimeRangesIntersect(['08:30', '19:30']), false);
    assert.equal(isTimeRangesIntersect(12, ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(undefined, ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect({}, ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect([], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect('null', ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(['10:30', '12:00'], 12), false);
    assert.equal(isTimeRangesIntersect(['10:30', '12:00'], undefined), false);
    assert.equal(isTimeRangesIntersect(['10:30', '12:00'], {}), false);
    assert.equal(isTimeRangesIntersect(['10:30', '12:00'], []), false);
    assert.equal(isTimeRangesIntersect(['10:30', '12:00'], 'null'), false);
    assert.equal(isTimeRangesIntersect(['11:30', '09:30'], ['10:30', '12:00']), false);
  });
  it('Возвращает true, когда диапазоны пересекаются', function() {
    assert.equal(isTimeRangesIntersect(['08:30', '19:30'], ['10:30', '12:00']), true);
    assert.equal(isTimeRangesIntersect(['08:30', '11:30'], ['10:30', '12:00']), true);
  });
  it('Возвращает false, когда диапазоны не пересекаются', function() {
    assert.equal(isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00']), false);
    assert.equal(isTimeRangesIntersect(['00:30', '09:30'], ['10:30', '12:00']), false);
  });
  it('Возвращает true, когда диапазоны равны', function() {
    assert.equal(isTimeRangesIntersect(['08:30', '19:30'], ['08:30', '19:30']), true);
    assert.equal(isTimeRangesIntersect(['00:30', '11:30'], ['00:30', '11:30']), true);
  });
  it('Возвращает false при отсутствии параметров', function() {
    assert.equal(isTimeRangesIntersect(), false);
  });
});