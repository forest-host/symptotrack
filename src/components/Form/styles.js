import styled, { css } from '@xstyled/styled-components';

const SForm = styled.form`
  fieldset {
    padding: 0;
    border: 0;
  }
`;

export const Question = styled.div`
  position: relative;
  top: 0%;
  ${({ isActive }) =>
    isActive &&
    css`
      animation: fadein 0.3s ease-in both;
      @keyframes fadein {
        from {
          opacity: 0;
          transform: translate3d(0, -20%, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    `}
  ${({ isActive }) =>
    !isActive &&
    css`
      visibility: hidden;
      height: 0;
    `}
`;

export const SFormPage = styled.div`
  ${({ isActive }) =>
    !isActive &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      opacity: 0;
      visibility: hidden;
    `}
`;

export default SForm;
