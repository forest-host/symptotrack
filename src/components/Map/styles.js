import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const SMap = styled.div`
  position: absolute;
  top: ${px2rem(80)};
  z-index: 0;
  height: calc(100% - 80px);
  width: 100%;

  .leaflet-tile-container {
    height: ${px2rem(128)};
    width: ${px2rem(128)};

    .chartjs-render-monitor {
      margin-left: ${px2rem(64)};
      margin-top: ${px2rem(64)};
      pointer-events: all;
    }
  }
`;

export const SMyLocation = styled.div`
  position: relative;

  .leaflet-container {
    height: ${px2rem(250)};
  }
`;

export default SMap;
