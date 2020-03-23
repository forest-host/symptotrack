const formatNumber = (number, lang) => {
  switch (lang) {
    case 'nl':
      return new Intl.NumberFormat('nl-NL').format(number);
    case 'en':
      return new Intl.NumberFormat('en-US').format(number);
    default:
      break;
  }
};

export default formatNumber;
