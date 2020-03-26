import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

// Styling
import { Box, Flex, Text } from '../../styles';
import { SLabel, SRangeSlider } from './styles';

const RangeSlider = forwardRef(({ name, translation, min, max, error, width, step }, ref) => {
  const [value, setValue] = useState(min);

  return (
    <Flex mb={30} mt={[15, 0]} flexDirection="column">
      {translation?.question && (
        <Box mb={24} width={7 / 12}>
          <SLabel as="span" htmlFor={name}>
            {translation.question}
          </SLabel>
        </Box>
      )}
      <Box width={width}>
        <SRangeSlider
          value={value}
          min={min}
          max={max}
          step={step}
          tooltip={false}
          handleLabel={value}
          onChange={(val) => setValue(val)}
        />
        <input type="hidden" name={name} ref={ref} value={value} />
      </Box>
      {error && (
        <Text mt={10} fontSize={12}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
});

RangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  step: PropTypes.number,
};

RangeSlider.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  step: 1,
};

export default RangeSlider;
