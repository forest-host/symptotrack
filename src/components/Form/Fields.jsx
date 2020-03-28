import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  TextInput,
  TextArea,
  Radio,
  RadioButtons,
  Select,
  RangeSlider,
  Checkbox,
  Location,
  Email,
} from './FieldTypes';

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

  questions[question]?.conditions?.map(({ question, answer, not_answer }) => {
    const watchValue = watchFields?.[question];

    if (
      (watchValue === 'true' && answer === true) ||
      (watchValue === 'false' && answer === false)
    ) {
      show = true;
    } else {
      show = watchFields?.[question] === answer;
    }

    if (not_answer && watchFields?.[question] && not_answer !== watchFields?.[question]) {
      show = true;
    }
  });

  switch (questions[question]?.type) {
    case 'text':
      switch (questions[question]?.variant) {
        case 'textarea':
          if (show) {
            return (
              <Box mb={100}>
                <TextArea
                  translation={translations?.[question]}
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
        default:
          if (show) {
            return (
              <Box mb={100}>
                <TextInput
                  translation={translations?.[question]}
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
      }
    case 'select':
    case 'boolean':
      switch (questions[question]?.variant) {
        case 'checkbox':
          if (show) {
            return (
              <Box mb={100}>
                <Checkbox
                  translation={translations?.[question]}
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
        case 'radio':
          if (show) {
            return (
              <Box mb={100}>
                <Radio
                  translation={translations?.[question]}
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
        default:
          if (show) {
            return (
              <Box mb={100}>
                <RadioButtons
                  translation={translations?.[question]}
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
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  ref={register({
                    required: questions[question]?.required && translatedErrors?.required,
                    max: questions[question]?.max,
                    min: questions[question]?.min,
                    pattern: {
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
                  translation={translations?.[question]}
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
                  translation={translations?.[question]}
                  {...questions[question]}
                />
              </Box>
            );
          }
          return false;
      }
    case 'multiselect':
      const translatedOptions = [];
      translations?.[question]?.options &&
        Object.keys(translations?.[question]?.options).map((option) => {
          translatedOptions.push({
            value: option,
            label: translations[question].options[option],
          });
        });

      switch (questions[question]?.variant) {
        case 'checkbox':
          if (show) {
            return (
              <Box mb={100}>
                <Checkbox
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  isMulti
                  translatedOptions={translatedOptions}
                  ref={register({
                    required: questions[question]?.required && translatedErrors?.required,
                  })}
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
                <Select
                  translation={translations?.[question]}
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
      }
      return false;
    case 'coordinates':
      if (show) {
        return (
          <Box mb={100}>
            <Location
              translation={translations?.[question]}
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
    case 'email':
      if (show) {
        return (
          <Box mb={100}>
            <Email
              translation={translations?.[question]}
              name={question}
              error={errors?.[question]}
              ref={register({
                required: questions[question]?.required && translatedErrors?.required,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: translatedErrors?.invalid_text,
                },
              })}
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
