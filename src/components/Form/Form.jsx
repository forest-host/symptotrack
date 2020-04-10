import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

// Utils
import { numberToFixed } from '../../utils';

// Components
import FormPage from './FormPage';

// Styling
import SForm from './styles';

const Form = ({
  form,
  prefill,
  translations,
  translatedErrors,
  onSubmit,
  setPercentage,
  setCount,
}) => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    triggerValidation,
    setValue,
  } = useForm();
  const { groups } = form || {};
  const watchAllFields = watch();
  const pageAmount = Object.size(groups);
  const [activePage, setActivePage] = useState(1);
  const [hasError, setError] = useState(false);
  const [keyPressActive, setKeypressActive] = useState(true);

  let activePageKey = Object.keys(groups)[activePage - 1];
  // const [activePageQuestions, setActivePageQuestions] = useState(
  //   Object.keys(groups[activePageKey].questions)
  // );

  let activePageQuestions = Object.keys(groups[activePageKey].questions);

  const [activeQuestionNumber, setActiveQuestionNumber] = useState(1);
  const [activePageQuestionNumber, setActivePageQuestionNumber] = useState(1);

  const [activeQuestion, setActiveQuestion] = useState(
    Object.keys(groups[activePageKey].questions)[activeQuestionNumber - 1]
  );

  const bla2 = (activeQuestion) => {
    console.log(activeQuestion);
    // do something with value in parent component, like save to state
  };

  useEffect(() => {
    setCount({ currentPage: activePage, total: pageAmount });
  }, [activePage]);

  useEffect(() => {
    const fieldAmount = [];
    const requiredFields = [];
    groups &&
      requiredFields?.length === 0 &&
      Object.keys(groups).map((group) => {
        groups[group]?.questions &&
          Object.keys(groups[group]?.questions)?.map((question) => {
            if (groups[group]?.questions[question].required) {
              if (groups[group]?.questions[question]?.conditions) {
                groups[group]?.questions[question]?.conditions?.map((q) => {
                  const watchQuestion = watch(q.question);

                  if (watchQuestion && q.answer && q.answer === watchQuestion) {
                    requiredFields.push(question);
                  }
                  if (watchQuestion && q.not_answer && q.not_answer !== watchQuestion) {
                    requiredFields.push(question);
                  }
                });
              } else {
                requiredFields.push(question);
              }
            }
          });
      });

    requiredFields.map((question) => {
      const watchKeys = Object.keys(watchAllFields);
      watchKeys.some((s) => {
        if (s.startsWith(`${question}[`)) {
          requiredFields.push(s);
        }
      });
    });

    requiredFields?.map((field) => {
      if (formState.dirtyFields.has(field)) {
        fieldAmount.push(field);
      }
    });

    setPercentage(numberToFixed((100 * fieldAmount.length) / (requiredFields.length - 1)));
  }, [formState]);

  // Navigate to next page
  const nextPage = () => {
    setActivePage(activePage + 1);
    setActiveQuestionNumber(0);
  };

  // Navigate to previous page
  const prevPage = () => {
    setActivePage(activePage - 1);
    setActivePageQuestion(0);
  };

  useEffect(() => {
    const activePageQuestions = Object.keys(groups[activePageKey].questions);
    if (activePageQuestionNumber >= activePageQuestions.length - 1) {
      setKeypressActive(false);
    }
  }, [activePageQuestionNumber]);

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      {groups &&
        Object.keys(groups).map((group, i) => (
          <FormPage
            index={i}
            key={group}
            register={register}
            errors={errors}
            translations={translations}
            translatedQuestions={translations?.questions}
            translatedGroup={translations?.[group]}
            translatedErrors={translatedErrors}
            watch={watch}
            groups={groups}
            triggerValidation={triggerValidation}
            activePage={activePage}
            isActive={activePage === i + 1}
            isLast={i + 1 === pageAmount}
            nextPage={nextPage}
            prevPage={prevPage}
            bla2={bla2}
            activeQuestionNumber={activeQuestionNumber}
            setActiveQuestionNumber={setActiveQuestionNumber}
            activePageQuestionNumber={activePageQuestionNumber}
            setActivePageQuestionNumber={setActivePageQuestionNumber}
            nextQuestion={activeQuestion}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            keyPressActive={keyPressActive}
            prefill={prefill}
            setValue={setValue}
            {...groups[group]}
          />
        ))}
    </SForm>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setPercentage: PropTypes.func,
  setCount: PropTypes.func,
};

Form.defaultProps = {
  setCount: () => {},
  setPercentage: () => {},
};

export default Form;
