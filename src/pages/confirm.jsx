import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// Utils
import { withTranslation } from '../i18n';
import { post } from '../api/callers';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';
// import ButtonArrow from '../components/General/ButtonArrow';

// Styling
import { Box, Container, HR } from '../components/styles';

const Confirm = ({ t, token, locale, email }) => {
  const { trackEvent } = useMatomo();
  const layouts = t('confirm:layouts', { returnObjects: true });

  const confirmEmail = async (token, locale, email) => {
    await post(`confirm/${token}`, { locale, email }).then(() => {
      trackEvent({ category: 'email', action: 'confirm' });
    });
  };

  useEffect(() => {
    if (token && locale && email) {
      confirmEmail(token, locale, email);
    }
  }, []);

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('confirm:title')} content={t('confirm:content')} />
      {/* <ButtonArrow text="Vul meer vragen in" /> */}
      <Box my={70}>
        <HR color="blue" />
      </Box>
      {layouts && <Layouts layouts={layouts} token={token} />}
    </Container>
  );
};

Confirm.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
  locale: PropTypes.string,
  email: PropTypes.string,
};

Confirm.defaultProps = {
  token: null,
  locale: null,
  email: null,
};

Confirm.getInitialProps = async (ctx) => {
  const { token, locale, email } = ctx.query;

  return { token, locale, email, namespacesRequired: ['common', 'confirm', 'socials'] };
};

export default withTranslation('confirm')(Confirm);
