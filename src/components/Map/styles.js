import styled from '@xstyled/styled-components';
import { px2rem, media } from '../../utils';
import { Box } from '../styles';

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
      max-height: ${px2rem(100)};
    }

    ${media.smallOnly`
      top: ${px2rem(100)};
      height: calc(100% - 100px);
    `}
  }
`;

export const SMyLocation = styled.div`
  position: relative;

  .leaflet-container {
    height: ${px2rem(250)};
  }
`;

export const SLegend = styled(Box)`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: ${px2rem(100)};
  transform: translateX(-50%);
  text-align: center;

  ${media.smallOnly`
    position: relative;
    top: 0;
  `}
`;

export default SMap;
