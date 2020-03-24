import styled from '@xstyled/styled-components';
import { px2rem, media } from '../../../utils';

const SShapes = styled.div`
  display: none;
  position: relative;

  ${media.small`
    display: block;
  `}
`;

export const Shape = styled.img`
  position: absolute;
  z-index: -1;
  top: ${({ top }) => top || 'initial'};
  left: ${({ left }) => left || 'initial'};
  right: ${({ right }) => right || 'initial'};
  bottom: ${({ bottom }) => bottom || 'initial'};
  width: ${px2rem(180)};
  height: ${px2rem(180)};
  animation: float 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => `${delay}s` || '0s'};
  pointer-events: none;

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

export default SShapes;
