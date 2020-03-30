import React, { useEffect, useState } from 'react';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';

const SymptoMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapBounds, setMapBounds] = useState({
    zoom: 7,
    top: 54.4,
    left: -1.22,
    bottom: 51,
    right: 14.6,
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
      renderCharts(mapInstance, data);
    }
  }, [mapInstance]);

  const charts = async (instance) => {
    const { renderCharts } = require('./leaflet');

    await renderCharts(instance, data);
  };

  useEffect(() => {
    if (mapInstance) {
      getData(mapBounds);
      charts(mapInstance);
    }
  }, [mapBounds]);

  return <SMap width={1} id="map" />;
};

export default SymptoMap;
