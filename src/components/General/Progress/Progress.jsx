import React from 'react';
import PropTypes from 'prop-types';

// Styling
import SProgress from './styles';
import { Box, Text } from '../../styles';

const Progress = ({ percentage, string }) => (
  <>
    <SProgress bg="lightGreen">
      <Box width={`${percentage}%`} bg="orange" />
    </SProgress>
    <Text mt={10} textAlign="right" fontSize={12}>
      {`${percentage}%`} {string}
    </Text>
  </>
);

Progress.propTypes = {
  percentage: PropTypes.number,
  string: PropTypes.string,
};

Progress.defaultProps = {
  percentage: 43,
  string: 'afgerond',
};

export default Progress;
