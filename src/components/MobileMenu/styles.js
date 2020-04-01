import styled, { css } from '@xstyled/styled-components';
import { px2rem, media } from '../../utils';

const SMobileMenu = styled.nav`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  opacity: 0;
  text-align: center;
  pointer-events: none;
  background-color: beige;

  img {
    display: block;
  }

  button {
    position: absolute;
    bottom: ${px2rem(20)};
    left: 0;
    right: 0;
    z-index: 1;
    margin: 0 auto;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${px2rem(150)};
    width: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 247, 235, 1) 75%);
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${media.mediumDown`
        opacity: 1;
        pointer-events: inherit;
      `}
    `}
`;

export const SMenu = styled.ul`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(0, 0, 50, 0)};
  list-style: none;
  text-align: center;
  overflow-y: scroll;

  li {
    margin: ${px2rem(0, 20)};

    a {
      text-decoration: none;
    }
  }

  ${media.mediumOnly`
    justify-content: center;
    height: 100%;
  `}
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
