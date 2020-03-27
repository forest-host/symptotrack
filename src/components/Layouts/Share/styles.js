import styled from '@xstyled/styled-components';
import { Box } from '../../styles';
import { px2rem } from '../../../utils';

const SShare = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 4px;
`;

export default SShare;
