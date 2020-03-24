import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Utils
import { withTranslation } from '../../i18n';

// Components
import Socials from '../General/Socials';

// Styling
import SFooter, { SFooterMenu } from './styles';
import { Box, Container, Flex, Heading, Row, Text, HR } from '../styles';

const Footer = ({ t, i18n }) => {
  const { language } = i18n || {};

  const footerTitle = t('footer:title');
  const footerSubTitle = t('footer:subTitle');
  const socials = t('socials:items', { returnObjects: true }) || {};
  const menus = t('footer:menus', { returnObjects: true }) || {};
  const { mainMenu, subMenu } = menus;

  return (
    <SFooter>
      <Container py={25}>
        <Row>
          <Flex flexDirection="column">
            <Flex mb={25} flexDirection={['column', 'row']} alignItems={['initial', 'center']}>
              <Heading.H4>{footerTitle}</Heading.H4>
              <Text as="span" ml={[0, '5px']} fontSize={18} fontFamily="heading">
                {footerSubTitle}
              </Text>
            </Flex>
            <Flex flexDirection={['column', 'row']} justifyContent="space-between" mb={30}>
              {mainMenu && (
                <SFooterMenu>
                  {mainMenu.map(({ label, link }) => (
                    <li key={uuid()}>
                      <Link href={link[language].href} as={link[language].as} passHref>
                        <Text as="a" color="lightGreen" target={link.target}>
                          {label}
                        </Text>
                      </Link>
                    </li>
                  ))}
                </SFooterMenu>
              )}
              <Box width={[1, 4 / 12]} mt="6px" className="hide-for-small">
                <Text as="span">Ontwikkeld in samenwerking met ...</Text>
              </Box>
            </Flex>
            {socials && (
              <Flex justifyContent="space-between" flexWrap="wrap">
                <Flex mb={40} alignItems="center">
                  <Heading.H4 mr={15}>{t('followUs')}:</Heading.H4>
                  <Socials items={socials} />
                </Flex>
                <Box width={[1, 4 / 12]} className="hide-for-small">
                  <Text as="span">
                    Door{' '}
                    <Text
                      as="a"
                      fontWeight="700"
                      color="lightGreen"
                      href="https://www.gohike.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hike
                    </Text>{' '}
                    &{' '}
                    <Text
                      as="a"
                      fontWeight="700"
                      color="lightGreen"
                      href="https://www.greenberry.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Greenberry
                    </Text>
                  </Text>
                </Box>
              </Flex>
            )}
            <HR />
            {subMenu && (
              <Box mt={20}>
                <SFooterMenu>
                  {subMenu.map(({ label, link }) => (
                    <li key={uuid()}>
                      <Link href={link[language].href} as={link[language].as} passHref>
                        <Text
                          as="a"
                          color="lightGreen"
                          fontSize={14}
                          target={link.target}
                          className="no-underline"
                        >
                          {label}
                        </Text>
                      </Link>
                    </li>
                  ))}
                </SFooterMenu>
              </Box>
            )}
            <Box key={uuid()} mt={35} width={1} className="show-for-small">
              <Text as="span">Ontwikkeld in samenwerking met ...</Text>
            </Box>
            <Box key={uuid()} mt={25} width={1} className="show-for-small">
              <Text as="span">
                Door{' '}
                <Text
                  as="a"
                  fontWeight="700"
                  color="lightGreen"
                  href="https://www.gohike.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hike
                </Text>{' '}
                &{' '}
                <Text
                  as="a"
                  fontWeight="700"
                  color="lightGreen"
                  href="https://www.greenberry.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Greenberry
                </Text>
              </Text>
            </Box>
          </Flex>
        </Row>
      </Container>
    </SFooter>
  );
};

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['common', 'footer', 'socials'])(Footer);
