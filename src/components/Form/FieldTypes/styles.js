import styled from '@xstyled/styled-components';
import Slider from 'react-rangeslider';
import { px2rem } from '../../../utils';
import { Box, Flex, Heading } from '../../styles';
import theme from '../../../theme';

const STextInput = styled.input`
  padding: ${px2rem(10, 15)};
  width: 100%;
  border: 2px solid;
  border-color: blue;
  border-radius: 4px;
  background: 0;
  outline: none;
  color: blue;

  &::placeholder {
    color: blue;
  }

  &:not(:placeholder-shown) {
    background-color: white;
  }
`;

export const SLabel = styled(Heading.H3)`
  font-weight: 900;
  font-family: heading;
  color: black;
`;

export const SRadioButton = styled(Box)`
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ label {
      background-color: orange;
      color: black;
    }
  }

  label {
    display: block;
    padding: ${px2rem(8, 16)};
    background-color: blue;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: black;
    }
  }
`;

export const SSelect = {
  control: () => ({
    display: 'flex',
    padding: '5px 0',
    border: '2px solid',
    borderColor: theme.colors.blue,
    borderRadius: 4,
    background: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    position: 'relative',
    marginTop: -2,
    background: 0,
    boxShadow: 0,
    border: '2px solid',
    borderColor: theme.colors.blue,
    borderRadius: 4,
  }),
  menuList: (provided) => ({
    ...provided,
    '::-webkit-scrollbar': {
      width: 12,
      borderRadius: 10,
      border: '3px solid',
      borderColor: theme.colors.beige,
      background: theme.colors.lightGreen,
    },
    '::-webkit-scrollbar-thumb': {
      height: 20,
      background: theme.colors.blue,
      borderLeft: '3px solid',
      borderRight: '3px solid',
      borderColor: theme.colors.beige,
      borderRadius: 5,
    },
  }),
  option: (provided) => ({
    ...provided,
    fontFamily: theme.fonts.heading,
    fontWeight: '700',
    color: theme.colors.blue,
    ':hover': {
      background: theme.colors.lightGreen,
    },
    ':active': {
      background: theme.colors.lightGreen,
    },
    ':focus': {
      background: theme.colors.lightGreen,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
  }),
  multiValue: (provided) => ({
    ...provided,
    padding: 5,
    borderRadius: 4,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white,
    '> div': {
      color: theme.colors.white,
    },
  }),
};

export const SRangeSlider = styled(Slider)`
  display: block;
  position: relative;
  height: ${px2rem(8)};
  background-color: lightGreen;
  border-radius: 4px;
  touch-action: none;

  .rangeslider__fill {
    display: block;
    height: ${px2rem(8)};
    background-color: blue;
    border-radius: 4px;
  }

  .rangeslider__handle {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: ${px2rem(22)};
    height: ${px2rem(22)};
    background-color: blue;
    border-radius: 50%;
    border: 2px solid;
    border-color: beige;
    cursor: pointer;

    .rangeslider__handle-label {
      position: absolute;
      top: ${px2rem(-30)};
      left: 50%;
      transform: translateX(-50%);
      color: blue;
      font-size: ${px2rem(18)};
      font-family: heading;
      font-weight: 900;
    }
  }
`;

export const SButtonGroup = styled(Flex)`
  button {
    padding: ${px2rem(8, 5)};
    background-color: white;
    border: 2px solid;
    border-color: blue;
    color: blue;
    cursor: pointer;

    &.active {
      background-color: blue;
      color: white;
    }

    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;

export const SCheckbox = styled(Flex)`
  display: block;
  position: relative;
  padding-left: ${px2rem(40)};
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:focus + span {
      border-color: orange;
    }

    &:checked ~ span {
      background-color: blue;
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  span {
    position: absolute;
    top: -3px;
    left: 0;
    height: ${px2rem(24)};
    width: ${px2rem(24)};
    background-color: white;
    border: 2px solid;
    border-radius: 6px;
    border-color: blue;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 6px;
      top: 0px;
      width: 8px;
      height: 16px;
      border: solid;
      border-color: white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
`;

export const SLocation = styled(Box)`
  position: relative;

  input {
    padding: ${px2rem(10, 15)};
    width: 100%;
    border: 2px solid;
    border-color: blue;
    border-radius: 4px;
    background: 0;
    outline: none;
    color: blue;

    &::placeholder {
      color: blue;
    }

    &:not(:placeholder-shown) {
      background-color: white;
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
`;

export default STextInput;
