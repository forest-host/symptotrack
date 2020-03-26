import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import TextInput from './TextInput';

// Styling
import { Box, Flex, Text } from '../../styles';
import { SLabel, SRadioButton } from './styles';

const RadioButtons = forwardRef(({ name, options, other, translation, error }, ref) => {
  const [showOther, setOther] = useState(false);
  let radioOptions = options;

  if (translation?.options) {
    radioOptions = Object.keys(translation?.options);
  }

  const setOtherValue = (value) => {
    const otherInput = document.querySelector(`#${`other-${name}`}`);
    otherInput.value = value;
  };

  return (
    <Flex as="fieldset" mb={30} mt={[15, 0]} flexDirection="column">
      {translation?.question && (
        <Box mb={24} width={7 / 12}>
          <SLabel as="legend" htmlFor={name}>
            {translation.question}
          </SLabel>
        </Box>
      )}
      <Flex mx={-12} mb={10}>
        {radioOptions?.map((option) => (
          <SRadioButton mx={12}>
            <Box
              as="input"
              type="radio"
              id={`${option}-${name}`}
              value={option}
              name={name}
              ref={ref}
              onClick={() => setOther(false)}
            />
            <Text as="label" fontSize={18} htmlFor={`${option}-${name}`}>
              {translation?.options?.[option]}
            </Text>
          </SRadioButton>
        ))}
        {other && (
          <SRadioButton mx={12}>
            <Box
              as="input"
              type="radio"
              id={`other-${name}`}
              value="other"
              name={name}
              ref={ref}
              onClick={() => setOther(true)}
            />
            <Text as="label" fontSize={18} htmlFor={`other-${name}`}>
              {translation?.other}
            </Text>
          </SRadioButton>
        )}
        {translation?.skip && (
          <SRadioButton mx={12}>
            <Box
              as="input"
              type="radio"
              id={`skip-${name}`}
              value={`skip-${name}`}
              name={name}
              ref={ref}
              onClick={() => setOther(false)}
            />
            <Text as="label" fontSize={18} htmlFor={`skip-${name}`}>
              {translation?.skip}
            </Text>
          </SRadioButton>
        )}
      </Flex>
      {showOther && (
        <TextInput
          onChange={(e) => setOtherValue(e.target.value)}
          placeholder={translation?.other}
          required
        />
      )}
      {error && (
        <Text mt="5px" fontSize={12}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
});

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  other: PropTypes.bool,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

RadioButtons.defaultProps = {
  options: [],
  other: false,
  translation: null,
  error: false,
};

export default RadioButtons;
