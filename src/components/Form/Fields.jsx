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
  watchFields,
  questions,
  question,
  translations,
  translatedErrors,
}) => {
  let show = true;

  questions[question]?.conditions?.map(({ question, answer }) => {
    const watchValue = watchFields?.[question];

    if (
      (watchValue === 'true' && answer === true) ||
      (watchValue === 'false' && answer === false)
    ) {
      show = true;
    } else {
      show = watchFields?.[question] == answer;
    }
  });

  switch (questions[question]?.type) {
    case 'text':
      if (show) {
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
      }
      return false;
    case 'select':
    case 'boolean':
      if (show) {
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
      }
      return false;
    case 'integer':
    case 'float':
      switch (questions[question]?.variant) {
        case 'year':
          if (show) {
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
          }
          return false;
        case 'temperature':
          if (show) {
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
          }
          return false;
        default:
          if (show) {
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
          return false;
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

      if (show) {
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
      }
      return false;
    default:
      return false;
  }
};

Fields.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Fields;
