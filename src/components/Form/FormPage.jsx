import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n } from '../../i18n';

// Components
import Fields from './Fields';
import ButtonArrow from '../General/ButtonArrow';

// Styling
import { SFormPage } from './styles';
import { Box, Flex } from '../styles';

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
  prefill,
}) => {
  const watchArray = [];
  questions &&
    Object.keys(questions).map((question) => {
      questions[question]?.conditions?.map((q) => {
        watchArray.push(q.question);
      });
    });

  const watchFields = watch(watchArray);

  const validateNextPage = () => {
    nextPage();
    window.scrollTo(0, 0);
  };

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
            prefill={prefill?.[question]}
            errors={errors}
          />
        ))}
      <Flex justifyContent="space-between" flexWrap="wrap">
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
        {!isLast && (
          <Box mb={24} order={[0, 1]}>
            <ButtonArrow
              type="button"
              text={i18n.t('nextQuestions')}
              onClick={() => validateNextPage()}
            />
          </Box>
        )}
        {isLast && (
          <Box mb={24} order={[0, 1]}>
            <ButtonArrow type="submit" text={i18n.t('finishQuestionnaire')} />
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
  isActive: false,
  isLast: false,
};

export default FormPage;
