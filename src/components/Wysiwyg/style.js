import styled from '@xstyled/styled-components';
import { Text } from '../styles';
import { px2rem, media } from '../../utils';

const Wysiwyg = styled(Text)`
  p {
    font-size: ${px2rem(16)};
    line-height: 1.5;
  }
  .button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    :hover {
    }
  }

  ul,
  ol {
    padding-left: ${px2rem(20)};
    line-height: 1.6;
    list-style: none;
    > li {
      &:before {
        content: '•';
        display: inline-block;
        width: ${px2rem(20)};
        margin-left: ${px2rem(-20)};
        vertical-align: baseline;
        font-size: ${px2rem(18)};
      }
    }
  }

  ol {
    counter-reset: item;
    > li {
      &:before {
        content: counter(item);
        counter-increment: item;
      }
    }
  }

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }

  ${media.small`
    p{
      font-size: ${px2rem(18)};
      line-height: 1.6;
    }
    ul, ol{
      font-size: ${px2rem(18)};
    }
  `}
`;

export const WysyhtmlBox = styled.div`
  > ${Wysiwyg}:first-child {
    > *:first-child {
      margin-top: 0;
    }
  }
`;

export default Wysiwyg;
