import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
import FaqItem from './FaqItem';

// Styling
import SFaqSection from './styles';
import { Box, Heading } from '../styles';

const FaqSection = ({ title, items }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <Box mb={70}>
      {title && <Heading.H3>{title}</Heading.H3>}
      <Box mt={24}>
        <SFaqSection>
          {items?.map((item, i) => (
            <FaqItem
              key={uuid()}
              isOpen={activeItem === i}
              setOpen={() => setActiveItem(activeItem !== i ? i : null)}
              isLast={i + 1 === items.length}
              {...item}
            />
          ))}
        </SFaqSection>
      </Box>
    </Box>
  );
};

FaqSection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FaqSection.defaultProps = {
  title: '',
};

export default FaqSection;
