import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../utils';

// Styling
import { Box, Row, Heading, Text } from '../styles';

const Hero = ({ title, content }) => (
  <Row mb={40}>
    <Box width={[1, 6 / 12]}>
      <Heading.H2 as="h1" color="blue">
        {title}
      </Heading.H2>
      {content && (
        <Text as="p" mb={40}>
          {formatTags(content)}
        </Text>
      )}
    </Box>
  </Row>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

Hero.defaultProps = {
  content: null,
};

export default Hero;
