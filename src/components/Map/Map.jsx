import React, { useEffect, useState } from 'react';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';

const SymptoMap = () => {
  const [renderMap, setMap] = useState(null);

  const getData = async () => {
    await get('data/tiles').then((resp) => {
      console.log(resp);
    });
  };

  const getMap = async () => {
    const { Map, Marker, TileLayer } = require('react-leaflet');

    const map = (
      <Map center={[52.1326, 5.2913]} zoom={7}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
    );

    setMap(map);
  };

  useEffect(() => {
    getData();
    getMap();
  }, []);

  return <SMap width={1}>{renderMap}</SMap>;
};

export default SymptoMap;
