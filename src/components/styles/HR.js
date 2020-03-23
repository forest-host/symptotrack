import styled from '@xstyled/styled-components';
import { space } from 'styled-system';
import theme from '../../theme';

const HR = styled.hr`
  ${space};
  border: none;
  border-bottom: 2px solid;
  border-color: ${({ color }) => (color ? theme.colors[color] : theme.colors.lightGreen)};
`;

HR.defaultProps = {
  my: 0,
};

export default HR;
