import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

// Utils
import { numberToFixed } from '../../../utils';

// Components
import FieldHeader from './FieldHeader';
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import { SRangeSlider, SButtonGroup } from './styles';

const RangeSlider = forwardRef(
  ({ name, variant, translation, min, max, error, width, step, prefill }, ref) => {
    const [type, setType] = useState('celsius');
    const [value, setValue] = useState(prefill || min);

    return (
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
        {variant === 'temperature' && (
          <SButtonGroup mb={60}>
            <button
              type="button"
              onClick={() => setType('celsius')}
              className={(type === 'celsius' && 'active') || ''}
            >
              Celsius
            </button>
            <button
              type="button"
              onClick={() => setType('fahrenheit')}
              className={(type === 'fahrenheit' && 'active') || ''}
            >
              Fahrenheit
            </button>
          </SButtonGroup>
        )}
        <Box width={['95%', 1]} mt={variant !== 'temperature' ? 40 : 0} mx="auto">
          <SRangeSlider
            value={value}
            min={min}
            max={max}
            step={(variant === 'temperature' && type === 'fahrenheit' && 0.01) || step}
            tooltip={false}
            handleLabel={
              variant === 'temperature'
                ? type === 'celsius'
                  ? `${value}°C`
                  : `${numberToFixed((value * 9) / 5 + 32, 2)}°F`
                : translation?.placeholder
                ? `${value === max ? `${(value - 1).toString()}+` : value.toString()} ${
                    translation.placeholder
                  }`
                : value === max
                ? `${(value - 1).toString()}+`
                : value.toString()
            }
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
  }
);

RangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  step: PropTypes.number,
  variant: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  prefill: PropTypes.number,
};

RangeSlider.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  step: 1,
  variant: null,
  min: null,
  max: null,
  prefill: null,
};

export default RangeSlider;
