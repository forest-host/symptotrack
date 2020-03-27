import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { get } from '../api/callers';
import { withTranslation } from '../i18n';
import { useApp } from '../contexts/AppProvider';
import { parseValues } from '../utils';

// Components
import Hero from '../components/Hero';
import Form from '../components/Form';

// Styling
import { Box, Container, Row, Flex } from '../components/styles';

const Edit = ({ t, type, token }) => {
  const [data, setData] = useState({});
  const { translatedQuestionnaire, translatedErrors, basicQuestionnaireRecurring } = useApp();

  const getData = async (type, token) => {
    await get({}, `responses/${type}/${token}`).then((resp) => {
      setData(resp);
    });
  };

  useEffect(() => {
    if (type && token) {
      getData(type, token);
    }
  }, []);

  const onSubmit = (data) => {
    const formData = {};

    Object.keys(data).map((answer) => {
      formData[answer] = parseValues(data[answer]);
    });

    console.log(formData);
  };

  return (
    <Container pb={70}>
      <Hero pt={[20, 40]} title={t('edit:title')} content={t('edit:content')} />
      <Row>
        <Flex justifyContent="center">
          <Box width={[1, 7 / 12]}>
            <Form
              form={basicQuestionnaireRecurring}
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
