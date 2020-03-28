const parseValues = (value, reverse) => {
  if (reverse) {
    if (value === true) {
      return 'true';
    }
    if (value === false) {
      return 'false';
    }
    if (Array.isArray(value)) {
      const valueArray = [];
      value.map((val) => {
        if (!isNaN(val)) {
          return valueArray.push(parseFloat(val));
        }
        return valueArray.push(val);
      });

      return valueArray;
    }
    if (parseFloat(value)) {
      return parseFloat(value);
    }
    if (typeof value === 'string' && value.includes('skip')) {
      return undefined;
    }
    if (value === '') {
      return undefined;
    }
  } else {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (Array.isArray(value)) {
      const valueArray = [];
      value.map((val) => {
        if (!isNaN(val)) {
          return valueArray.push(parseFloat(val));
        }
        return valueArray.push(val);
      });

      return valueArray;
    }
    if (parseFloat(value)) {
      return parseFloat(value);
    }
    if (typeof value === 'string' && value.includes('skip')) {
      return undefined;
    }
    if (value === '') {
      return undefined;
    }
  }
  return value;
};

export default parseValues;
