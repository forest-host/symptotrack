import styled from '@xstyled/styled-components';
import { px2rem, media } from '../../../utils';
import { Button } from '../../styles';

const SHamburger = styled(Button)`
  position: absolute;
  left: ${px2rem(15)};

  ${media.small`
    display: none;
  `}
`;

export default SHamburger;
