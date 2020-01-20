const replaceText = require('./replaceText.js');
const assert = require('assert');
replaceText('text', 'e', 't');
describe('Проверка replaceText', function() {
  it('Возвращает измененную строку', function() {
    assert.equal(replaceText('text', 'e', 't'), 'ttxt', 'Вернулся не ожидаемый текст!');
    assert.equal(replaceText('Проверка', 'р', 'и'), 'Пиовеика', 'Вернулся не ожидаемый текст!');
  });
  it('Возвращает false при неправельных параметрах', function() {
    assert.equal(replaceText('text', null, 't'), false);
    assert.equal(replaceText('text', 1, 't'), false);
    assert.equal(replaceText('text', undefined, 't'), false);
    assert.equal(replaceText('text', NaN, 't'), false);
    assert.equal(replaceText('text', {}, 't'), false);
    assert.equal(replaceText(null, 'e', 't'), false);
    assert.equal(replaceText(undefined, 'e', 't'), false);
    assert.equal(replaceText(1, 'e', 't'), false);
    assert.equal(replaceText({}, 'e', 't'), false);
    assert.equal(replaceText(NaN, 'e', 't'), false);
    assert.equal(replaceText('text', 'e', null), false);
    assert.equal(replaceText('text', 'e', {}), false);
    assert.equal(replaceText('text', 'e', 1), false);
    assert.equal(replaceText('text', 'e', undefined), false);
    assert.equal(replaceText('text', 'e', NaN), false);
  });
  it('Возвращает false при отсутствии параметров', function() {
    assert.equal(replaceText(), false);
  });
});