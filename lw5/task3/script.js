function flatArray(myArray) {
  myArray = [].concat.apply([], myArray);
  for (var i = myArray.length - 1; i >= 0; i--) {
    if (typeof(myArray[i]) != 'number' && i > -1 || isNaN(myArray[i])) {
      myArray.splice(i, 1);
    }
  }
  alert(myArray);
}
flatArray([12, ['ru'],
  [''],
  123, '424', 5325, [NaN],
  [],
  2, ['www'],
  null
]);
