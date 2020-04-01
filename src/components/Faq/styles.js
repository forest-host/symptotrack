import styled, { css } from '@xstyled/styled-components';
import { Box } from '../styles';

const SFaqSection = styled.div`
  background-color: white;
  border: 2px solid;
  border-color: orange;
`;

export const SFaqItem = styled(Box)`
  h4 {
    white-space: initial;
  }

  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom: 2px solid;
      border-color: orange;
    `}
`;

export default SFaqSection;
