import styled, { css } from '@xstyled/styled-components';
import { px2rem, media } from '../../utils';

const SMobileMenu = styled.nav`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  opacity: 0;
  pointer-events: none;
  background-color: beige;

  img {
    display: block;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${media.smallOnly`
        opacity: 1;
        pointer-events: inherit;
      `}
    `}
`;

export const SMenu = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
  text-align: center;

  li {
    margin: ${px2rem(0, 20)};

    a {
      text-decoration: none;
    }
  }
`;

export const SMenuItem = styled.li`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: ${px2rem(164)};
    height: ${px2rem(2)};
    background-color: lightGreen;
  }

  a {
    display: block;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      a {
        border-bottom: 2px solid;
        border-color: orange;
      }
    `}
`;

export default SMobileMenu;
