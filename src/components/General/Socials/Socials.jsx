import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
import Icon from '../../Icon';

// Styling
import { Box, Flex } from '../../styles';

const Socials = ({ items, color, size }) => (
  <Flex alignItems="center" mx={-12}>
    {items?.map(({ url, target, label, icon }) => (
      <Box key={uuid()} mx={12}>
        <a href={url} target={target} aria-label={label} rel="noopener noreferrer">
          <Icon icon={icon?.name} color={color} viewBox={icon?.viewBox} size={size} />
        </a>
      </Box>
    ))}
  </Flex>
);

Socials.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

Socials.defaultProps = {
  color: 'lightGreen',
  size: 16,
};

export default Socials;
