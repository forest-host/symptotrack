import styled, { css } from '@xstyled/styled-components';
import { space } from 'styled-system';
import { media } from '../../utils';
import theme from '../../theme';

const HR = styled.hr`
  ${space};
  width: 100%;
  border: none;
  border-bottom: 2px solid;
  border-color: ${({ color }) => (color ? theme.colors[color] : theme.colors.lightGreen)};

  ${({ smallOnly }) =>
    smallOnly &&
    css`
      ${media.small`
      display: none;
    `}
    `}
`;

HR.defaultProps = {
  my: 0,
};

export default HR;
