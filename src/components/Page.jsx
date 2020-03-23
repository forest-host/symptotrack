import React, { useEffect } from 'react';
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
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Head title="SymptoTrack" />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Page;
