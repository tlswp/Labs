'use strict';
const assert = require('assert');

function replaceText(text = false, searchStr = false, newStr = false) {
  if (typeof searchStr === 'string' && typeof newStr === 'string' && typeof text === 'string') {
    var searchStrRegExp = new RegExp(searchStr, 'gi');
    var index = text.search(searchStrRegExp);
    if (index >= 0 && !(/^\s+$/.test(newStr)) && searchStr !== '') {
      return text.replace(searchStrRegExp, newStr);
    }
  }
  return false;
}

describe('Проверка замены строк', function() {
  it('Возвращает измененную строку', function() {
    assert.equal(replaceText('text', 'e', 't'), 'ttxt', 'Вернулся не ожидаемый текст!');
  });
  it('Возвращает входной текст', function() {
    assert.equal(replaceText('text', null, 't'), false);
    assert.equal(replaceText('text', 1, 't'), false);
    assert.equal(replaceText('text', undefined, 't'), false);
    assert.equal(replaceText('text', NaN, 't'), false);
    assert.equal(replaceText('text', {}, 't'), false);
  });
  it('При отсутствии параметров', function() {
    assert.equal(replaceText(), false);
  });
});