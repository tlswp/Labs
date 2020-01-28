var myCheck = document.getElementById('theme'),
  myMain = document.getElementById('main'),
  day = document.getElementsByClassName('day'),
  checkImg = document.querySelectorAll('img.check');
var i = 0;

function load() {
  setTimeout(function() {
    day[i].classList.add('height');
    i++;
    if (i < day.length) {
      load();
    }
  }, 10)
}
load();

function theme() {
  if (myCheck.checked) {
    myMain.classList.toggle('night');
    checkImg[0].className = 'check none';
    checkImg[1].className = 'check';
  } else {
    myMain.classList.toggle('night');
    checkImg[0].className = 'check';
    checkImg[1].className = 'check none';
  }
}
window.onload = function() {
  var arr = [];
  while (arr.length < 4) {
    var r = Math.floor(Math.random() * 3) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
}