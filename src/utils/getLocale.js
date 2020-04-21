const getLocale = (lang = 'en') => {
  switch (lang) {
    case 'nl':
      return 'nl_nl';
    case 'en':
      return 'en_us';
    default:
      return 'en_us';
  }
};

export default getLocale;
