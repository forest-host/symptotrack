import styled, { css } from '@xstyled/styled-components';
import { Button } from '../../styles';
import { px2rem } from '../../../utils';

const SButtonArrow = styled(Button)`
  padding-right: ${px2rem(23)};

  svg {
    margin-left: ${px2rem(10)};
    transition: transform 0.3s ease, fill 0.3s ease;
  }

  &:hover,
  &:focus {
    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    svg {
      fill: black;
    }
  }

  ${({ reversed }) =>
    reversed &&
    css`
      padding-right: ${px2rem(15)};

      svg {
        margin-left: ${px2rem(0)};
        margin-right: ${px2rem(10)};
      }

      &:hover,
      &:focus {
        svg {
          transform: translateX(-3px) rotate(180deg);
        }
      }
    `}
`;

export default SButtonArrow;
