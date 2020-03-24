import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../../i18n';

// Components
import Hamburger from '../General/Hamburger';
import MobileMenu from '../MobileMenu';

// Styling
import SHeader, { SMenu, SMenuItem } from './styles';
import { Container, Flex, Row, Text } from '../styles';

const Header = ({ t, i18n, asPath, isOpen, setOpen }) => {
  const { language } = i18n || {};
  const mainMenu = t('navigation:items', { returnObjects: true }) || {};

  return (
    <SHeader>
      <Container>
        <Row>
          <Flex py={15} justifyContent={['center', 'space-between']} alignItems="center">
            <Hamburger onClick={() => setOpen(true)} />
            <Link href="/" as={language === 'nl' ? '/' : `/${language}`} passHref>
              <a href>
                <picture>
                  <source media="(min-width: 641px)" srcSet="/static/logo-big.svg" />
                  <source media="(max-width: 640px)" srcSet="/static/logo.svg" />
                  <img src="/static/logo-big.svg" alt="SymptoTrack" />
                </picture>
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
      <MobileMenu isOpen={isOpen} setOpen={setOpen} menu={mainMenu} />
    </SHeader>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
  asPath: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isOpen: false,
};

export default withTranslation('navigation')(Header);
