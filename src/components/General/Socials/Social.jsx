import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../../Icon';

const Social = ({ name, color, size }) => {
  switch (name) {
    case 'facebook':
      return <Icon icon="FACEBOOK" color={color} viewBox="0 0 496 493" size={size} />;
    case 'instagram':
      return <Icon icon="INSTAGRAM" color={color} viewBox="0 0 450 449" size={size} />;
    case 'twitter':
      return <Icon icon="TWITTER" color={color} viewBox="0 0 512 416" size={size} />;
    default:
      break;
  }
};

Social.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

Social.defaultProps = {
  color: 'lightGreen',
  size: 16,
};

export default Social;
