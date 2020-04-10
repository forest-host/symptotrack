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
  const [activePageQuestion, setActivePageQuestion] = useState(0);
  const [hasError, setError] = useState(false);
  const [keyPressActive, setKeypressActive] = useState(true);

  let activePageKey = Object.keys(groups)[activePage - 1];
  // const [activePageQuestions, setActivePageQuestions] = useState(
  //   Object.keys(groups[activePageKey].questions)
  // );

  let activePageQuestions = Object.keys(groups[activePageKey].questions);
  console.log(activePageQuestions);

  const [activeQuestionNumber, setActiveQuestionNumber] = useState(1);
  const [activePageQuestionNumber, setActivePageQuestionNumber] = useState(1);

  const [activeQuestion, setActiveQuestion] = useState(
    Object.keys(groups[activePageKey].questions)[activeQuestionNumber - 1]
  );

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

  const nextQuestionNumber = () => {
    setActiveQuestionNumber(activeQuestionNumber + 1);
    setActivePageQuestionNumber(activePageQuestionNumber + 1);
    setActivePageQuestion(activePageQuestion + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    let activeQuestionWatchKeys = [];
    const watchKeys = Object.keys(watch());
    watchKeys.map((watchKey) => {
      const activeQuestionKey = watchKey.replace(/\[.*?\]/g, '').replace(/[0-9]/g, '');
      activeQuestionWatchKeys.push(activeQuestionKey);
    });
    activeQuestionWatchKeys = activeQuestionWatchKeys.filter(
      (item, pos) => activeQuestionWatchKeys.indexOf(item) == pos
    );
    setActiveQuestion(activeQuestionWatchKeys[activeQuestionNumber]);
  };

  const validateNextQuestion = async () => {
    const watchAll = watch();
    const questionArray = [];
    const validateArray = [];
    let valid = false;
    const { questions } = groups[activePageKey];
    questionArray.push(activeQuestion);
    const watchKeys = Object.keys(watchAll);
    let activeQuestionWatchKeys = [];

    watchKeys.map((watchKey) => {
      const activeQuestionKey = watchKey.replace(/\[.*?\]/g, '').replace(/[0-9]/g, '');
      activeQuestionWatchKeys.push(activeQuestionKey);
    });

    activeQuestionWatchKeys = activeQuestionWatchKeys.filter(
      (item, pos) => activeQuestionWatchKeys.indexOf(item) == pos
    );

    questions &&
      Object.keys(questions).map((question) => {
        if (activeQuestionWatchKeys.includes(question)) {
          questionArray.push(question);
        } else {
          activeQuestionWatchKeys.map((watch) => {
            if (watch.startsWith(`${question}[`)) {
              questionArray.push(watch);
            }
          });
        }
      });

    const pageQuestions = questionArray.filter((item, pos) => questionArray.indexOf(item) == pos);

    questions &&
      Object.keys(questions).map((question) => {
        const pageQuestions = Object.keys(watchAll);
        if (pageQuestions.includes(question)) {
          questionArray.push(question);
        } else {
          pageQuestions.map((watch) => {
            if (watch.startsWith(`${question}[`)) {
              questionArray.push(watch);
            }
          });
        }
      });

    const activePageQuestions = [];

    pageQuestions?.map((question) => {
      activePageQuestions[question] = groups[activePageKey].questions[question];
    });

    // setActivePageQuestions(activePageQuestions);

    await triggerValidation(activeQuestion).then((resp) => {
      if (resp) {
        valid = true;
        return setError(false);
      }
      return setError(true);
    });

    if (errors) {
      let currentErrors = Object.keys(errors);
      currentErrors = currentErrors.filter((s) => s !== 'location');
      const currentError = currentErrors[0];

      const errorEl = document.getElementById(`field-${currentError}`);
      if (errorEl) {
        window.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: errorEl.offsetTop - 50,
        });
      }
    }
    if (valid) {
      nextQuestionNumber();
      window.scrollTo(0, 0);
    }
  };

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
            activeQuestionNumber={activeQuestionNumber}
            setActiveQuestionNumber={setActiveQuestionNumber}
            activePageQuestionNumber={activePageQuestionNumber}
            setActivePageQuestionNumber={setActivePageQuestionNumber}
            validateNextQuestion={validateNextQuestion}
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
