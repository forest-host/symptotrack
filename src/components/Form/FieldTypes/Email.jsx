import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Components
import FieldHeader from './FieldHeader';
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import STextInput from './styles';

const Email = forwardRef(({ name, translation, error, width, placeholder }, ref) => (
  <Flex mb={30} mt={[15, 0]} flexDirection="column">
    {(translation?.question || translation?.description) && (
      <FieldHeader
        name={name}
        question={translation?.question}
        description={translation?.description}
      />
    )}
    {translation?.tooltip && (
      <Tooltip question={translation.tooltip.question} answer={translation.tooltip.answer} />
    )}
    <Box width={width}>
      <STextInput
        type="text"
        name={name}
        ref={ref}
        placeholder={translation?.placeholder || placeholder}
      />
    </Box>
    {error && (
      <Text mt={10} fontSize={12}>
        {error.message}
      </Text>
    )}
  </Flex>
));

Email.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
};

Email.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
};

export default Email;
