import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../../Icon';

// Styling
import SHamburger from './styles';

const Hamburger = ({ onClick }) => (
  <SHamburger noStyle>
    <Icon icon="HAMBURGER" color="blue" viewBox="0 0 448 512" size={14} />
  </SHamburger>
);

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;
