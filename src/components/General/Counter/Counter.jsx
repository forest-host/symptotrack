import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatNumber } from '../../../utils';

// Styling
import SCounter from './styles';
import { Heading } from '../../styles';

const Counter = ({ number, lang, string }) => (
  <SCounter bg="orange">
    <Heading.H3 color="black">
      {formatNumber(number, lang)} {string}
    </Heading.H3>
  </SCounter>
);

Counter.propTypes = {
  number: PropTypes.number.isRequired,
  lang: PropTypes.string,
  string: PropTypes.string,
};

Counter.defaultProps = {
  lang: 'nl',
  string: 'mensen',
};

export default Counter;
