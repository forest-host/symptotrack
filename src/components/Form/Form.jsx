import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

// Components
import FormPage from './FormPage';

// Styling
import SForm from './styles';

const Form = ({ form, translations, translatedErrors, onSubmit }) => {
  const { handleSubmit, register, control, errors } = useForm();
  const { groups } = form || {};

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      {groups &&
        Object.keys(groups).map((group) => (
          <FormPage
            {...groups[group]}
            register={register}
            control={control}
            errors={errors}
            translations={translations}
            translatedErrors={translatedErrors}
          />
        ))}
      <button type="submit">Submit</button>
    </SForm>
  );
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
