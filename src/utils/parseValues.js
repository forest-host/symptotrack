const parseValues = (value) => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (parseFloat(value)) {
    return parseFloat(value);
  }
  if (value.includes('skip')) {
    return undefined;
  }
  if (value === '') {
    return undefined;
  }
  return value;
};

export default parseValues;
