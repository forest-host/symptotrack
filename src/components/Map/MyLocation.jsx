import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Styling
import SMyLocation from './styles';

const MyLocation = ({ position, newLocation }) => {
  const [renderMap, setMap] = useState(null);

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

    setMap(map);
  };

  useEffect(() => {
    if (position) {
      getMap();
    }
  }, [position]);

  return <SMyLocation>{renderMap}</SMyLocation>;
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
