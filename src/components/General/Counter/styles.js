import styled from '@xstyled/styled-components';
import { px2rem } from '../../../utils';
import { Box } from '../../styles';

const SCounter = styled(Box)`
  display: inline-block;
  padding: ${px2rem(9, 20)};
  border-radius: 4px;
`;

export default SCounter;
