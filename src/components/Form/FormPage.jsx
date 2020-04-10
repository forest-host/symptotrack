import React, { useState, useEffect } from 'react';
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
  setActiveQuestionNumber,
  activePageQuestionNumber,
  setActivePageQuestionNumber,
  activeQuestion,
  validateNextQuestion,
  groups,
  isActive,
  isLast,
  keyPressActive,
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

  const [activePageQuestions, setActivePageQuestions] = useState(
    Object.keys(groups[activePageKey].questions)
  );

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
    if (activeQuestionNumber - 1 === answerOffset) {
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
              setActiveQuestionNumber={setActiveQuestionNumber}
              activePageQuestionNumber={activePageQuestionNumber}
              setActivePageQuestionNumber={setActivePageQuestionNumber}
              activePageQuestions={activePageQuestions}
              validateNextQuestion={validateNextQuestion}
              keyPressActive={keyPressActive}
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
