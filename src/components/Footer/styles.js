import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const SFooter = styled.footer`
  position: relative;
  background-color: black;
  color: lightGreen;

  &:after {
    content: '';
    position: absolute;
    top: ${px2rem(-30)};
    right: ${px2rem(-30)};
    width: ${px2rem(90)};
    height: ${px2rem(90)};
    background: url('/static/icons/circle-orange.svg');
  }
`;

export const SFooterMenu = styled.ul`
  margin: ${px2rem(0, -12)};
  padding: 0;
  list-style: none;

  li {
    display: inline-block;
    margin: ${px2rem(6, 12)};
  }
`;

export default SFooter;
