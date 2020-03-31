import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';

// Styling
import { Container } from '../components/styles';

const SymptoMap = dynamic(() => import('../components/Map'), { ssr: false });

const Map = ({ t, test }) => (
  <>
    <Container pt={[20, 40]} pb={70} relative>
      {!test && <Hero title={t('map:title')} content={t('map:content')} />}
      {!test && <img src="/static/avatar.jpg" alt="SymptomenKaart" />}
    </Container>
    {test && <SymptoMap />}
  </>
);

Map.propTypes = {
  t: PropTypes.func.isRequired,
};

Map.getInitialProps = async (ctx) => {
  const { test } = ctx.query;

  return { test, namespacesRequired: ['common', 'map', 'socials'] };
};

export default withTranslation('map')(Map);
