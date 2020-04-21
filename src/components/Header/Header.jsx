import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../../i18n';

// Components
import Hamburger from '../General/Hamburger';
import MobileMenu from '../MobileMenu';

// Styling
import SHeader, { SMenu, SMenuItem } from './styles';
import { Button, Box, Container, Flex, Row, Text } from '../styles';

const Header = ({ t, i18n, asPath, isOpen, setOpen }) => {
  const { language, changeLanguage } = i18n || {};
  const mainMenu = t('navigation:items', { returnObjects: true }) || {};
  const cta = t('navigation:cta', { returnObjects: true }) || {};

  return (
    <SHeader>
      <Container>
        <Row>
          <Flex py={15} justifyContent={['center', 'center', 'space-between']} alignItems="center">
            <Hamburger onClick={() => setOpen(true)} />
            <Button
              noStyle
              onClick={(e) => {
                e.preventDefault();

                const translation = mainMenu?.find((s) => s.link[language].as === asPath);
                const { link } = translation || {};
                const switchLang = language === 'nl' ? 'en' : 'nl';

                changeLanguage(switchLang, () => {
                  translation && Router.push(link[switchLang].href, link[switchLang].as);
                });
              }}
              className="show-for-small"
              css={{ position: 'absolute', left: 45 }}
            >
              <Text
                as="span"
                fontFamily="heading"
                fontWeight={700}
                fontSize={14}
                color="blue"
                css={{ position: 'relative', top: -2 }}
              >
                {language === 'nl' ? 'EN' : 'NL'}
              </Text>
            </Button>
            <Link href="/" as={language === 'en' ? '/' : `/${language}`} passHref>
              <a href>
                <picture>
                  <source media="(min-width: 1025px)" srcSet="/static/logo-big.svg" />
                  <source media="(max-width: 1024px)" srcSet="/static/logo.svg" />
                  <img src="/static/logo-big.svg" alt="SymptoTrack" />
                </picture>
              </a>
            </Link>
            {mainMenu && Array.isArray(mainMenu) && (
              <SMenu>
                {mainMenu
                  .filter((s) => !s.mobileOnly)
                  .map(({ label, link }) => (
                    <SMenuItem key={uuid()} isActive={asPath === link[language].as}>
                      <Link href={link[language].href} as={link[language].as} passHref>
                        <Text
                          as="a"
                          fontFamily="heading"
                          fontWeight={700}
                          fontSize={14}
                          color="blue"
                          target={link.target}
                        >
                          {label}
                        </Text>
                      </Link>
                    </SMenuItem>
                  ))}
                <SMenuItem>
                  <Button
                    noStyle
                    onClick={(e) => {
                      e.preventDefault();

                      const translation = mainMenu?.find((s) => s.link[language].as === asPath);
                      const { link } = translation || {};
                      const switchLang = language === 'nl' ? 'en' : 'nl';

                      changeLanguage(switchLang, () => {
                        translation && Router.push(link[switchLang].href, link[switchLang].as);
                      });
                    }}
                  >
                    <Text
                      as="span"
                      fontFamily="heading"
                      fontWeight={700}
                      fontSize={14}
                      color="blue"
                      css={{ position: 'relative', top: -2 }}
                    >
                      {language === 'nl' ? 'EN' : 'NL'}
                    </Text>
                  </Button>
                </SMenuItem>
              </SMenu>
            )}
            {cta?.link && typeof cta === 'object' && (
              <Box ml={15} className="hide-for-medium">
                <Link href={cta?.link?.[language]?.href} as={cta?.link?.[language]?.as} passHref>
                  <Button as="a" target={cta?.link?.target} variant="secondary" smaller>
                    <Text as="span" fontSize={14}>
                      {cta.label}
                    </Text>
                  </Button>
                </Link>
              </Box>
            )}
          </Flex>
        </Row>
      </Container>
      <MobileMenu isOpen={isOpen} setOpen={setOpen} menu={mainMenu} cta={cta} />
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
