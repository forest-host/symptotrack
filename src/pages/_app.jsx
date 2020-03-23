import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
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
    const { Component, pageProps } = this.props;

    return (
      <Page>
        <GlobalStyles />
        <Component {...pageProps} />
      </Page>
    );
  }
}

export default MyApp;
