function isArrayEqual(array1, array2) {
  var s = true;
  var n = true;
  if (array1.length == array2.length) {
    for (var i = 0; i < array1.length; i++) {
      n = array1[i] === array2[i];
    }
    alert(n && true);
  } else {
    alert(false);
  }
}
isArrayEqual([1, 2, 3], [1, 2, 3]);