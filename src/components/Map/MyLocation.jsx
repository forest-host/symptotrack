import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { SMyLocation } from './styles';

const MyLocation = ({ position, newLocation, center }) => {
  const { Map, Marker, TileLayer } = require('react-leaflet');

  return (
    <SMyLocation>
      <Map center={position || center} zoom={position ? 12 : 7}>
        <TileLayer url="https://api.mapbox.com/styles/v1/gohike/ck8ewra7t0pmm1ippdeojwhs9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ29oaWtlIiwiYSI6ImNrOGV3bWhvbDAxMTczbW15c2w0c3BoZTMifQ.oNy4IXkFUIEvHtLxM8dV-w" />
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
