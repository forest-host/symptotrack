import React from 'react';
import App from 'next/app';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

// Utils
import withData from '../containers/withData';
import AppProvider from '../contexts/AppProvider';
import { appWithTranslation } from '../i18n';

// Components
import Page from '../components/Page';

// Styling
import { GlobalStyles } from '../components/styles';

if (process.env.NODE_ENV !== 'production' && process.browser === true) {
  /* eslint-disable global-require */
  const ReactDOM = require('react-dom');
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
  /* eslint-enable global-require */
}

Object.size = (obj) => {
  let size = 0;
  let key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const isClient = process.browser;
let instance;

if (isClient) {
  instance = createInstance({
    urlBase: 'https://symptotrack.matomo.cloud/',
  });
}

class MyApp extends App {
  render() {
    const { Component, pageProps, appData, router } = this.props;
    const { asPath, route } = router;

    return (
      <MatomoProvider value={instance}>
        <AppProvider {...appData}>
          <Page asPath={asPath} route={route}>
            <GlobalStyles />
            <Component {...pageProps} />
          </Page>
        </AppProvider>
      </MatomoProvider>
    );
  }
}

export default appWithTranslation(withData(MyApp));
