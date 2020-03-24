import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, Flex } from './styles';
import theme from '../theme';
import Head from './head';
import Header from './Header';
import Footer from './Footer';
import Shapes from './General/Shapes';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Page = ({ children, asPath }) => {
  const title = 'SymptoTrack';
  const description = 'Tracking Symptoms Worldwide';

  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection="column" css={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <GlobalStyles />
        <Head title={title} description={description} />
        <Header asPath={asPath} />
        <Shapes />
        <main>{children}</main>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
};

export default Page;
