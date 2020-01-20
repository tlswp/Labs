'use strict';

function check(data = [], expectedType = []) {
  if (expectedType === 'array') {
    return Array.isArray(data);
  }
  if (data === null) {
    if (expectedType === 'null') {
      return data === null;
    }
    return false;
  }
  if (expectedType === typeof(data) && !Array.isArray(data)) {
    return true;
  } else { return false; }
}

module.exports = check;

check([null], 'array');