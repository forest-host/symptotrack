import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../utils';

// Styling
import { Box, Row, Heading, Text } from '../styles';

const Hero = ({ title, content, large, ...props }) => {
  const HeroTitle = large ? Heading.H1 : Heading.H2;

  return (
    <Row mb={40} {...props}>
      <Box width={[1, 8 / 12, 6 / 12]}>
        <HeroTitle as="h1" color="blue">
          {title}
        </HeroTitle>
        {content && (
          <Text as="p" mt={large ? 40 : 15} mb={40}>
            {formatTags(content)}
          </Text>
        )}
      </Box>
    </Row>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  large: PropTypes.bool,
};

Hero.defaultProps = {
  content: null,
  large: false,
};

export default Hero;
