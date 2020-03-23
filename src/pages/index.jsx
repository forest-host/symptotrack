import React from 'react';

// Components
import ButtonArrow from '../components/General/ButtonArrow';
import Counter from '../components/General/Counter';

// Styling
import { Box, Container, Row, Heading, Text, HR } from '../components/styles';

const Home = () => (
  <Container py={40}>
    <Row>
      <Heading.H1 color="blue">COVID-19 SymptoTrack</Heading.H1>
      <Text as="p" mb={40}>
        Helaas kan niet iedereen getest worden op het nieuwe coronavirus (COVID-19). Daardoor weten
        we niet hoeveel mensen in Nederland besmet zijn. Help ons daarom de symptoom gevallen in
        kaart te brengen, zodat we beter weten hoe het virus zich verspreidt.
      </Text>
      <ButtonArrow text="Meld symptomen" />
      <HR my={70} color="blue" />
      <Box>
        <Counter number={13111121} />
        <Text as="p" mt={10}>
          hebben zich al gemeld
        </Text>
      </Box>
    </Row>
  </Container>
);

export default Home;
