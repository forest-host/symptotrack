import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { Box, Text } from '../../styles';
import { SLabel } from './styles';

const FieldHeader = ({ question, description, name }) => (
  <Box mb={24}>
    {question && (
      <Box width={7 / 12}>
        <SLabel as="span" htmlFor={name} dangerouslySetInnerHTML={{ __html: question }} />
      </Box>
    )}
    {description && (
      <Box mt={10} width={[1, 7 / 12]}>
        <Text as="p" m={0} fontSize={16} fontStyle="italic">
          {description}
        </Text>
      </Box>
    )}
  </Box>
);

FieldHeader.propTypes = {
  name: PropTypes.string.isRequired,
  question: PropTypes.string,
  description: PropTypes.string,
};

FieldHeader.defaultProps = {
  question: null,
  description: null,
};

export default FieldHeader;
