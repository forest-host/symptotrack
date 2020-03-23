import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../../Icon';

// Styling
import SButtonArrow from './styles';

const ButtonArrow = ({ text }) => (
  <SButtonArrow>
    {text} <Icon icon="ARROW_RIGHT" color="lightGreen" viewBox="0 0 10 8" size={11} />
  </SButtonArrow>
);

ButtonArrow.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonArrow;
