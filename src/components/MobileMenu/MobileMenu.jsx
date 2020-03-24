import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import uuid from 'uuid';
import Div100vh from 'react-div-100vh';

// Utils
import { withTranslation } from '../../i18n';

// Components
import Icon from '../Icon';

// Styling
import SMobileMenu, { SMenu, SMenuItem } from './styles';
import { Box, Button, Flex, Text } from '../styles';

const MobileMenu = ({ t, i18n, asPath, menu }) => {
  const { language } = i18n || {};

  return (
    <SMobileMenu>
      <Div100vh>
        <Flex
          pb={20}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          css={{ height: '100%' }}
        >
          <Flex py={25} width={1} justifyContent="center" bg="lightGreen">
            <Link href="/" as={language === 'nl' ? '/' : `/${language}`} passHref>
              <a href>
                <img src="/static/logo-big.svg" alt="SymptoTrack" />
              </a>
            </Link>
          </Flex>
          {menu && Array.isArray(menu) && (
            <SMenu>
              <SMenuItem isActive={asPath === '/' || asPath === `/${language}`}>
                <Link href="/" as={language === 'nl' ? '/' : `/${language}`} passHref>
                  <Text
                    as="a"
                    py={30}
                    fontFamily="heading"
                    fontWeight={900}
                    fontSize={24}
                    color="black"
                    target="_self"
                  >
                    Home
                  </Text>
                </Link>
              </SMenuItem>
              {menu.map(({ label, link }) => (
                <SMenuItem key={uuid()} isActive={asPath === link[language].as}>
                  <Link href={link[language].href} as={link[language].as} passHref>
                    <Text
                      as="a"
                      py={30}
                      fontFamily="heading"
                      fontWeight={900}
                      fontSize={24}
                      color="black"
                      target={link.target}
                    >
                      {label}
                    </Text>
                  </Link>
                </SMenuItem>
              ))}
            </SMenu>
          )}
          <Box mt="auto">
            <Button noStyle>
              <Flex flexDirection="column" alignItems="center">
                <Icon icon="CLOSE" viewBox="0 0 352 512" color="black" size={17} />
                <Text as="span" color="black" fontFamily="heading" fontWeight="700">
                  {t('close')}
                </Text>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </Div100vh>
    </SMobileMenu>
  );
};

MobileMenu.propTypes = {
  t: PropTypes.func.isRequired,
  asPath: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('common')(MobileMenu);
