import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { SMyLocation } from './styles';

const MyLocation = ({ position, newLocation, center }) => {
  const { Map, Marker, TileLayer } = require('react-leaflet');

  return (
    <SMyLocation>
      <Map center={position || center} zoom={position ? 12 : 7}>
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
    </SMyLocation>
  );
};

MyLocation.propTypes = {
  position: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  newLocation: PropTypes.func.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
};

MyLocation.defaultProps = {
  position: false,
  center: [52.1326, 5.2913],
};

export default MyLocation;
