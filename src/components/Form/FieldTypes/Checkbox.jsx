import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import FieldHeader from './FieldHeader';
import Tooltip from '../../General/Tooltip';

// Styling
import { Flex, Text } from '../../styles';
import { SCheckbox } from './styles';

const Checkbox = forwardRef(
  ({ name, translation, error, width, isMulti, translatedOptions, prefill, max_options }, ref) => {
    const [checked, setChecked] = useState(prefill || isMulti ? [] : null);

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
        {!isMulti ? (
          <SCheckbox as="label" htmlFor={name} width={width} alignItems="center">
            <input
              type="checkbox"
              id={name}
              name={name}
              ref={ref}
              checked={checked === 'true' || checked}
              onClick={() => setChecked(!checked)}
            />
            <Text as="span" />
            {translation?.options?.true}
          </SCheckbox>
        ) : (
          <Flex flexWrap="wrap">
            {translatedOptions?.map(({ value, label }) => (
              <SCheckbox
                key={`${name}-${value}`}
                as="label"
                htmlFor={`${name}-${value}`}
                alignItems="center"
                width={[1 / 2, 1 / 3]}
                mb={24}
              >
                <input
                  type="checkbox"
                  id={`${name}-${value}`}
                  name={`${name}[${value}]`}
                  ref={ref}
                  checked={checked?.includes(value)}
                  onClick={() => {
                    if (!checked?.includes(value)) {
                      setChecked(
                        max_options
                          ? checked?.length < max_options
                            ? [...checked, value]
                            : checked
                          : [...checked, value]
                      );
                    } else {
                      setChecked(checked.filter((s) => s !== value));
                    }
                  }}
                />
                <Text as="span" />
                {label}
              </SCheckbox>
            ))}
          </Flex>
        )}
        {error && (
          <Text mt={10} fontSize={12}>
            {error.message}
          </Text>
        )}
      </Flex>
    );
  }
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  isMulti: PropTypes.bool,
  translatedOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  prefill: PropTypes.string,
  max_options: PropTypes.bool,
};

Checkbox.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  isMulti: false,
  translatedOptions: null,
  prefill: null,
  max_options: null,
};

export default Checkbox;
