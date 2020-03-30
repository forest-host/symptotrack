import React, { useEffect, useState } from 'react';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';

const SymptoMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [gridLayer, setGridLayer] = useState(null);
  const [mapBounds, setMapBounds] = useState({
    zoom: 8,
    top: 54.4,
    left: -1.22,
    bottom: 51,
    right: 14.6,
  });

  const getData = async ({ zoom, top, right, bottom, left }) => {
    await get('data/tiles', {
      params: {
        z: zoom,
        top,
        right,
        bottom,
        left,
      },
    }).then((resp) => {
      const { renderCharts } = require('./leaflet');
      renderCharts(mapInstance, resp, gridLayer);
    });
  };

  useEffect(() => {
    // initialize map
    const getMap = require('./leaflet').default;
    const map = getMap(setMapBounds, setGridLayer);

    setMapInstance(map);
  }, []);

  useEffect(() => {
    if (mapInstance) {
      getData(mapBounds);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (mapInstance) {
      getData(mapBounds);
    }
  }, [mapBounds]);

  return <SMap width={1} id="map" />;
};

export default SymptoMap;
