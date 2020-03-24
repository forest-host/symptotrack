import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../../i18n';

// Styling
import SHeader, { SMenu, SMenuItem } from './styles';
import { Container, Flex, Row, Text } from '../styles';

const Header = ({ t, i18n, asPath }) => {
  const { language } = i18n || {};
  const mainMenu = t('navigation:items', { returnObjects: true }) || {};

  return (
    <SHeader>
      <Container>
        <Row>
          <Flex py={15} justifyContent="space-between" alignItems="center">
            <Link href="/" as={language === 'nl' ? '/' : `/${language}`} passHref>
              <a href>
                <img src="/static/logo-big.svg" alt="SymptoTrack" />
              </a>
            </Link>
            {mainMenu && Array.isArray(mainMenu) && (
              <SMenu>
                {mainMenu.map(({ label, link }) => (
                  <SMenuItem key={uuid()} isActive={asPath === link[language].as}>
                    <Link href={link[language].href} as={link[language].as} passHref>
                      <Text
                        as="a"
                        fontFamily="heading"
                        fontWeight={700}
                        color="blue"
                        target={link.target}
                      >
                        {label}
                      </Text>
                    </Link>
                  </SMenuItem>
                ))}
              </SMenu>
            )}
          </Flex>
        </Row>
      </Container>
    </SHeader>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('navigation')(Header);
