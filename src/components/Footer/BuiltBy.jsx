import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../../i18n';

// Styling
import { Text } from '../styles';

const BuiltBy = ({ by }) => (
  <Text as="span">
    {by}{' '}
    <Text
      as="a"
      fontWeight="700"
      color="lightGreen"
      href="https://www.gohike.nl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Hike
    </Text>
    ,{' '}
    <Text
      as="a"
      fontWeight="700"
      color="lightGreen"
      href="https://forest.host"
      target="_blank"
      rel="noopener noreferrer"
    >
      Forest
    </Text>{' '}
    &{' '}
    <Text
      as="a"
      fontWeight="700"
      color="lightGreen"
      href="https://www.greenberry.nl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Greenberry
    </Text>
  </Text>
);

BuiltBy.propTypes = {
  by: PropTypes.string,
};

BuiltBy.defaultProps = {
  by: 'Door',
};

export default withTranslation('common')(BuiltBy);
