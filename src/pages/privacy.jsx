import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';

// Styling
import { Container } from '../components/styles';

const Privacy = ({ t }) => {
  const layouts = t('privacy:layouts', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('privacy:title')} content={t('privacy:content')} />
      {layouts && <Layouts layouts={layouts} />}
    </Container>
  );
};

Privacy.propTypes = {
  t: PropTypes.func.isRequired,
};

Privacy.getInitialProps = async () => ({
  namespacesRequired: ['common', 'privacy', 'socials'],
});

export default withTranslation('privacy')(Privacy);
