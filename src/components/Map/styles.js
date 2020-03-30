import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const SMap = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  height: 100%;
  width: 100%;

  .leaflet-tile-container {
    height: ${px2rem(128)};
    width: ${px2rem(128)};

    canvas {
      margin-left: ${px2rem(64)};
      margin-top: ${px2rem(64)};
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
