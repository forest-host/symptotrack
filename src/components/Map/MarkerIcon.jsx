import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

// Utils
import { hex2rgba } from '../../utils';

// Styling
import theme from '../../theme';

const MarkerIcon = ({ total, totalSymptoms, filters, ...spot }) => {
  const data = [
    {
      title: 'Koorts',
      value: (filters?.length > 0 && filters.includes('fever') && spot.fever) || 0,
      color: hex2rgba('#1A1A1A', 0.7),
    },
    {
      title: 'Vermoeidheid',
      value: (filters?.length > 0 && filters.includes('fatigue') && spot.fatigue) || 0,
      color: hex2rgba('#1B42D8', 0.7),
    },
    {
      title: 'Droge hoest',
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

  if (percentage !== Infinity) {
    perc = percentage;
  } else if (!isNaN(percentage)) {
    perc = percentage;
  }

  return (
    <PieChart
      data={data}
      css={{
        width: `${perc * 10}px`,
        height: `${perc * 10}px`,
        maxHeight: 100,
        maxWidth: 100,
        transform: 'translateX(-40%) translateY(-40%)',
      }}
      viewBoxSize={[perc * 10, perc * 10]}
      /* injectSvg={() => (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          css={{
            fontFamily: theme.fonts.heading,
            fontSize: 16,
            fill: theme.colors.white,
            fontWeight: 900,
          }}
        >
          {spot.hits}
        </text>
      )}
      */
    />
  );
};

MarkerIcon.propTypes = {
  total: PropTypes.number,
};

MarkerIcon.defaultProps = {
  total: null,
};

export default MarkerIcon;
