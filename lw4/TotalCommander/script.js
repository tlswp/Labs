var selectedItem = 0,
directory = document.querySelectorAll('.main .directory'),
itemRigth = document.querySelectorAll('.rigth .item'),
selectedDirectory = 0,
selectedItemRigth = 0,
item = document.querySelectorAll('.left .item');
function goToItem(elementItem) {
  item[selectedItem].className = 'item';
  selectedItem = (elementItem+item.length)%item.length;
  item[selectedItem].className = 'item selected';
}
function goToItemRigth(elementItemRigth) {
  itemRigth[selectedItemRigth].className = 'item';
  selectedItemRigth = (elementItemRigth+itemRigth.length)%itemRigth.length;
  itemRigth[selectedItemRigth].className = 'item selected';
}
function goToDirectory(elementDirectory) {
  directory[selectedDirectory].className = 'directory';
  selectedDirectory = (elementDirectory+directory.length)%directory.length;
  directory[selectedDirectory].className = 'directory selected';
}
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowRight') {
    goToDirectory(selectedDirectory+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    goToDirectory(selectedDirectory-1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowDown' && selectedDirectory==0) {
    goToItem(selectedItem+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp' && selectedDirectory==0) {
    goToItem(selectedItem-1);
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowDown' && selectedDirectory==1) {
    goToItemRigth(selectedItemRigth+1);
  }
});
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp' && selectedDirectory==1) {
    goToItemRigth(selectedItemRigth-1);
  }
});