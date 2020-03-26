import React from 'react';
import PropTypes from 'prop-types';

// Components
import Fields from './Fields';

// Styling
import { SFormPage } from './styles';

const FormPage = ({
  register,
  control,
  errors,
  watch,
  questions,
  translatedQuestions,
  translatedGroup,
  translatedErrors,
  isActive,
}) => {
  const watchArray = [];
  questions &&
    Object.keys(questions).map((question) => {
      questions[question]?.conditions?.map((q) => {
        watchArray.push(q.question);
      });
    });

  const watchFields = watch(watchArray);

  return (
    <SFormPage isActive={isActive}>
      {questions &&
        Object.keys(questions).map((question) => (
          <Fields
            key={question}
            register={register}
            control={control}
            watchFields={watchFields}
            question={question}
            questions={questions}
            translations={translatedQuestions}
            translatedErrors={translatedErrors}
            errors={errors}
          />
        ))}
    </SFormPage>
  );
};

FormPage.propTypes = {
  register: PropTypes.func.isRequired,
  translatedQuestions: PropTypes.objectOf(PropTypes.object),
};

FormPage.defaultProps = {
  translatedQuestions: {},
};

export default FormPage;
