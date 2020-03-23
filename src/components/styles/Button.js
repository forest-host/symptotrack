import styled from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const Button = styled.button`
  padding: ${px2rem(16)};
  background-color: blue;
  color: lightGreen;
  font-weight: bold;
  font-family: heading;
  line-height: ${px2rem(24)};
  border: 0;
  outline: 0;
  border-radius: 4px;
  cursor: pointer;
`;

export default Button;
