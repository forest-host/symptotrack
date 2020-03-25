import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Content from './Layouts/Content';
import Partners from './Layouts/Partners';

const Layouts = ({ layouts }) => (
  <>
    {layouts?.map((layout) => {
      switch (layout.name) {
        case 'content':
          return <Content key={uuid()} {...layout.layout} />;
        case 'partners':
          return <Partners key={uuid()} {...layout.layout} />;
        default:
          console.warn('missing layout for', layout.name);
          return null;
      }
    })}
  </>
);

Layouts.propTypes = {
  layouts: PropTypes.array.isRequired,
};

export default Layouts;
