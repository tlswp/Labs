'use strict';

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
module.exports = replaceText;