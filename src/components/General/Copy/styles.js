import styled from '@xstyled/styled-components';
import { px2rem } from '../../../utils';
import { Flex } from '../../styles';

const SCopy = styled(Flex)`
  position: relative;

  input {
    padding: ${px2rem(10, 40, 10, 15)};
    width: 100%;
    border: 2px solid;
    border-color: blue;
    border-radius: 4px;
    background: 0;
    outline: none;
    color: blue;
    cursor: pointer;

    &:focus {
      border-color: orange;
    }

    &::placeholder {
      color: blue;
    }
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${px2rem(32)};
    height: ${px2rem(32)};
  }

  span {
    position: absolute;
    bottom: ${px2rem(-20)};
  }
`;

export default SCopy;
