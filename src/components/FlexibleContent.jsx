import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import LatestPosts from './FlexibleContent/LatestPosts';

const FlexibleContent = ({ layouts, type }) => (
  <>
    {layouts?.map((layout) => {
      switch (layout.__typename) {
        case `${type}_Flexcontent_Flexiblecontent_Latestlayout`:
          return <LatestPosts key={uuid()} />;

        default:
          console.warn('missing layout for', layout.__typename);
          return null;
      }
    })}
  </>
);

FlexibleContent.propTypes = {
  layouts: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FlexibleContent;
