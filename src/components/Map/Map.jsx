import React, { useEffect, useState } from 'react';

// Styling
import { Box } from '../styles';
import SMyLocation from './styles';

const SymptoMap = () => {
  const [renderMap, setMap] = useState(null);
  const [position, setPosition] = useState([51.505, -0.09]);

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
            }) => setPosition([lat, lng])}
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

  return (
    <Box as={SMyLocation} id="map" width={1} css={{ height: '500px' }}>
      {renderMap}
    </Box>
  );
};

export default SymptoMap;
