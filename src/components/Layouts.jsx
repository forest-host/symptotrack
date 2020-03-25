import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Content from './Layouts/Content';
import Partners from './Layouts/Partners';
import Card from './Layouts/Card';

const Layouts = ({ layouts }) => (
  <>
    {Array.isArray(layouts) &&
      layouts?.map((layout) => {
        switch (layout.name) {
          case 'content':
            return <Content key={uuid()} {...layout.layout} />;
          case 'partners':
            return <Partners key={uuid()} {...layout.layout} />;
          case 'card':
            return <Card key={uuid()} {...layout.layout} />;
          default:
            console.warn('missing layout for', layout.name);
            return null;
        }
      })}
  </>
);

Layouts.propTypes = {
  layouts: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Layouts;
