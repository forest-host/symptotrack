import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Utils
import { formatTags } from '../../../utils';

// Styling
import { Box, Flex, Row, Heading, Text } from '../../styles';

const Partners = ({ title, content, items }) => (
  <Row mb={40}>
    <Box width={[1, 8 / 12]}>
      {title && <Heading.H3>{title}</Heading.H3>}
      {content && (
        <Text as="p" mb={15}>
          {formatTags(content)}
        </Text>
      )}
      {items && (
        <Flex mx={-8} justifyContent="space-between" flexWrap="wrap">
          {items.map((item) => (
            <Box key={uuid()} width={1 / 3} p={8}>
              <Flex px={10} py={30} alignItems="center" justifyContent="center" bg="lightGreen">
                {item.title}
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  </Row>
);

Partners.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

Partners.defaultProps = {
  title: null,
  content: null,
  items: [],
};

export default Partners;
