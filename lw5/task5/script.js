function isNull(data) {
  return data === null;
}

function check(data, expectedType) {
  if (expectedType === 'array') {
    booleanStatus = expectedType === 'array' === Array.isArray(data);
    return booleanStatus;
  } else {;
    if (expectedType === 'null') {
      booleanStatus = expectedType === 'null' === isNull(data);
      return booleanStatus;
    } else {
      if (expectedType === typeof(data) && expectedType !== 'null' && expectedType !== 'array') {
        return true;
      } else { return false; }
    }
  }
}
check([null], 'array')