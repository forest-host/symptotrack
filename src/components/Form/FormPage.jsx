import React from 'react';
import PropTypes from 'prop-types';

// Components
import Fields from './Fields';

// Styling
import { SFormPage } from './styles';

const FormPage = ({
  index,
  register,
  control,
  errors,
  watch,
  questions,
  translatedQuestions,
  translatedGroup,
  translatedErrors,
  isActive,
  isLast,
  nextPage,
  prevPage,
}) => {
  const watchArray = [];
  questions &&
    Object.keys(questions).map((question) => {
      questions[question]?.conditions?.map((q) => {
        watchArray.push(q.question);
      });
    });

  const watchFields = watch(watchArray);

  console.log(questions);

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
      {index !== 0 && (
        <button
          type="button"
          onClick={() => {
            prevPage();
            window.scrollTo(0, 0);
          }}
        >
          Prev page
        </button>
      )}
      {!isLast && (
        <button
          type="button"
          onClick={() => {
            nextPage();
            window.scrollTo(0, 0);
          }}
        >
          Next page
        </button>
      )}
      {isLast && <button type="submit">Submit</button>}
    </SFormPage>
  );
};

FormPage.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  translatedQuestions: PropTypes.objectOf(PropTypes.object),
  isActive: PropTypes.bool,
  isLast: PropTypes.bool,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

FormPage.defaultProps = {
  translatedQuestions: {},
  isActive: false,
  isLast: false,
};

export default FormPage;
