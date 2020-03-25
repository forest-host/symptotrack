import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../i18n';
import { formatTags } from '../utils';

// Components
import FaqSection from '../components/Faq';

// Styling
import { Box, Container, Row, Heading, Text } from '../components/styles';

const Faq = ({ t }) => {
  const sections = t('faq:sections', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Row mb={40}>
        <Box width={[1, 5 / 12]}>
          <Heading.H2 as="h1" color="blue">
            {t('faq:title')}
          </Heading.H2>
          <Text as="p" mb={40}>
            {t('faq:content')}
          </Text>
        </Box>
      </Row>
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
