import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';

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
  };

  // Navigate to previous page
  const prevPage = () => {
    setActivePage(activePage - 1);
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
            triggerValidation={triggerValidation}
            isActive={activePage === i + 1}
            isLast={i + 1 === pageAmount}
            nextPage={nextPage}
            prevPage={prevPage}
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
