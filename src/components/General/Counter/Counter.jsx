import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatNumber } from '../../../utils';

// Styling
import SCounter from './styles';
import { Heading } from '../../styles';

const Counter = ({ number, lang }) => (
  <SCounter bg="orange">
    <Heading.H3 color="black">{formatNumber(number, lang)} mensen</Heading.H3>
  </SCounter>
);

Counter.propTypes = {
  number: PropTypes.number.isRequired,
  lang: PropTypes.string,
};

Counter.defaultProps = {
  lang: 'nl',
};

export default Counter;
