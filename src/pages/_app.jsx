import React from 'react';
import App from 'next/app';

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

class MyApp extends App {
  render() {
    const { Component, pageProps, appData, router } = this.props;
    const { asPath } = router;

    return (
      <AppProvider {...appData}>
        <Page asPath={asPath}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Page>
      </AppProvider>
    );
  }
}

export default appWithTranslation(withData(MyApp));
