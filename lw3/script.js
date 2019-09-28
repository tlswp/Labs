var myCheck = document.getElementById('theme'),
myMain = document.querySelectorAll('body.main'),
myFalse = document.querySelectorAll('div.weekend .day.false'),
myWeekend = document.querySelectorAll('div.weekend .day');
var checkImg = document.querySelectorAll('img.check');
function theme() {
  if (myCheck.checked) {
    checkImg[0].className = 'check none';
    checkImg[1].className = 'check';
    myMain[0].className = 'main night';
    for (let i = 0; i < myWeekend.length; i++) {
      myWeekend[i].className = 'day nigth';
    }
    for (let i = 0; i < myFalse.length; i++) {
      myFalse[i].className = 'day false nigth';
    }
  }
  else {
    myMain[0].className = 'main';
    checkImg[0].className = 'check';
    checkImg[1].className = 'check none';
    for (let i = 0; i < myWeekend.length; i++) {
      myWeekend[i].className = 'day';
    }
    for (let i = 0; i < myFalse.length; i++) {
      myFalse[i].className = 'day false';
    }
  }
}