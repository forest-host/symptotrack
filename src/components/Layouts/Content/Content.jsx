import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../../utils';

// Styling
import { Box, Row, Heading, Text } from '../../styles';

const Content = ({ title, content }) => (
  <Row mb={40}>
    <Box width={[1, 8 / 12]}>
      {title && <Heading.H3>{title}</Heading.H3>}
      {content && (
        <Text as="p" mb={40}>
          {formatTags(content)}
        </Text>
      )}
    </Box>
  </Row>
);

Content.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Content.defaultProps = {
  title: null,
  content: null,
};

export default Content;
