import React from 'react';
import PropTypes from 'prop-types';

// Components
import { TextInput, RadioButtons, Select, RangeSlider } from './FieldTypes';

// Styling
import { Box } from '../styles';

const Fields = ({
  register,
  control,
  errors,
  questions,
  question,
  translations,
  translatedErrors,
}) => {
  switch (questions[question]?.type) {
    case 'text':
      return (
        <Box mb={100}>
          <TextInput
            translation={translations?.questions?.[question]}
            name={question}
            error={errors?.[question]}
            ref={register({
              required: questions[question]?.required && translatedErrors?.required,
            })}
            {...questions[question]}
          />
        </Box>
      );
    case 'select':
    case 'boolean':
      return (
        <Box mb={100}>
          <RadioButtons
            translation={translations?.questions?.[question]}
            name={question}
            error={errors?.[question]}
            ref={register({
              required: questions[question]?.required && translatedErrors?.required,
            })}
            {...questions[question]}
          />
        </Box>
      );
    case 'integer':
    case 'float':
      switch (questions[question]?.variant) {
        case 'year':
          return (
            <Box mb={100}>
              <TextInput
                width={[1 / 2, 1 / 4]}
                translation={translations?.questions?.[question]}
                name={question}
                error={errors?.[question]}
                ref={register({
                  required: questions[question]?.required && translatedErrors?.required,
                  pattern: {
                    max: questions[question]?.max,
                    min: questions[question]?.min,
                    value: /^[0-9]{4}$/i,
                    message: translatedErrors?.invalid_integer,
                  },
                })}
                {...questions[question]}
              />
            </Box>
          );
        case 'temperature':
          return (
            <Box mb={100}>
              <RangeSlider
                name={question}
                ref={register({
                  required: questions[question]?.required && translatedErrors?.required,
                })}
                translation={translations?.questions?.[question]}
                step={0.1}
                {...questions[question]}
              />
            </Box>
          );
        default:
          return (
            <Box mb={100}>
              <RangeSlider
                name={question}
                ref={register({
                  required: questions[question]?.required && translatedErrors?.required,
                })}
                translation={translations?.questions?.[question]}
                {...questions[question]}
              />
            </Box>
          );
      }
    case 'multiselect':
      const translatedOptions = [];
      translations?.questions?.[question]?.options &&
        Object.keys(translations?.questions?.[question]?.options).map((option) => {
          translatedOptions.push({
            value: option,
            label: translations.questions[question].options[option],
          });
        });

      return (
        <Box mb={100}>
          <Select
            translation={translations?.questions?.[question]}
            name={question}
            control={control}
            error={errors?.[question]}
            translatedOptions={translatedOptions}
            ref={register({
              required: questions[question]?.required && translatedErrors?.required,
            })}
            isMulti
            {...questions[question]}
          />
        </Box>
      );
    default:
      return false;
  }
};

Fields.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Fields;
