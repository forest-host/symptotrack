import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import Layouts from '../components/Layouts';
// import ButtonArrow from '../components/General/ButtonArrow';

// Styling
import { Box, Container, HR } from '../components/styles';

const Thankyou = ({ t, token }) => {
  const layouts = t('thankyou:layouts', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('thankyou:title')} content={t('thankyou:content')} />
      {/* <ButtonArrow text="Vul meer vragen in" /> */}
      <Box my={70}>
        <HR color="blue" />
      </Box>
      {layouts && <Layouts layouts={layouts} token={token} />}
    </Container>
  );
};

Thankyou.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Thankyou.defaultProps = {
  token: null,
};

Thankyou.getInitialProps = async (ctx) => {
  const { token } = ctx.query;

  return { token, namespacesRequired: ['common', 'thankyou', 'socials'] };
};

export default withTranslation('thankyou')(Thankyou);
