import styled, { css } from '@xstyled/styled-components';

const StyledIcon = styled.svg`
  flex: none;
  transition: fill 0.25s;

  &:hover {
    fill: ${(props) => (props.hover ? props.hover : '')};
  }

  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}

  ${(props) =>
    props.rotate
      ? css`
          transform: rotate(${props.rotate}deg);
        `
      : css``}
`;

export default StyledIcon;
