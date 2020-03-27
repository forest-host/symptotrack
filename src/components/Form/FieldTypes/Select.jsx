import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

// Components
import FieldHeader from './FieldHeader';
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import { SSelect } from './styles';

const Select = forwardRef(
  ({ name, control, translation, error, width, placeholder, translatedOptions, isMulti }, ref) => (
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
        <Controller
          as={<ReactSelect />}
          control={control}
          options={translatedOptions}
          ref={ref}
          name={name}
          placeholder={translation?.placeholder || placeholder}
          isMulti={isMulti}
          defaultMenuIsOpen={isMulti}
          menuIsOpen={isMulti}
          styles={SSelect}
        />
      </Box>
      {error && (
        <Text mt={10} fontSize={12}>
          {error.message}
        </Text>
      )}
    </Flex>
  )
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  translatedOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Select.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
  isMulti: false,
};

export default Select;
