import React from 'react';
import PieChart from 'react-minimal-pie-chart';

// Utils
import { hex2rgba } from '../../utils';

const MarkerIcon = ({ ...spot }) => {
  const data = [
    { title: 'Koorts', value: spot.fever, color: hex2rgba('#1A1A1A', 0.6) },
    { title: 'Droge hoest', value: spot.dry_cough, color: hex2rgba('#1B42D8', 0.6) },
    { title: 'Vermoeidheid', value: spot.fatigue, color: hex2rgba('#FFA015', 0.6) },
  ];

  return <PieChart data={data} />;
};

export default MarkerIcon;
