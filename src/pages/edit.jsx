import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// Utils
import { get, post } from '../api/callers';
import { withTranslation } from '../i18n';
import { useApp } from '../contexts/AppProvider';
import { getLocale, parseValues } from '../utils';

// Components
import Hero from '../components/Hero';
import Form from '../components/Form';

// Styling
import { Box, Button, Container, Row, Flex, HR } from '../components/styles';

const Edit = ({ i18n, t, type, token }) => {
  const { trackEvent } = useMatomo();
  const [data, setData] = useState(undefined);
  const [recovered, setRecovered] = useState(false);
  const { language } = i18n || {};
  const { translatedQuestionnaire, translatedErrors, basicQuestionnaireRecurring } = useApp();

  const getData = async (type, token) => {
    await get(`responses/${type}/${token}`).then((resp) => {
      setData(resp);
    });
  };

  useEffect(() => {
    if (type && token) {
      getData(type, token);
    }
  }, []);

  const prefillFormData = {};
  data &&
    Object.keys(data).map((answer) => {
      prefillFormData[answer] = parseValues(data[answer], true);
    });

  const onSubmit = async (data) => {
    const formData = {};

    Object.keys(data).map((answer) => {
      formData[answer] = parseValues(data[answer]);
    });

    formData.respondent_uuid = token;
    formData.locale = getLocale(language);

    await post('responses/basic', formData).then((resp) => {
      const { status } = resp || {};

      if (status === 400 || status === 504) {
        const { error } = resp?.data || {};
        console.log(error);
      } else {
        trackEvent({ category: 'vragenlijst', action: 'edit', name: token });
        Router.push(`/thankyou?token=${token}`, '/bedankt');
      }
    });
  };

  const recover = async () => {
    await post(`recoveries/${token}`).then((resp) => {
      const { status } = resp || {};

      if (status === 400 || status === 504) {
        const { error } = resp?.data || {};
        console.log(error);
      } else {
        setRecovered(true);
      }
    });
  };

  return (
    <Container pb={70}>
      <Hero pt={[20, 40]} title={t('edit:title')} content={t('edit:content')} />
      {data && !recovered && <Button onClick={() => recover()}>{t('edit:recover')}</Button>}
      <Box my={70}>
        <HR color="blue" />
      </Box>
      <Row>
        <Flex justifyContent="center">
          <Box width={[1, 7 / 12]}>
            {data && !recovered && (
              <Form
                form={basicQuestionnaireRecurring}
                translations={translatedQuestionnaire}
                translatedErrors={translatedErrors}
                onSubmit={onSubmit}
                prefill={prefillFormData}
              />
            )}
          </Box>
        </Flex>
      </Row>
    </Container>
  );
};

Edit.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string,
  token: PropTypes.string,
};

Edit.defaultProps = {
  type: null,
  token: null,
};

Edit.getInitialProps = async (ctx) => {
  const { type, token } = ctx.query;

  return { type, token, namespacesRequired: ['common', 'edit', 'socials'] };
};

export default withTranslation(['common', 'edit'])(Edit);
