import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

// Utils
import { numberToFixed } from '../../utils';

// Components
import FormPage from './FormPage';

// Styling
import SForm from './styles';

const Form = ({ form, translations, translatedErrors, onSubmit, setPercentage }) => {
  const { handleSubmit, register, control, errors, watch, formState } = useForm();
  const { groups } = form || {};
  const watchAllFields = watch();
  const [activePage, setActivePage] = useState(1);

  Object.size = (obj) => {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

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
            key={group}
            register={register}
            control={control}
            errors={errors}
            translations={translations}
            translatedQuestions={translations?.questions}
            translatedGroup={translations?.[group]}
            translatedErrors={translatedErrors}
            watch={watch}
            isActive={activePage === i + 1}
            {...groups[group]}
          />
        ))}
      <button type="submit">Submit</button>
    </SForm>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setPercentage: PropTypes.func.isRequired,
};

export default Form;
