import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';
import Socials from '../components/General/Socials';

// Styling
import { Container, Row, Heading, Text } from '../components/styles';

const Contact = ({ t }) => {
  const layouts = t('contact:layouts', { returnObjects: true });
  const socials = t('socials:items', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('contact:title')} content={t('contact:content')} />
      <Row mb={40}>
        <Heading.H4 mb={10}>{t('mailUs')}</Heading.H4>
        <Text as="a" href="mailto:info@symptotrack.org" color="blue">
          info@symptotrack.org
        </Text>
      </Row>
      <Row>
        <Heading.H4 mb={15}>{t('socials:title')}</Heading.H4>
        <Socials items={socials} color="black" size={22} />
      </Row>
      {layouts && <Layouts layouts={layouts} />}
    </Container>
  );
};

Contact.propTypes = {
  t: PropTypes.func.isRequired,
};

Contact.getInitialProps = async () => ({
  namespacesRequired: ['common', 'contact', 'socials'],
});

export default withTranslation(['common', 'contact', 'socials'])(Contact);
