import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
import Socials from '../General/Socials';
import Icon from '../Icon';

// Styling
import SFooter, { SFooterMenu } from './styles';
import { Box, Container, Flex, Heading, Row, Text, HR } from '../styles';

const items = [
  {
    label: 'Home',
    href: '/',
    as: '/home',
    target: '_self',
  },
  {
    label: 'SymptomenKaart',
    href: '/map',
    as: '/kaart',
    target: '_self',
  },
  {
    label: 'Over SymptoTrack',
    href: '/about',
    as: '/over-symptotrack',
    target: '_self',
  },
  {
    label: 'Contact',
    href: '/contact',
    as: '/contact',
    target: '_self',
  },
  {
    label: 'Veelgestelde vragen',
    href: '/faq',
    as: '/veelgestelde-vragen',
    target: '_self',
  },
];

const subItems = [
  {
    label: 'Gebruiksvoorwaarden',
    href: '/terms',
    as: '/gebruiksvoorwaarden',
    target: '_self',
  },
  {
    label: 'Copyright',
    href: '/copyright',
    as: '/copyright',
    target: '_self',
  },
  {
    label: 'Privacyvoorwaarden',
    href: '/privacy',
    as: '/privacyvoorwaarden',
    target: '_self',
  },
];

const socials = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com',
    target: '_blank',
    icon: {
      name: 'FACEBOOK',
      viewBox: '0 0 496 493',
    },
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com',
    target: '_blank',
    icon: {
      name: 'INSTAGRAM',
      viewBox: '0 0 450 449',
    },
  },
  {
    label: 'Twitter',
    url: 'https://www.twitter.com',
    target: '_blank',
    icon: {
      name: 'TWITTER',
      viewBox: '0 0 512 416',
    },
  },
];

const Footer = ({ title, description }) => (
  <SFooter>
    <Container py={25}>
      <Row>
        <Flex flexDirection={['column', 'column']} mb={30}>
          <Box mb={25}>
            <Heading.H4>{title}</Heading.H4>
            <Text as="span" fontSize={18} fontFamily="heading">
              {description}
            </Text>
          </Box>
          {items && (
            <SFooterMenu>
              {items.map(({ href, as, target, label }) => (
                <li key={uuid()}>
                  <Link href={href} as={as} passHref>
                    <Text as="a" color="lightGreen" target={target}>
                      {label}
                    </Text>
                  </Link>
                </li>
              ))}
            </SFooterMenu>
          )}
        </Flex>
        {socials && (
          <Flex mb={40} alignItems="center">
            <Heading.H4 mr={24}>Volg ons:</Heading.H4>
            <Socials items={socials} />
          </Flex>
        )}
        <HR />
        {subItems && (
          <Box mt={20}>
            <SFooterMenu>
              {subItems.map(({ href, as, target, label }) => (
                <li key={uuid()}>
                  <Link href={href} as={as} passHref>
                    <Text
                      as="a"
                      color="lightGreen"
                      fontSize={14}
                      target={target}
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
        <Box mt={40}>
          <Text as="span">Ontwikkeld in samenwerking met ...</Text>
        </Box>
        <Box mt={25}>
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
      </Row>
    </Container>
  </SFooter>
);

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Footer;
