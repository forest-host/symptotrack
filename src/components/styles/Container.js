import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { px2rem } from '../../utils';

const Container = styled.div`
  ${space};
  width: 100%;
  max-width: ${(props) => props.theme.gridSize};
  ${(props) =>
    !props.noPadding &&
    css`
      padding-left: ${px2rem(15)};
      padding-right: ${px2rem(15)};
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
  margin-left: auto;
  margin-right: auto;
`;

export default Container;
