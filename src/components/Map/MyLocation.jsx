import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

// Styling
import SMyLocation from './styles';

const MyLocation = ({ id, position, newLocation }) => {
  const getMap = async () => {
    const { Map, Marker, TileLayer } = require('react-leaflet');

    const map = (
      <Map center={position} zoom={12}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <Marker
            position={position}
            onDragend={({
              target: {
                _latlng: { lat, lng },
              },
            }) => newLocation([lat, lng])}
            draggable
          />
        )}
      </Map>
    );

    render(map, document.getElementById(id));
  };

  useEffect(() => {
    if (position) {
      getMap();
    }
  }, []);

  return <SMyLocation id={id} />;
};

MyLocation.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  newLocation: PropTypes.func.isRequired,
};

MyLocation.defaultProps = {
  position: false,
};

export default MyLocation;
