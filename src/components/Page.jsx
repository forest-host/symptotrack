import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// Components
import Head from './head';
import Header from './Header';
import Footer from './Footer';
import Shapes from './General/Shapes';

// Styling
import { GlobalStyles, Flex } from './styles';
import theme from '../theme';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Page = ({ children, asPath, route }) => {
  const { trackPageView } = useMatomo();
  const [isOpen, setOpen] = useState(false);
  const isMap = route === '/map';
  const title = 'SymptoTrack';
  const description = 'Tracking Symptoms Worldwide';

  const handleRouteChange = () => {
    trackPageView();
  };

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection="column" css={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <GlobalStyles isOpen={isOpen} />
        <Head title={title} description={description} />
        <Header asPath={asPath} isOpen={isOpen} setOpen={setOpen} />
        <Shapes />
        <main>{children}</main>
        {!isMap && <Footer />}
      </Flex>
    </ThemeProvider>
  );
};

export default Page;
