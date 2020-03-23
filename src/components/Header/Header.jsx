import React from 'react';

// Styling
import SHeader from './styles';
import { Container, Flex, Row } from '../styles';

const Header = () => (
  <SHeader>
    <Container>
      <Row>
        <Flex py={20} justifyContent="center" alignItems="center">
          <img src="/static/logo.svg" alt="SymptoTrack" />
        </Flex>
      </Row>
    </Container>
  </SHeader>
);

export default Header;
