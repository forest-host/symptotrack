import React from 'react';
import Link from 'next/link';

// Components
import ButtonArrow from '../components/General/ButtonArrow';
import Counter from '../components/General/Counter';

// Styling
import { Box, Container, Flex, Row, Heading, Text, HR, InfoSection } from '../components/styles';

const Home = () => (
  <Container py={40}>
    <Row pt={[0, 40]} pb={70}>
      <Flex flexDirection={['column', 'row']} justifyContent="space-between" alignItems="center">
        <Box mb={[70, 0]} width={[1, 5 / 12]}>
          <Heading.H1 color="blue">COVID-19 SymptoTrack</Heading.H1>
          <Text as="p" mb={40}>
            Helaas kan niet iedereen getest worden op het nieuwe coronavirus (COVID-19). Daardoor
            weten we niet hoeveel mensen in Nederland besmet zijn. Help ons daarom de symptoom
            gevallen in kaart te brengen, zodat we beter weten hoe het virus zich verspreidt.
          </Text>
          <ButtonArrow text="Meld symptomen" />
        </Box>
        <HR color="blue" smallOnly />
        <Box mt={[70, 0]} width={[1, 4 / 12]}>
          <Counter number={13111121} />
          <Text as="p" mt={10}>
            hebben hun symptomen al gemeld
          </Text>
          <Link href="/map" as="/kaart" passHref>
            <a href>Kijk hier hoe de kaart van Nederland er uit ziet</a>
          </Link>
        </Box>
      </Flex>
    </Row>
    <Row mb={[30, 70]} mx={[-15, 0]} smallFullWidth>
      <InfoSection
        width={[1, 8 / 12]}
        py={30}
        pl={[15, 90]}
        pr={[15, 40]}
        bg="lightGreen"
        shape="topLeft"
      >
        <Flex flexDirection={['column', 'row']} alignItems={['initial', 'flex-end']}>
          <Box width={[1, 1 / 3]}>
            <Heading.H2>Ik wil mij beter melden</Heading.H2>
          </Box>
          <Box width={[1, 2 / 3]}>
            <Text as="p" mb={0} ml={[0, 40]} fontSize={16}>
              Voel je je beter en heb je al 24 uur geen symptomen meer? Na het invullen van de
              vragenlijst heb je via e-mail een link ontvangen waarmee je je beter kunt melden.
            </Text>
          </Box>
        </Flex>
      </InfoSection>
    </Row>
  </Container>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'socials', 'home'],
});

export default Home;
