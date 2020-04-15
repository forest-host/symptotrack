import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDebounce, usePrevious } from '../../utils';

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
  errors,
  watch,
  watchFields,
  questions,
  activePage,
  activeQuestion,
  activeQuestionNumber,
  validateNextQuestion,
  activePageQuestions,
  question,
  translations,
  translatedErrors,
  prefill,
  setValue,
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

  const validateOnScroll = () => {
    if (typeof window !== 'undefined') {
      const lastScrollTop = 0;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        validateNextQuestion();
      }
    }
  };

  const handleScroll = validateOnScroll;

  const prevQuestion = usePrevious(activeQuestion);
  const prevPage = usePrevious(activePage);

  useEffect(() => {
    let questionLength = activePageQuestions.length;
    const respondingAnswer = watch(['responding_for']).responding_for;

    if (respondingAnswer === 'self' && activePage === 1) {
      questionLength = activePageQuestions.length - 2;
    }

    // if(prevPage != activePage) {
    if (activeQuestionNumber < questionLength - 1) {
      // if (prevQuestion != activeQuestion && activeQuestionNumber < activePageQuestions.length - 2) {
      function watchScroll() {
        window.addEventListener('wheel', handleScroll);
      }

      watchScroll();
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    }
    // }
  }, [activeQuestionNumber, activeQuestion, activePageQuestions]);

  switch (questions[question]?.type) {
    case 'text':
      switch (questions[question]?.variant) {
        case 'textarea':
          if (show) {
            return (
              <Box mb={100} id={`field-${question}`}>
                <TextArea
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <TextInput
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <Checkbox
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <Radio
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <RadioButtons
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <TextInput
                  type="number"
                  width={[1 / 2, 1 / 4]}
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
                  ref={register({
                    required: questions[question]?.required && translatedErrors?.required,
                    max: questions[question]?.max,
                    min: questions[question]?.min,
                    pattern: {
                      value: /^[0-9]{4}$/i,
                      message: translatedErrors?.invalid_integer,
                    },
                  })}
                />
              </Box>
            );
          }
          return false;
        case 'temperature':
          if (show) {
            return (
              <Box mb={100} id={`field-${question}`}>
                <RangeSlider
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <RangeSlider
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
      const translatedPrefill = [];
      translations?.[question]?.options &&
        Object.keys(translations?.[question]?.options).map((option) => {
          translatedOptions.push({
            value: option,
            label: translations[question].options[option],
          });
        });

      if (prefill) {
        prefill.map((option) => {
          translatedPrefill.push({
            value: option,
            label: translations?.[question]?.options?.[option],
          });
        });
      }

      switch (questions[question]?.variant) {
        case 'checkbox':
          if (show) {
            return (
              <Box mb={100} id={`field-${question}`}>
                <Checkbox
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={prefill}
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
              <Box mb={100} id={`field-${question}`}>
                <Select
                  translation={translations?.[question]}
                  name={question}
                  error={errors?.[question]}
                  prefill={translatedPrefill?.length > 0 && translatedPrefill}
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
          <Box mb={100} id={`field-${question}`}>
            <Location
              translation={translations?.[question]}
              name={question}
              error={errors?.[question]}
              prefill={prefill}
              setValue={setValue}
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
          <Box mb={100} id={`field-${question}`}>
            <Email
              translation={translations?.[question]}
              name={question}
              error={errors?.[question]}
              prefill={prefill}
              setValue={setValue}
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
