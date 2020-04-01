import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';
import ButtonArrow from '../components/General/ButtonArrow';

// Styling
import { Container } from '../components/styles';

const Error = ({ t }) => {
  const button = t('error:button', { returnObjects: true });

  return (
    <Container pt={[20, 40]} pb={70}>
      <Hero title={t('error:title')} content={t('error:content')} large />
      {button && (
        <Link href={button.href} as={button.as} passHref>
          <a href target={button.target}>
            <ButtonArrow text={button.label} />
          </a>
        </Link>
      )}
    </Container>
  );
};

Error.propTypes = {
  t: PropTypes.func.isRequired,
};

Error.getInitialProps = async () => ({
  namespacesRequired: ['common', 'error', 'socials'],
});

export default withTranslation('error')(Error);
