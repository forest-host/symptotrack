import React from 'react';
import PropTypes from 'prop-types';

// Components
import Fields from './Fields';

// Styling
import { Box } from '../styles';

const FormPage = ({
  register,
  control,
  errors,
  watch,
  questions,
  translations,
  translatedErrors,
}) => {
  // console.log(translations);
  // console.log(questions);
  // console.log(errors);

  const watchArray = [];
  questions &&
    Object.keys(questions).map((question) => {
      questions[question]?.conditions?.map((q) => {
        watchArray.push(q.question);
      });
    });

  const watchFields = watch(watchArray);

  return (
    <Box>
      {questions &&
        Object.keys(questions).map((question) => (
          <Fields
            register={register}
            control={control}
            watchFields={watchFields}
            question={question}
            questions={questions}
            translations={translations}
            translatedErrors={translatedErrors}
            errors={errors}
          />
        ))}
    </Box>
  );
};

FormPage.propTypes = {
  register: PropTypes.func.isRequired,
};

export default FormPage;
