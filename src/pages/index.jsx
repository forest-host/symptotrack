import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Utils
import { withTranslation } from '../i18n';
// import { get } from '../api/callers';
import { formatTags } from '../utils';

// Components
import Layouts from '../components/Layouts';
import ButtonArrow from '../components/General/ButtonArrow';
// import Counter from '../components/General/Counter';

// Styling
import { Box, Container, Flex, Row, Heading, Text, HR } from '../components/styles';

const Home = ({ t }) => {
  const button = t('home:button', { returnObjects: true });
  // const counter = t('home:counter', { returnObjects: true });
  const layouts = t('home:layouts', { returnObjects: true });

  return (
    <Container py={40}>
      <Row pt={[0, 40]} pb={70}>
        <Flex flexDirection={['column', 'row']} justifyContent="space-between" alignItems="center">
          <Box mb={[70, 0]} width={[1, 5 / 12]}>
            <Heading.H1 color="blue">{t('home:title')}</Heading.H1>
            <Text as="p" mb={40}>
              {formatTags(t('home:content'))}
            </Text>
            {button && (
              <Link href={button.href} as={button.as} passHref>
                <a href target={button.target}>
                  <ButtonArrow text="Meld symptomen" />
                </a>
              </Link>
            )}
          </Box>
          <HR color="blue" smallOnly />
        </Flex>
      </Row>
      {layouts && <Layouts layouts={layouts} />}
    </Container>
  );
};

Home.propTypes = {
  t: PropTypes.func.isRequired,
  // count: PropTypes.number,
};

Home.defaultProps = {
  // count: null,
};

Home.getInitialProps = async () => {
  // const count = await get('data/count').then((resp) => resp.count);

  return { namespacesRequired: ['common', 'socials', 'home'] };
};

export default withTranslation('home')(Home);
