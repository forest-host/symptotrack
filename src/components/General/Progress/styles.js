import styled from '@xstyled/styled-components';
import { px2rem } from '../../../utils';
import { Box } from '../../styles';

const SProgress = styled(Box)`
  height: ${px2rem(16)};

  > div {
    height: 100%;
    transition: width 0.3s ease;
  }
`;

export default SProgress;
