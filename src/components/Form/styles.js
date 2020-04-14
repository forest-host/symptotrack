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
