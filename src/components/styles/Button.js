import styled, { css } from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const Button = styled.button`
  padding: ${px2rem(16)};
  background-color: blue;
  color: white;
  font-weight: bold;
  font-family: heading;
  line-height: ${px2rem(24)};
  border: 0;
  outline: 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover,
  &:focus {
    background-color: black;
  }

  &:active {
    background-color: orange;
    color: black;
  }

  ${({ transparent }) =>
    transparent &&
    css`
      background-color: transparent;
      border: 2px solid;
      border-color: blue;
      color: blue;

      &:hover,
      &:focus {
        background-color: transparent;
      }
    `}

  ${({ noStyle }) =>
    noStyle &&
    css`
      padding: 0;
      background: 0;
      text-align: inherit;
      color: inherit;

      &:hover,
      &:active,
      &:focus {
        background-color: inherit;
      }
    `}
`;

export default Button;
