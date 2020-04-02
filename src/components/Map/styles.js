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

    .custom-icon {
      div > div {
        position: absolute;
        bottom: calc(100% - 10px);
        left: calc(50% + 5px);
        z-index: 2;
        background: white;
        white-space: nowrap;
        padding: ${px2rem(5, 10)};
        font-family: heading;
        font-weight: 900;
        font-size: ${px2rem(12)};
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
      }

      &:hover {
        div > div {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    svg {
      width: 100%;
      height: 100%;
      min-width: ${px2rem(25)};
      min-height: ${px2rem(25)};
      max-width: ${px2rem(100)};
      max-height: ${px2rem(100)};
      transition: all 0.3s ease;
    }

    ${media.mediumOnly`
      top: ${px2rem(50)};
      height: calc(100% - 50px);
    `}

    ${media.smallOnly`
      top: ${px2rem(186)};
      height: calc(100% - 186px);
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
  width: 100%;
  max-width: ${px2rem(535)};
  transform: translateX(-50%);
  text-align: center;

  ${media.mediumOnly`
    top: ${px2rem(70)};
  `}

  ${media.smallOnly`
    position: relative;
    top: 0;
  `}
`;

export default SMap;
