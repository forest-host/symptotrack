import React from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';

// Styling
import SProgress from './styles';
import { Box, Text } from '../../styles';

const Progress = ({ percentage, string }) => (
  <Sticky>
    {({ style }) => (
      <Box style={style} css={{ zIndex: 999 }}>
        <SProgress bg="lightGreen">
          <Box width={`${percentage}%`} bg="orange" />
        </SProgress>
        <Text mt={10} textAlign="right" fontSize={12}>
          {`${percentage}%`} {string}
        </Text>
      </Box>
    )}
  </Sticky>
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
