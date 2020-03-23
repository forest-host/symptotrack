import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { Box } from './Flex';
import { breakpoints } from '../../theme';

function offset(margin) {
  let styles = '';
  if (typeof margin === 'number' || (typeof margin === 'object' && margin.length === 1)) {
    styles = css`
      margin-left: ${margin * 100}%;
    `;
  } else if (typeof margin === 'object') {
    styles = margin
      .filter((num) => typeof num === 'number')
      .map(
        (item, index) => css`
          @media screen and (min-width: ${`${breakpoints[index]}px`}) {
            margin-left: ${item * 100}%;
          }
        `
      );
  }
  return styles;
}

const Column = styled(Box)`
  ${space};
  ${(props) => (props.offset ? offset(props.offset) : css``)}
`;

export default Column;
