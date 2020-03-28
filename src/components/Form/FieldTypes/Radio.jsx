import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import FieldHeader from './FieldHeader';
import TextInput from './TextInput';
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import { SRadio } from './styles';

const Radio = forwardRef(({ name, options, other, translation, error, prefill }, ref) => {
  const [showOther, setOther] = useState(false);
  const [checked, setChecked] = useState(prefill);
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
      <Flex mb={10} flexDirection="column">
        {radioOptions?.map((option) => (
          <SRadio as="label" key={option} htmlFor={`${option}-${name}`} mb={24}>
            <Box
              as="input"
              type="radio"
              id={`${option}-${name}`}
              value={option}
              name={name}
              checked={checked === option}
              ref={ref}
              onChange={() => {
                setOther(false);
                setChecked(option);
              }}
            />
            <Text as="span" fontSize={18} />
            {translation?.options?.[option]}
          </SRadio>
        ))}
        {other && (
          <SRadio as="label" htmlFor={`other-${name}`} mb={24}>
            <Box
              as="input"
              type="radio"
              id={`other-${name}`}
              value="other"
              name={name}
              checked={checked === 'other'}
              ref={ref}
              onChange={() => {
                setOther(true);
                setChecked('other');
              }}
            />
            <Text as="span" fontSize={18} />
            {translation?.other}
          </SRadio>
        )}
        {translation?.skip && (
          <SRadio as="label" htmlFor={`skip-${name}`} mb={24}>
            <Box
              as="input"
              type="radio"
              id={`skip-${name}`}
              value="skip"
              name={name}
              checked={checked === 'skip'}
              ref={ref}
              onChange={() => {
                setOther(false);
                setChecked('skip');
              }}
            />
            <Text as="span" fontSize={18} />
            {translation?.skip}
          </SRadio>
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

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  other: PropTypes.bool,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  prefill: PropTypes.string,
};

Radio.defaultProps = {
  options: [],
  other: false,
  translation: null,
  error: false,
  prefill: null,
};

export default Radio;
