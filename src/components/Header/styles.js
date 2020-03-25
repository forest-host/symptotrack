import styled, { css } from '@xstyled/styled-components';
import { px2rem, media } from '../../utils';

const SHeader = styled.header`
  position: relative;
  border-bottom: 2px solid blue;
  background-color: beige;

  img {
    display: block;
  }
`;

export const SMenu = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;

  li {
    margin: ${px2rem(0, 20)};

    a {
      text-decoration: none;
    }

    ${media.mediumOnly`
      margin: ${px2rem(0, 10)};
    `}
  }

  ${media.smallOnly`
    display: none;
  `}
`;

export const SMenuItem = styled.li`
  ${({ isActive }) =>
    isActive &&
    css`
      a {
        border-bottom: 2px solid;
        border-color: orange;
      }
    `}
`;

export default SHeader;
