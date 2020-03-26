const getLocale = (lang = 'nl') => {
  switch (lang) {
    case 'nl':
      return 'nl_nl';
    case 'en':
      return 'en_us';
    default:
      return 'nl_nl';
      break;
  }
};

export default getLocale;
