var text = document.querySelector('.text').innerHTML;
var err = 'Ошибка';
var textForUi = document.querySelector('.text');
var btn = document.querySelector('.btn');

function replaceText(text, searchStr, newStr) {
  var searchStrRegExp = new RegExp(searchStr, 'gi');
  var index = text.search(searchStrRegExp);
  if (index >= 0 && searchStr != '') {
    text = text.replace(searchStrRegExp, newStr);
    textForUi.innerHTML = text;
    return true;
  } else {
    return false;
  }
}

function replaceTextUi() {
  var text = document.querySelector('.text').innerHTML;
  var searchStr = document.querySelector('.search').value;
  var newStr = document.querySelector('.new').value;
  if (replaceText(text, searchStr, newStr) === true) {
    replaceText(text, searchStr, newStr);
  } else {
    alert(false);
  }
}
btn.addEventListener('click', replaceTextUi);