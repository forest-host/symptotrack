import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { Container, Row, Heading } from '../components/styles';

const Home = () => {
  return (
    <Container py={40}>
      <Row>
        <Heading.H1 color="blue">COVID-19 SymptoTrack</Heading.H1>
      </Row>
    </Container>
  );
};

export default Home;
