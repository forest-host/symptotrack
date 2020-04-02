import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';

// Styling
import { Container } from '../components/styles';

const Copyright = ({ t }) => {
  const layouts = t('copyright:layouts', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('copyright:title')} content={t('copyright:content')} />
      {layouts && <Layouts layouts={layouts} />}
    </Container>
  );
};

Copyright.propTypes = {
  t: PropTypes.func.isRequired,
};

Copyright.getInitialProps = async () => ({
  namespacesRequired: ['common', 'copyright', 'socials'],
});

export default withTranslation('copyright')(Copyright);
