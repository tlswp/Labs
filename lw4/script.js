var currentData = 0,
dataBlock = document.querySelectorAll('.main .data-block'),
dataR = document.querySelectorAll('.rigth .data'),
currentDataBlock = 0,
currentDataR = 0,
data = document.querySelectorAll('.left .data');
function goToData(e) {
  data[currentData].className = 'data';
  currentData = (e+data.length)%data.length;
  data[currentData].className = 'data current';
}
function goToDataR(a) {
  dataR[currentDataR].className = 'data';
  currentDataR = (a+dataR.length)%dataR.length;
  dataR[currentDataR].className = 'data current';
}
function goToDataBlock(b) {
  dataBlock[currentDataBlock].className = 'data-block';
  currentDataBlock = (b+dataBlock.length)%dataBlock.length;
  dataBlock[currentDataBlock].className = 'data-block current';
}
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowRight') {
    goToDataBlock(currentDataBlock+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    goToDataBlock(currentDataBlock-1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowDown' && currentDataBlock==0) {
    goToData(currentData+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp' && currentDataBlock==0) {
    goToData(currentData-1);
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowDown' && currentDataBlock==1) {
    goToDataR(currentDataR+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp' && currentDataBlock==1) {
    goToDataR(currentDataR-1);
  }
});