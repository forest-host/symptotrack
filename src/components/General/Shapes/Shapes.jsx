import React from 'react';

// Styling
import SShapes, { Shape } from './styles';

const Shapes = () => (
  <SShapes>
    <Shape src="/static/icons/circle-blue.svg" left="-100px" top="-100px" delay={0.2} />
    <Shape src="/static/icons/circle-blue.svg" right="10%" top="30px" delay={0.3} />
    <Shape src="/static/icons/circle-orange.svg" right="0" top="85px" />
  </SShapes>
);

export default Shapes;
