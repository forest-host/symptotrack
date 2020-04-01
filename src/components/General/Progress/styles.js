import styled from '@xstyled/styled-components';
import { px2rem, media } from '../../../utils';
import { Box } from '../../styles';

const SProgress = styled(Box)`
  height: ${px2rem(16)};

  > div {
    height: 100%;
    transition: width 0.3s ease;
  }

  ${media.smallOnly`
    width: calc(100% + 30px);
    margin-left: ${px2rem(-15)};
  `}
`;

export default SProgress;
