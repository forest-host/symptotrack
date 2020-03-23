import React from 'react';
import PropTypes from 'prop-types';
import StyledIcon from './styles';

const Icon = ({ icon, size, color, hover, viewbox, rotate }) => (
  <StyledIcon
    width={`${size}px`}
    height={`${size}px`}
    viewBox={`${viewbox}`}
    fill={color || 'currentColor'}
    hover={hover}
    rotate={rotate}
  >
    <path d={icon} />
  </StyledIcon>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  hover: PropTypes.string,
  viewbox: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
  color: '',
  hover: '',
  viewbox: '0 0 100 100',
};

export default Icon;
