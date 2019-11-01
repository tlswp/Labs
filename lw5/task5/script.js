function isNull(data) {
  return data === null;
}

function check(data, expectedType) {
  if (expectedType === 'array') {
    a = expectedType === 'array' === Array.isArray(data);
    return a;
  } else {;
    if (expectedType === 'null') {
      a = expectedType === 'null' === isNull(data);
      return a;
    } else {
      if (expectedType === typeof(data) && expectedType !== 'null' && expectedType !== 'array') {
        return true;
      } else { return false; }
    }
  }
}
check([null], 'array')