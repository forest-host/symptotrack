import styled from '@xstyled/styled-components';
import { Box } from '../../styles';
import { px2rem } from '../../../utils';
import theme from '../../../theme';

const STooltip = styled(Box)`
  position: relative;

  span {
    text-decoration: underline;
    cursor: pointer;
  }

  > div {
    position: absolute;
    z-index: 1;
    top: ${px2rem(35)};
    left: 0;
    max-width: ${px2rem(350)};

    &:before {
      content: '';
      position: absolute;
      top: ${px2rem(-15)};
      left: ${px2rem(30)};
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid ${theme.colors.lightGreen};
    }

    button {
      position: absolute;
      top: ${px2rem(7)};
      right: ${px2rem(10)};
    }
  }
`;

export default STooltip;
