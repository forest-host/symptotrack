import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';

// Styling
import { Container } from '../components/styles';

const About = ({ t }) => {
  const layouts = t('about:layouts', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('about:title')} content={t('about:content')} />
      {layouts && <Layouts layouts={layouts} />}
    </Container>
  );
};

About.propTypes = {
  t: PropTypes.func.isRequired,
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'about', 'socials'],
});

export default withTranslation('about')(About);
