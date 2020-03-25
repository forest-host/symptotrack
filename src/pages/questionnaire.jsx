import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n, withTranslation } from '../i18n';
import { getLocale } from '../utils';

// Components
import Hero from '../components/Hero';

// Styling
import { Container, Row, Heading, Text } from '../components/styles';

const Questionnaire = ({ t, basicQuestionnaire, translatedQuestionnaire }) => {
  console.log(basicQuestionnaire);
  console.log(translatedQuestionnaire);

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('questionnaire:title')} content={t('questionnaire:content')} />
    </Container>
  );
};

Questionnaire.propTypes = {
  t: PropTypes.func.isRequired,
};

Questionnaire.getInitialProps = async () => {
  const lang = i18n.language;
  const symptotrack = require('@symptotrack/questions');
  const basicQuestionnaire = symptotrack.get_questionaire('basic');
  const translatedQuestionnaire = symptotrack.get_questionaire_translations(
    'basic',
    getLocale(lang)
  );

  return {
    basicQuestionnaire,
    translatedQuestionnaire,
    namespacesRequired: ['common', 'questionnaire', 'socials'],
  };
};

export default withTranslation('questionnaire')(Questionnaire);
