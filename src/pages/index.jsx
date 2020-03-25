import React from 'react';
import Div100vh from 'react-div-100vh';

// Styling
import { Box, Container, Flex, Heading, Row } from '../components/styles';

const ComingSoon = () => (
  <Container>
    <Row>
      <Div100vh>
        <Flex justifyContent="center" alignItems="center" css={{ height: '100%' }}>
          <Box width={[10 / 12, 8 / 12]}>
            <img src="/static/logo-big.svg" alt="SymptoTrack" css={{ width: '100%' }} />
            <Heading.H1 mt={30} fontWeight={400} color="blue">
              Coming soon
            </Heading.H1>
          </Box>
        </Flex>
      </Div100vh>
    </Row>
  </Container>
);

ComingSoon.getInitialProps = async () => ({
  namespacesRequired: ['common', 'socials', 'home'],
});

export default ComingSoon;
