import React, { useEffect } from 'react';

// Styling
import { Box } from '../styles';

const SymptoMap = () => {
  useEffect(() => {
    const Map = require('ol/Map').default;
    const View = require('ol/View').default;
    const VectorLayer = require('ol/layer/Vector').default;
    const VectorSource = require('ol/source/Vector').default;
    const GeoJSON = require('ol/format/GeoJSON').default;
    const Control = require('ol/control');
    const Style = require('ol/style');

    const countryStyle = new Style.Style({
      fill: new Style.Fill({
        color: [255, 255, 255, 1],
      }),
      stroke: new Style.Stroke({
        color: [0, 0, 0, 0.5],
        width: 1,
        lineCap: 'round',
      }),
    });

    const countries = new VectorLayer({
      source: new VectorSource({
        url: '/static/data/countries.geojson',
        format: new GeoJSON(),
      }),
      style: countryStyle,
    });

    const map = new Map({
      target: 'map',
      layers: [countries],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      controls: [new Control.Zoom()],
    });
  }, []);

  return <Box id="map" width={1} css={{ height: '370px' }} />;
};

export default SymptoMap;
