import { css, createGlobalStyle } from '@xstyled/styled-components';
import styledNormalize from 'styled-normalize';
import { px2rem, media } from '../../utils';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
  }

  body {
    font-family: body;
    background-color: beige;

    ${({ isOpen }) =>
      isOpen &&
      css`
        ${media.mediumDown`
          overflow: hidden;
        `}
      `}
  }

  main {
    z-index: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: heading;
  }

  p {
    font-size: ${px2rem(18)};
    line-height: ${px2rem(24)};
  }

  a {
    color: blue;

    &:hover {
      text-decoration: none;
    }
  }

  img {
    max-width: 100%;
  }

  select::-ms-expand {
    display: none;
  }

  .no-underline {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .accessibly-hidden {
    position: absolute;
    left: -999em;
  }

  .hide-for-small {
    ${media.smallOnly`
      display: none;
    `}
  }

  .show-for-small {
    display: none;

    ${media.smallOnly`
      display: block;
    `}
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: blue;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px blue, 0 0 5px blue;
    opacity: 1.0;

    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: blue;
    border-left-color: blue;
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

`;

export default GlobalStyle;
