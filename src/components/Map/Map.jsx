import React, { useEffect, useState } from 'react';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';

const SymptoMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapBounds, setMapBounds] = useState({
    zoom: 6,
    top: 53.855,
    left: 3.086,
    bottom: 50.584,
    right: 7.549,
  });
  const [data, setData] = useState(null);

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
      setData(resp);
    });
  };

  useEffect(() => {
    // initialize map
    const getMap = require('./leaflet').default;
    const map = getMap(setMapBounds, data);

    setMapInstance(map);
    getData(mapBounds);
  }, []);

  useEffect(() => {
    const { renderCharts } = require('./leaflet');

    if (mapInstance) {
      renderCharts(mapInstance, data, true);
    }
  }, [mapInstance]);

  useEffect(() => {
    const { renderCharts } = require('./leaflet');

    if (mapInstance) {
      getData(mapBounds);
      renderCharts(mapInstance, data);
    }
  }, [mapBounds]);

  return <SMap width={1} id="map" />;
};

export default SymptoMap;
