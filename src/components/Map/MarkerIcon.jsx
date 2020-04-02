import React from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';

// Utils
import { hex2rgba } from '../../utils';

const MarkerIcon = ({ total, filters, ...spot }) => {
  const data = [
    {
      title: 'Koorts',
      value: filters?.length > 0 && filters.includes('fever') && spot.fever,
      color: hex2rgba('#1A1A1A', 0.7),
    },
    {
      title: 'Vermoeidheid',
      value: filters?.length > 0 && filters.includes('fatigue') && spot.fatigue,
      color: hex2rgba('#1B42D8', 0.7),
    },
    {
      title: 'Droge hoest',
      value: filters?.length > 0 && filters.includes('dry_cough') && spot.dry_cough,
      color: hex2rgba('#FFA015', 0.7),
    },
  ];

  const percentage = ((100 * spot.hits) / total).toFixed(3);

  return (
    <PieChart
      data={data}
      css={{
        width: `${percentage * 10}px`,
        height: `${percentage * 10}px`,
        maxHeight: 100,
        maxWidth: 100,
        transform: 'translateX(-27%) translateY(-46%)',
      }}
      viewBoxSize={[percentage * 10, percentage * 10]}
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
