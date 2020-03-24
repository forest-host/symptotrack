import { css } from 'styled-components';
import { breakpoints } from '../theme';

const labels = ['small', 'medium', 'large'];

const mediaMin = breakpoints.reduce((acc, cur, i) => {
  acc[labels[i]] = (...args) => css`
    @media (min-width: ${cur}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const mediaMax = breakpoints.reduce((acc, cur, i, sizes) => {
  acc[`${labels[i]}Down`] = (...args) => css`
    @media (max-width: ${cur - 1}px) {
      ${css(...args)};
    }
  `;
  acc[`${labels[i]}Only`] = (...args) =>
    i > 0
      ? css`
          @media screen and (min-width: ${sizes[i - 1]}px) and (max-width: ${cur - 1}px) {
            ${css(...args)};
          }
        `
      : css`
          @media screen and (max-width: ${cur - 1}px) {
            ${css(...args)};
          }
        `;

  return acc;
}, {});

const media = { ...mediaMin, ...mediaMax };

/* Write you media queries like this:

   ${media.mediumDown`
      background: red;
   `}

*/

export default media;
