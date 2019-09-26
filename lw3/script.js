var myCheck = document.getElementById('theme')
myMain = document.querySelectorAll('body.main');
myFalse = document.querySelectorAll('div.weekend .day.false');
myWeekend = document.querySelectorAll('div.weekend .day');
function theme() {
  if (myCheck.checked) {
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
    for (let i = 0; i < myWeekend.length; i++) {
      myWeekend[i].className = 'day';
    }
    for (let i = 0; i < myFalse.length; i++) {
      myFalse[i].className = 'day false';
    }
  }
}