const withOptimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');

/* eslint-disable no-param-reassign */
module.exports = withOffline(
  withOptimizedImages({
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      // eslint-disable-next-line
      config.node = {
        fs: 'empty',
      };

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        // Fix webpackHotUpdate console error thanks to:
        // https://github.com/zeit/next.js/issues/6842
        if (entries['main.js'] && !entries['main.js'].includes('./polyfill.js')) {
          entries['main.js'].unshift('./polyfill.js'); // <- polyfill here
        }
        return entries;
      };

      return config;
    },
    publicRuntimeConfig: {
      BASE_URL: process.env.BASE_URL,
    },
  })
);
