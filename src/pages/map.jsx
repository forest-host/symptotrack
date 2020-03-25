import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import SymptoMap from '../components/Map';

// Styling
import { Container, Row } from '../components/styles';

const Map = ({ t }) => (
  <Container pt={[20, 40]} pb={70}>
    <Hero title={t('map:title')} content={t('map:content')} />
    <Row>
      <SymptoMap />
    </Row>
  </Container>
);

Map.propTypes = {
  t: PropTypes.func.isRequired,
};

Map.getInitialProps = async () => ({
  namespacesRequired: ['common', 'map', 'socials'],
});

export default withTranslation('map')(Map);
