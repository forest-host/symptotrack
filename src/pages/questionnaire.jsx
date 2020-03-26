import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';
import { useApp } from '../contexts/AppProvider';

// Components
import Hero from '../components/Hero';
import Form from '../components/Form';

// Styling
import { Box, Container, Row, Flex } from '../components/styles';

const Questionnaire = ({ t }) => {
  const { basicQuestionnaire, translatedQuestionnaire, translatedErrors } = useApp();
  const onSubmit = (data) => console.log(data);

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('questionnaire:title')} content={t('questionnaire:content')} />
      <Row>
        <Flex justifyContent="center">
          <Box width={[1, 7 / 12]}>
            <Form
              form={basicQuestionnaire}
              translations={translatedQuestionnaire}
              translatedErrors={translatedErrors}
              onSubmit={onSubmit}
            />
          </Box>
        </Flex>
      </Row>
    </Container>
  );
};

Questionnaire.propTypes = {
  t: PropTypes.func.isRequired,
};

Questionnaire.getInitialProps = async () => ({
  namespacesRequired: ['common', 'questionnaire', 'socials'],
});

export default withTranslation('questionnaire')(Questionnaire);
