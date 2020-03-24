import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
import Social from './Social';

// Styling
import { Box, Flex } from '../../styles';

const Socials = ({ items, color, size }) => (
  <Flex alignItems="center" mx={-12}>
    {items?.map(({ url, label, name }) => (
      <Box key={uuid()} mx={12}>
        <a href={url} target="_blank" aria-label={label} rel="noopener noreferrer">
          <Social name={name} color={color} size={size} />
        </a>
      </Box>
    ))}
  </Flex>
);

Socials.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

Socials.defaultProps = {
  color: 'lightGreen',
  size: 16,
};

export default Socials;
