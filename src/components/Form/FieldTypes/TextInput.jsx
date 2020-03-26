import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Styling
import { Box, Flex, Text } from '../../styles';
import STextInput, { SLabel } from './styles';

const TextInput = forwardRef(({ name, translation, error, width, placeholder }, ref) => (
  <Flex mb={30} mt={[15, 0]} flexDirection="column">
    {translation?.question && (
      <Box mb={24} width={7 / 12}>
        <SLabel as="span" htmlFor={name}>
          {translation.question}
        </SLabel>
      </Box>
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

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
};

export default TextInput;
