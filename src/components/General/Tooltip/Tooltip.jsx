import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../../Icon';

// Styling
import STooltip from './styles';
import { Box, Button, Text, Heading } from '../../styles';

const Tooltip = ({ question, answer }) => {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <STooltip mb={24}>
      <Text as="span" color="blue" onClick={() => setOpen(!open)}>
        {question}
      </Text>
      {open && (
        <Box bg="lightGreen" px={15} py={30} ref={wrapperRef}>
          <Button noStyle onClick={() => setOpen(false)}>
            <Icon icon="CLOSE" viewBox="0 0 352 512" color="black" size={15} />
          </Button>
          <Heading.H4 mb={15}>{question}</Heading.H4>
          <Text as="p" m={0} fontSize={16}>
            {answer}
          </Text>
        </Box>
      )}
    </STooltip>
  );
};

Tooltip.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Tooltip;
