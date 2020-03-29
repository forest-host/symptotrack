import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n } from '../../../i18n';

// Components
import FieldHeader from './FieldHeader';
import Tooltip from '../../General/Tooltip';

// Styling
import { Box, Flex, Text } from '../../styles';
import STextInput from './styles';

const Email = forwardRef(
  ({ name, translation, required, error, width, placeholder, prefill, setValue }, ref) => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmError, setConfirmError] = useState(null);
    const [validEmail, setValidEmail] = useState('');

    return (
      <Flex mb={30} mt={[15, 0]} flexDirection="column">
        {(translation?.question || translation?.description) && (
          <FieldHeader
            name={name}
            question={translation?.question}
            description={translation?.description}
          />
        )}
        {translation?.tooltip && (
          <Tooltip question={translation.tooltip.question} answer={translation.tooltip.answer} />
        )}
        <Box width={width}>
          <STextInput
            type="email"
            value={email}
            placeholder={translation?.placeholder || placeholder}
            required={required}
            defaultValue={prefill}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            onKeyUp={() => {
              if (confirmEmail && email !== confirmEmail) {
                setConfirmError(i18n.t('emailError'));
                setValidEmail('');
              } else {
                setConfirmError(null);
                setValidEmail(confirmEmail);
                setValue(name, confirmEmail);
              }
            }}
          />
        </Box>
        <Box width={width} mt={24}>
          <STextInput
            type="email"
            value={confirmEmail}
            placeholder={translation?.placeholder_confirm || placeholder}
            required={required}
            autoComplete="off"
            onChange={(e) => setConfirmEmail(e.target.value.toLowerCase())}
            onKeyUp={() => {
              if (email !== confirmEmail) {
                setConfirmError(i18n.t('emailError'));
                setValidEmail('');
              } else {
                setConfirmError(null);
                setValidEmail(confirmEmail);
                setValue(name, confirmEmail);
              }
            }}
          />
        </Box>
        <input type="hidden" name={name} ref={ref} defaultValue={prefill} value={validEmail} />
        {(error || confirmError) && (
          <Text mt={10} fontSize={12}>
            {error.message || confirmError}
          </Text>
        )}
      </Flex>
    );
  }
);

Email.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
  prefill: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

Email.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
  prefill: null,
};

export default Email;
