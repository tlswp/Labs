function flatArray(myArray) {
  myArray = [].concat.apply([], myArray);
  myArrayLength = myArray.length;
  for (var i = myArrayLength - 1; i >= 0; i--) {
    if (typeof(myArray[i]) != 'number' && i > -1 || isNaN(myArray[i])) {
      myArray.splice(i, 1);
    }
  }
  alert(myArray);
}
flatArray([12, ["12"],
  ["25"],
  123, 424, 5325, [NaN],
  ["18"],
  2, ["wdw"],
  null
]);