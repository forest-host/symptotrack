import React from 'react';
import Link from 'next/link';

// Components
import ButtonArrow from '../components/General/ButtonArrow';
import Counter from '../components/General/Counter';

// Styling
import { Box, Container, Row, Heading, Text, HR, InfoSection } from '../components/styles';

const Home = () => (
  <>
    <Container py={40}>
      <Row pt={40} pb={70}>
        <Heading.H1 color="blue">COVID-19 SymptoTrack</Heading.H1>
        <Text as="p" mb={40}>
          Helaas kan niet iedereen getest worden op het nieuwe coronavirus (COVID-19). Daardoor
          weten we niet hoeveel mensen in Nederland besmet zijn. Help ons daarom de symptoom
          gevallen in kaart te brengen, zodat we beter weten hoe het virus zich verspreidt.
        </Text>
        <ButtonArrow text="Meld symptomen" />
      </Row>
      <HR color="blue" />
      <Row py={70}>
        <Box>
          <Counter number={13111121} />
          <Text as="p" mt={10}>
            hebben zich al gemeld
          </Text>
          <Link href="/map" as="/kaart" passHref>
            <a href>Kijk hier hoe de kaart van Nederland er uit ziet</a>
          </Link>
        </Box>
      </Row>
    </Container>
    <InfoSection bg="lightGreen" mb={70} shape="topLeft">
      <Container>
        <Row py={30}>
          <Heading.H2>Ik wil mij beter melden</Heading.H2>
          <Text as="p" mb={0} fontSize={16}>
            Voel je je beter en heb je al 24 uur geen symptomen meer? Na het invullen van de
            vragenlijst heb je via e-mail een link ontvangen waarmee je je beter kunt melden.
          </Text>
        </Row>
      </Container>
    </InfoSection>
  </>
);

export default Home;
