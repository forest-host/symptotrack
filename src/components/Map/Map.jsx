import React, { useEffect, useState } from 'react';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';

const testData = {
  hits: 100,
  tiles: [
    {
      key: '6/33/21',
      hits: 33,
      fever: 16,
      dry_cough: 12,
      fatigue: 13,
      recovered: 0,
    },
    {
      key: '6/32/21',
      hits: 32,
      fever: 14,
      dry_cough: 16,
      fatigue: 15,
      recovered: 0,
    },
    {
      key: '6/32/20',
      hits: 22,
      fever: 10,
      dry_cough: 9,
      fatigue: 12,
      recovered: 0,
    },
    {
      key: '6/33/20',
      hits: 13,
      fever: 6,
      dry_cough: 8,
      fatigue: 8,
      recovered: 0,
    },
  ],
};

const SymptoMap = () => {
  const [renderMap, setMap] = useState(null);

  const getData = async () => {
    await get('data/tiles').then((resp) => {
      console.log(resp);
    });
  };

  const getMap = async () => {
    const { Map, Marker, TileLayer } = require('react-leaflet');

    const tiles = [];

    testData?.tiles?.map(({ key }) => {
      tiles.push(key);
    });

    const map = (
      <Map center={[52.1326, 5.2913]} zoom={7}>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

        {tiles?.map((tile) => (
          <TileLayer
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/${tile}.png`}
            opacity={0}
          >
            <Marker />
          </TileLayer>
        ))}
      </Map>
    );

    setMap(map);
  };

  useEffect(() => {
    // getData();
    getMap();
  }, []);

  return <SMap width={1}>{renderMap}</SMap>;
};

export default SymptoMap;
