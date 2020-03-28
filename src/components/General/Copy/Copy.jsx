import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n } from '../../../i18n';

// Component
import Icon from '../../Icon';

// Styling
import SCopy from './styles';
import { Button, Text } from '../../styles';

const Copy = ({ value }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef(null);

  const onClick = (e) => {
    inputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(true);
  };

  return (
    <SCopy my={20} justifyContent="space-between" onClick={onClick}>
      <input as="input" value={value} readOnly ref={inputRef} />
      <Button type="button">
        <Icon icon="COPY" viewBox="0 0 448 512" color="white" size={15} />
      </Button>
      {copySuccess && (
        <Text as="span" fontSize={12}>
          {i18n.t('copied')}
        </Text>
      )}
    </SCopy>
  );
};

Copy.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Copy;
