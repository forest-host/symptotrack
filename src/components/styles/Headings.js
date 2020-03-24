import styled from 'styled-components';
import { color, fontWeight, space, textAlign } from 'styled-system';
import { px2rem, media } from '../../utils';

const H1 = styled.h1`
  ${color};
  ${textAlign};
  ${space};
  font-weight: 900;
  font-size: ${px2rem(40)};
  line-height: ${px2rem(40)};
  ${media.small`
    font-size: ${px2rem(70)};
    line-height: ${px2rem(70)};
  `}
`;

const H2 = styled.h2`
  ${color};
  ${textAlign};
  ${space};
  font-weight: 900;
  font-size: ${px2rem(32)};
  line-height: ${px2rem(40)};
  ${media.small`
    font-size: ${px2rem(40)};
    line-height: ${px2rem(40)};
  `};
`;

const H3 = styled.h3`
  ${color};
  ${textAlign};
  ${space};
  font-weight: 900;
  font-size: ${px2rem(24)};
  line-height: ${px2rem(24)};
  ${media.small`
    font-size: ${px2rem(24)};
    line-height: ${px2rem(24)};
  `}
`;

const H4 = styled.h4`
  ${color};
  ${textAlign};
  ${space};
  font-weight: 900;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(22)};
  ${media.small`
    font-size: ${px2rem(18)};
    line-height: ${px2rem(22)};
  `}
`;

const H5 = styled.h5`
  ${color};
  ${textAlign};
  ${space};
  ${fontWeight};
  font-size: ${px2rem(18)};
  line-height: ${px2rem(22)};
  ${media.small`
    font-size: ${px2rem(24)};
    line-height: ${px2rem(26)};
  `}
`;

const H6 = styled.h6`
  ${color};
  ${textAlign};
  ${space};
  ${fontWeight};
  font-size: ${px2rem(16)};
  line-height: 1;
  ${media.small`
    font-size: ${px2rem(18)};
    line-height: 1;
  `}
`;

const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};

export default Heading;
