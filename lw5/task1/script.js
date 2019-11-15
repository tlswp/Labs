var btn = document.querySelector('.btn');
var text;

function replaceText(text, searchStr, newStr) {
  if (typeof searchStr === 'string' && typeof newStr === 'string' && typeof text === 'string') {
    var searchStrRegExp = new RegExp(searchStr, 'gi');
    var index = text.search(searchStrRegExp);
    if (index >= 0 && !(/^\s+$/.test(newStr)) && searchStr !== '') {
      return text.replace(searchStrRegExp, newStr);
    }
  }
  return text;
}

function replaceTextUi() {
  text = document.querySelector('.text').innerHTML;
  var searchStr = document.querySelector('.search').value;
  var newStr = document.querySelector('.new').value;
  var textForUi = document.querySelector('.text');
  textForUi.textContent = replaceText(text, searchStr, newStr);
}
btn.addEventListener('click', replaceTextUi);
