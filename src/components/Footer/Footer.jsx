import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
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
    label: 'Kaart',
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
              {items.map(({ href, slug, target, label }) => (
                <li key={uuid()}>
                  <Link href={href} as={slug} passHref>
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
            <Heading.H4 mr={12}>Volg ons:</Heading.H4>
            {socials.map(({ url, target, label, icon }) => (
              <Box key={uuid()} mx={12}>
                <a href={url} target={target} aria-label={label}>
                  <Icon icon={icon?.name} color="lightGreen" viewBox={icon?.viewBox} size={16} />
                </a>
              </Box>
            ))}
          </Flex>
        )}
        <HR />
      </Row>
    </Container>
  </SFooter>
);

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Footer;
