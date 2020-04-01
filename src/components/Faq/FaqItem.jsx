import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../utils';

// Components
import Icon from '../Icon';

// Styling
import { SFaqItem } from './styles';
import { Box, Button, Flex, Heading, Text } from '../styles';

const FaqItem = ({ question, answer, isOpen, setOpen, isLast }) => (
  <SFaqItem isLast={isLast} p={15}>
    <Button noStyle onClick={setOpen} css={{ width: '100%' }}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box pr={10}>{question && <Heading.H4>{question}</Heading.H4>}</Box>
        <Box>
          <Icon icon={isOpen ? 'MINUS' : 'PLUS'} viewBox="0 0 512 512" size={16} color="blue" />
        </Box>
      </Flex>
    </Button>
    {isOpen && answer && (
      <Box pr={30}>
        <Text as="p" fontSize={16}>
          {formatTags(answer)}
        </Text>
      </Box>
    )}
  </SFaqItem>
);

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
};

FaqItem.defaultProps = {
  isOpen: false,
  isLast: false,
};

export default FaqItem;
