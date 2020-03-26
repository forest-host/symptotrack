import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Components
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import { STextArea, SLabel } from './styles';

const TextArea = forwardRef(({ name, translation, error, width, placeholder }, ref) => (
  <Flex mb={30} mt={[15, 0]} flexDirection="column">
    {translation?.question && (
      <Box mb={24} width={7 / 12}>
        <SLabel as="span" htmlFor={name}>
          {translation.question}
        </SLabel>
      </Box>
    )}
    {translation?.tooltip && (
      <Tooltip question={translation.tooltip.question} answer={translation.tooltip.answer} />
    )}
    <Box width={width}>
      <STextArea
        name={name}
        ref={ref}
        textArea
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
};

export default TextArea;
