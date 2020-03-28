import styled, { css } from '@xstyled/styled-components';
import { px2rem, media } from '../../utils';
import { Box } from './Flex';

const InfoSection = styled(Box)`
  position: relative;
  z-index: 0;

  ${({ shape }) =>
    shape &&
    css`
      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: ${px2rem(-35)};
        left: ${px2rem(-45)};
        width: ${px2rem(90)};
        height: ${px2rem(90)};
        background: url('/static/icons/circle-orange.svg');
        background-size: contain;
        animation: float 3s ease-in-out infinite;
        pointer-events: none;

        ${media.small`
          top: ${px2rem(-80)};
          left: ${px2rem(-90)};
          width: ${px2rem(180)};
          height: ${px2rem(180)};
        `}
      }
      ${shape === 'topRight' &&
        css`
          &:after {
            left: inherit;
            right: ${px2rem(-45)};

            ${media.small`
              left: inherit;
              right: ${px2rem(-90)};
            `}
          }
        `}
    `}

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default InfoSection;
