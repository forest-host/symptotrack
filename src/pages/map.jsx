import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../i18n';

// Components
import SymptoMap from '../components/Map';

// Styling
import { Container, Row, Heading, Text } from '../components/styles';

const Map = ({ t }) => (
  <Container pt={20} pb={70}>
    <Row mb={40}>
      <Heading.H2 as="h1" color="blue">
        De SymptomenKaart
      </Heading.H2>
      <Text as="p" mb={40}>
        Bekijk de kaart om te zien hoeveel mensen er in jouw buurt symptomen van het coronavirus
        hebben.
      </Text>
    </Row>
    <Row>
      <SymptoMap />
    </Row>
  </Container>
);

Map.propTypes = {
  t: PropTypes.func.isRequired,
};

Map.getInitialProps = async () => ({
  namespacesRequired: ['common', 'socials'],
});

export default withTranslation('socials')(Map);
