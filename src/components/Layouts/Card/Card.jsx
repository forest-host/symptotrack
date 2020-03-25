import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../../utils';

// Styling
import { Box, Flex, Row, Heading, Text, InfoSection } from '../../styles';

const Card = ({ title, content }) => (
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
        {title && (
          <Box width={[1, 1 / 3]}>
            <Heading.H2>{title}</Heading.H2>
          </Box>
        )}
        {content && (
          <Box width={[1, 2 / 3]}>
            <Text as="p" mb={0} ml={[0, 40]} fontSize={16}>
              {formatTags(content)}
            </Text>
          </Box>
        )}
      </Flex>
    </InfoSection>
  </Row>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

Card.defaultProps = {
  content: null,
};

export default Card;
