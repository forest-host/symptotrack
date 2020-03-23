import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles';
import theme from '../theme';
import Head from './head';
import Header from './Header';
import Footer from './Footer';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Page = ({ children }) => {
  const title = 'SymptoTrack';
  const description = 'Tracking Symptoms Worldwide';

  return (
    <ThemeProvider theme={theme}>
      <div css={{ overflowX: 'hidden' }}>
        <GlobalStyles />
        <Head title={title} description={description} />
        <Header />
        <main>{children}</main>
        <Footer title={title} description={description} />
      </div>
    </ThemeProvider>
  );
};

export default Page;
