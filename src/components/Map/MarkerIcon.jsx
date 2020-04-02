import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

// Utils
import { hex2rgba } from '../../utils';
import { i18n } from '../../i18n';

// Styling
import { Box, Text } from '../styles';

const MarkerIcon = ({ total, totalSymptoms, filters, ...spot }) => {
  const data = [
    {
      title: i18n.t('map:map:symptoms:fever'),
      value: (filters?.length > 0 && filters.includes('fever') && spot.fever) || 0,
      color: hex2rgba('#1A1A1A', 0.7),
    },
    {
      title: i18n.t('map:map:symptoms:fatigue'),
      value: (filters?.length > 0 && filters.includes('fatigue') && spot.fatigue) || 0,
      color: hex2rgba('#1B42D8', 0.7),
    },
    {
      title: i18n.t('map:map:symptoms:dry_cough'),
      value: (filters?.length > 0 && filters.includes('dry_cough') && spot.dry_cough) || 0,
      color: hex2rgba('#FFA015', 0.7),
    },
  ];

  let markerTotal = 0;
  filters?.length > 0 &&
    filters?.map((filter) => {
      if (filters.includes(filter)) {
        markerTotal += spot[filter];
      }
    });

  const percentage = ((100 * markerTotal) / totalSymptoms).toFixed(3);
  let perc = 0;

  if (percentage !== 'Infinity' && !isNaN(percentage)) {
    perc = percentage;
  }

  return (
    <>
      <PieChart
        data={data}
        css={{
          width: `${perc * 10}px`,
          height: `${perc * 10}px`,
          maxHeight: 100,
          maxWidth: 100,
          transform: 'translateX(-40%) translateY(-40%)',
        }}
        viewBoxSize={[perc, perc]}
      >
        <Box>
          {filters?.length > 0 && filters.includes('fever') && spot.fever !== 0 && (
            <Text as="span" color="black">{`${spot.fever}x ${i18n.t(
              'map:map:symptoms:fever'
            )}`}</Text>
          )}
          {filters?.length > 0 && filters.includes('fever') && spot.fever !== 0 && <br />}
          {filters?.length > 0 && filters.includes('fatigue') && spot.fatigue !== 0 && (
            <Text as="span" color="blue">{`${spot.fatigue}x ${i18n.t(
              'map:map:symptoms:fatigue'
            )}`}</Text>
          )}
          {filters?.length > 0 && filters.includes('fatigue') && spot.fatigue !== 0 && <br />}
          {filters?.length > 0 && filters.includes('dry_cough') && spot.dry_cough !== 0 && (
            <Text as="span" color="orange">{`${spot.dry_cough}x ${i18n.t(
              'map:map:symptoms:dry_cough'
            )}`}</Text>
          )}
        </Box>
      </PieChart>
    </>
  );
};

MarkerIcon.propTypes = {
  total: PropTypes.number,
};

MarkerIcon.defaultProps = {
  total: null,
};

export default MarkerIcon;
