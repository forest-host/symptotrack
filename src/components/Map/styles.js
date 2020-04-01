import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const SMap = styled.div`
  .leaflet-container {
    position: absolute;
    top: ${px2rem(80)};
    z-index: 0;
    height: calc(100% - 80px);
    width: 100%;

    svg {
      width: 100%;
      height: 100%;
      min-width: ${px2rem(25)};
      min-height: ${px2rem(25)};
      max-width: ${px2rem(100)};
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
