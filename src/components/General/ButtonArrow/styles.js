import styled from '@xstyled/styled-components';
import { Button } from '../../styles';
import { px2rem } from '../../../utils';

const SButtonArrow = styled(Button)`
  padding-right: ${px2rem(23)};

  svg {
    margin-left: ${px2rem(10)};
    transition: transform 0.3s ease, fill 0.3s ease;
  }

  &:hover {
    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    svg {
      fill: black;
    }
  }
`;

export default SButtonArrow;
