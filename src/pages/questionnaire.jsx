import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { StickyContainer } from 'react-sticky';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// Utils
import { post } from '../api/callers';
import { withTranslation } from '../i18n';
import { useApp } from '../contexts/AppProvider';
import { parseValues, getLocale } from '../utils';

// Components
import Hero from '../components/Hero';
import Form from '../components/Form';
import Progress from '../components/General/Progress';

// Styling
import { Box, Container, Row, Flex } from '../components/styles';

const Questionnaire = ({ i18n, t }) => {
  const { trackEvent } = useMatomo();
  const { basicQuestionnaire, translatedQuestionnaire, translatedErrors } = useApp();
  const { language } = i18n || {};
  const [count, setCount] = useState({ currentPage: 1, total: 1 });
  const [percentage, setPercentage] = useState(0);

  const onSubmit = async (data) => {
    const formData = {};

    Object.keys(data).map((answer) => {
      formData[answer] = parseValues(data[answer]);
    });

    formData.locale = getLocale(language);

    await post('responses/basic', formData).then((resp) => {
      const { status, respondent_uuid } = resp || {};

      if (resp) {
        if (status === 400 || status === 504) {
          const { error } = resp?.data || {};
          console.error(error);
        } else {
          trackEvent({ category: 'vragenlijst', action: 'submit' });
          Router.push(`/thankyou?token=${respondent_uuid}`, '/bedankt');
        }
      }
    });
  };

  return (
    <StickyContainer>
      <Container pb={70}>
        <Progress percentage={percentage} string={t('rounded')} />
        <Hero
          pt={[20, 40]}
          title={`${t('questionnaire:title')} ${count?.currentPage}/${count?.total}`}
          content={t('questionnaire:content')}
        />
        <Row>
          <Flex justifyContent="center">
            <Box width={[1, 7 / 12]}>
              <Form
                form={basicQuestionnaire}
                translations={translatedQuestionnaire}
                translatedErrors={translatedErrors}
                onSubmit={onSubmit}
                setPercentage={setPercentage}
                setCount={setCount}
              />
            </Box>
          </Flex>
        </Row>
      </Container>
    </StickyContainer>
  );
};

Questionnaire.propTypes = {
  t: PropTypes.func.isRequired,
};

Questionnaire.getInitialProps = async () => ({
  namespacesRequired: ['common', 'questionnaire', 'socials'],
});

export default withTranslation(['common', 'questionnaire'])(Questionnaire);
