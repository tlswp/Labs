function check(data, expectedType) {
  if (expectedType === 'array') {
    return Array.isArray(data);
  }
  if (expectedType === 'null') {
    return data === null;
  }
  if (expectedType === typeof(data) && !(data === null) && !Array.isArray(data)) {
    return true;
  } else { return false; }
}

check([null], 'array')