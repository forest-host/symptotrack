import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../i18n';
import { formatTags } from '../utils';

// Components
import Hero from '../components/Hero';
import FaqSection from '../components/Faq';

// Styling
import { Box, Container, Row, Heading } from '../components/styles';

const Faq = ({ t }) => {
  const sections = t('faq:sections', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('faq:title')} content={t('faq:content')} />
      {sections && (
        <Row>
          <Box width={[1, 8 / 12]}>
            {sections.map((section) => (
              <FaqSection key={uuid()} {...section} />
            ))}
          </Box>
        </Row>
      )}
      <Heading.H4 color="blue">{formatTags(t('faq:moreQuestions'))}</Heading.H4>
    </Container>
  );
};

Faq.propTypes = {
  t: PropTypes.func.isRequired,
};

Faq.getInitialProps = async () => ({
  namespacesRequired: ['common', 'socials', 'faq'],
});

export default withTranslation('faq')(Faq);
