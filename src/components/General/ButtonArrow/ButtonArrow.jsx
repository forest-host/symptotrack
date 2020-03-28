import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../../Icon';

// Styling
import SButtonArrow from './styles';

const ButtonArrow = ({ text, reversed, ...props }) => (
  <SButtonArrow reversed={reversed} {...props}>
    {!reversed && text}
    <Icon
      icon="ARROW_RIGHT"
      color="currentColor"
      viewBox="0 0 10 8"
      size={11}
      rotate={reversed && 180}
    />
    {reversed && text}
  </SButtonArrow>
);

ButtonArrow.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonArrow;
