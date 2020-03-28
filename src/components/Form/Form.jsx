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
    control,
    errors,
    watch,
    formState,
    triggerValidation,
  } = useForm();
  const { groups } = form || {};
  const watchAllFields = watch();
  const pageAmount = Object.size(groups);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setCount({ currentPage: activePage, total: pageAmount });
  }, [activePage]);

  useEffect(() => {
    const fieldAmount = Object.size(watchAllFields);
    const dirtyField = formState?.dirtyFields?.size;

    setPercentage(numberToFixed((100 * dirtyField) / fieldAmount));
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
            control={control}
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
