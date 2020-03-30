import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import SymptoMap from '../components/Map';

// Styling
import { Container } from '../components/styles';

const Map = ({ t, test }) => (
  <>
    <Container pt={[20, 40]} pb={70} relative>
      <Hero title={t('map:title')} content={t('map:content')} />
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
