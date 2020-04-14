import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n } from '../../i18n';

// Components
import Fields from './Fields';
import ButtonArrow from '../General/ButtonArrow';

// Styling
import { SFormPage, Question } from './styles';
import { Box, Flex, Text } from '../styles';

const FormPage = ({
  index,
  register,
  control,
  errors,
  watch,
  triggerValidation,
  questions,
  translatedQuestions,
  translatedErrors,
  activePage,
  activeQuestionNumber,
  setActiveQuestion,
  setActiveQuestionNumber,
  activeQuestion,
  groups,
  isActive,
  isLast,
  nextPage,
  prevPage,
  prefill,
  setValue,
}) => {
  const [hasError, setError] = useState(false);
  const watchArray = [];
  questions &&
    Object.keys(questions).map((question) => {
      questions[question]?.conditions?.map(({ question }) => {
        !watchArray.includes(question) && watchArray.push(question);
      });
    });
  const watchFields = watch(watchArray);

  const activePageKey = Object.keys(groups)[activePage - 1];
  const [activePageQuestion, setActivePageQuestion] = useState(0);
  const [activePageQuestions, setActivePageQuestions] = useState(
    Object.keys(groups[activePageKey].questions)
  );

  const nextQuestion = () => {
    setActiveQuestionNumber(activeQuestionNumber + 1);
    setActivePageQuestion(activePageQuestion + 1);

    let activeQuestionWatchKeys = [];
    const watchKeys = Object.keys(watch());

    let respondingAnswer = watch(['responding_for'])['responding_for'];

    watchKeys.map((watchKey) => {
      const activeQuestionKey = watchKey.replace(/\[.*?\]/g, '').replace(/[0-9]/g, '');
      activeQuestionWatchKeys.push(activeQuestionKey);
    });
    activeQuestionWatchKeys = activeQuestionWatchKeys.filter(
      (item, pos) => activeQuestionWatchKeys.indexOf(item) == pos
    );

    if (respondingAnswer === 'self') {
      setActiveQuestion(activeQuestionWatchKeys[activeQuestionNumber]);
    } else {
      activeQuestionWatchKeys.splice(1, 0, 'asked_permission');
      activeQuestionWatchKeys.splice(2, 0, 'takes_precautions');
      activeQuestionWatchKeys.splice(25, 1);
      activeQuestionWatchKeys.splice(25, 1);
      setActiveQuestion(activeQuestionWatchKeys[activeQuestionNumber]);
    }
  };

  const validateNextQuestion = async () => {
    const watchAll = watch();
    const questionArray = [];
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
    let activeQuestionWatchKey;

    pageQuestions?.map((question) => {
      activePageQuestions[question] = groups[activePageKey].questions[question];
    });

    if (activeQuestion === 'location') {
      activeQuestionWatchKey = [watchKeys[1], watchKeys[1]];
    } else {
      activeQuestionWatchKey = activeQuestion;
    }

    await triggerValidation(activeQuestionWatchKey).then((resp) => {
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
      nextQuestion();
      window.scrollTo(0, 0);
    }
  };

  const validateNextPage = async () => {
    const watchAll = watch();
    const questionArray = [];
    const validateArray = [];

    let valid = false;

    questions &&
      Object.keys(questions).map((question) => {
        const watchKeys = Object.keys(watchAll);
        if (watchKeys.includes(question)) {
          questionArray.push(question);
        } else {
          watchKeys.map((watch) => {
            if (watch.startsWith(`${question}[`)) {
              questionArray.push(watch);
            }
          });
        }
      });

    questionArray?.map((question) => {
      if (questions[question]?.conditions) {
        questions[question]?.conditions?.map((q) => {
          const watchQuestion = watch(q.question);

          if (watchQuestion && q.answer && q.answer === watchQuestion) {
            validateArray.push(question);
          }
          if (watchQuestion && q.not_answer && q.not_answer !== watchQuestion) {
            validateArray.push(question);
          }
        });
      } else {
        validateArray.push(question);
      }
    });
    await triggerValidation(validateArray).then((resp) => {
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
      nextPage();
      window.scrollTo(0, 0);
    }
  };

  const nextPageBtn = () => {
    let respondingAnswer = watch(['responding_for'])['responding_for'];
    let answerOffset;
    if (respondingAnswer === 'self') {
      answerOffset = activePageQuestions.length - 2;
    } else {
      answerOffset = activePageQuestions.length;
    }

    if (activeQuestionNumber === answerOffset) {
      return (
        <Box mb={24} order={[0, 1]}>
          <ButtonArrow
            type="button"
            text={i18n.t('nextQuestions')}
            onClick={() => validateNextPage()}
          />
          {hasError && (
            <Text mt={10} fontSize={12}>
              {i18n.t('invalidForm')}
            </Text>
          )}
        </Box>
      );
    }
  };

  return (
    <SFormPage isActive={isActive}>
      {questions &&
        Object.keys(questions).map((question, i) => (
          <Question isActive={activeQuestion === question}>
            <Fields
              key={question}
              register={register}
              control={control}
              watchFields={watchFields}
              question={question}
              questions={questions}
              groups={groups}
              translations={translatedQuestions}
              activePage={activePage}
              watch={watch}
              activeQuestion={activeQuestion}
              activeQuestionNumber={activeQuestionNumber}
              activePageQuestions={activePageQuestions}
              validateNextQuestion={validateNextQuestion}
              translatedErrors={translatedErrors}
              prefill={prefill?.[question]}
              errors={errors}
              setValue={setValue}
            />
          </Question>
        ))}
      <Flex justifyContent="space-between" flexWrap="wrap" flexDirection={['column', 'row']}>
        {index !== 0 && (
          <Box mb={24} order={[1, 0]}>
            <ButtonArrow
              type="button"
              text={i18n.t('prevQuestions')}
              reversed
              transparent
              onClick={() => {
                prevPage();
                window.scrollTo(0, 0);
              }}
            />
          </Box>
        )}
        {!isLast && nextPageBtn()}
        {isLast && (
          <Box mb={24} order={[0, 1]}>
            <ButtonArrow type="submit" text={i18n.t('finishQuestionnaire')} />
            {hasError && (
              <Text mt={10} fontSize={12}>
                {i18n.t('invalidForm')}
              </Text>
            )}
          </Box>
        )}
      </Flex>
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
  activePage: 1,
  isActive: false,
  isLast: false,
};

export default FormPage;
