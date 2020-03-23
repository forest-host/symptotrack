import styled from 'styled-components';
import { compose, space, layout, typography, color, flexbox } from 'styled-system';

export const Box = styled('div')(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  (props) => props.css,
  compose(space, layout, color, flexbox)
);

export const Text = styled('div')(compose(typography, space, color));

export const Flex = styled(Box)({
  display: 'flex',
});
