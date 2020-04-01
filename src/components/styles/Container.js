import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { px2rem, media } from '../../utils';

const Container = styled.div`
  ${space};
  width: 100%;
  max-width: ${({ theme }) => theme.gridSize};

  ${({ relative }) =>
    relative &&
    css`
      position: relative;
      z-index: 1;
    `}

  ${({ noPadding }) =>
    !noPadding &&
    css`
      padding-left: ${px2rem(30)};
      padding-right: ${px2rem(30)};

      ${media.smallOnly`
        padding-left: ${px2rem(15)};
        padding-right: ${px2rem(15)};
      `}
    `}
`;
Container.defaultProps = {
  mx: 'auto',
  px: '0',
};

export const Row = styled.div`
  ${space};
  width: 100%;
  max-width: 1180px;

  ${({ smallFullWidth }) =>
    smallFullWidth &&
    css`
      ${media.smallOnly`
        width: calc(100% + 30px);
      `}
    `}
`;
Row.defaultProps = {
  mx: 'auto',
};

export default Container;
