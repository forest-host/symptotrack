import React from 'react';
import PropTypes from 'prop-types';
import StyledIcon from './styles';
import ICONS from '../../public/static/icons';
import theme from '../../theme';

const Icon = ({ className, icon, size, color, hover, viewBox, rotate, opacity, mr }) => (
  <StyledIcon
    width={`${size}px`}
    height={`${size}px`}
    viewBox={`${viewBox}`}
    fill={theme.colors[color] || color}
    hover={hover}
    rotate={rotate}
    opacity={opacity}
    mr={mr}
    className={className || undefined}
  >
    <path d={ICONS[icon]} />
  </StyledIcon>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  hover: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
  color: '',
  hover: '',
  viewBox: '0 0 100 100',
  className: '',
};

export default Icon;
