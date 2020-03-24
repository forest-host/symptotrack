const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'nl',
  otherLanguages: ['en'],
  browserLanguageDetection: false,
  serverLanguageDetection: true,
  lng: 'nl',
  detection: {
    order: ['path'],
    lookupFromPathIndex: 0,
  },
});
