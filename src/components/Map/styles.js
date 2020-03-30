import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const SMap = styled.div`
  position: relative;
  height: ${px2rem(600)};

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
