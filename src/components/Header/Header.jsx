import React from 'react';
import Link from 'next/link';

// Styling
import SHeader from './styles';
import { Container, Flex, Row } from '../styles';

const Header = () => (
  <SHeader>
    <Container>
      <Row>
        <Flex py={20} justifyContent="center" alignItems="center">
          <Link href="/" passHref>
            <a href>
              <img src="/static/logo.svg" alt="SymptoTrack" />
            </a>
          </Link>
        </Flex>
      </Row>
    </Container>
  </SHeader>
);

export default Header;
