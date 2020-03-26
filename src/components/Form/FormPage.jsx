import React from 'react';
import PropTypes from 'prop-types';

// Components
import Fields from './Fields';

// Styling
import { Box } from '../styles';

const FormPage = ({ register, control, errors, questions, translations, translatedErrors }) => {
  console.log(translations);
  console.log(questions);
  // console.log(errors);

  return (
    <Box>
      {questions &&
        Object.keys(questions).map((question) => (
          <Fields
            register={register}
            control={control}
            question={question}
            questions={questions}
            translations={translations}
            errors={errors}
            translatedErrors={translatedErrors}
          />
        ))}
    </Box>
  );
};

FormPage.propTypes = {
  register: PropTypes.func.isRequired,
};

export default FormPage;
