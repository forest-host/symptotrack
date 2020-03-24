import React from 'react';

// Components
import Socials from '../components/General/Socials';

// Styling
import { Container, Row, Heading, Text } from '../components/styles';

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

const Contact = () => (
  <Container pt={20} pb={70}>
    <Row mb={40}>
      <Heading.H2 as="h1" color="blue">
        Contact
      </Heading.H2>
      <Text as="p" mb={40}>
        Wil je meer weten over de vragenlijst of SymptoTrack? Neem dan contact met ons op.
      </Text>
    </Row>
    <Row mb={40}>
      <Heading.H4 mb={10}>Mail ons</Heading.H4>
      <Text as="a" href="mailto:info@symptotrack.org" color="blue">
        info@symptotrack.org
      </Text>
    </Row>
    <Row>
      <Heading.H4 mb={15}>Of bekijk onze social mediakanalen</Heading.H4>
      <Socials items={socials} color="black" size={22} />
    </Row>
  </Container>
);

export default Contact;
