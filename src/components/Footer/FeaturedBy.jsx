import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { withTranslation } from '../../i18n';

// Styling
import { Text } from '../styles';

const FeaturedBy = ({ t }) => (
  <Text as="span">
    {t('by')}{' '}
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
      href="https://www.forest.host"
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

FeaturedBy.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(FeaturedBy);
