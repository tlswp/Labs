var myCheck = document.getElementById('theme'),
myMain = document.getElementById('calendar-id');
var checkImg = document.querySelectorAll('img.check');
function theme() {
  if (myCheck.checked) {
    myMain.classList.toggle('night');
    checkImg[0].className = 'check none';
    checkImg[1].className = 'check';
  }
  else {
    myMain.classList.toggle('night');
    checkImg[0].className = 'check';
    checkImg[1].className = 'check none';
  }
}