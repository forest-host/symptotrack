/*
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid';
import { Map, Marker, TileLayer, GridLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import PieChart from 'react-minimal-pie-chart';

// Utils
import { get } from '../../api/callers';

// Styling
import SMap from './styles';
import theme from '../../theme';

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
    const Leaflet = require('leaflet').default;
    const { DivIcon, Point } = require('leaflet');

    console.log(Leaflet.layerPointToLatLng(33, 20));

    const clusterIconCreateFunction = (cluster) => {
      const childs = cluster.getAllChildMarkers();

      const clusterData = [
        { type: 'fever', title: 'Fever', value: 0, color: theme.colors.blue },
        { type: 'dry_cough', title: 'Dry cough', value: 0, color: theme.colors.orange },
        { type: 'fatigue', title: 'Fatigue', value: 0, color: theme.colors.lightGreen },
      ];

      childs?.map(({ options: { options } }) => {
        options &&
          Object.keys(options).map((option) => {
            clusterData?.map((s) => {
              if (option === s.type) {
                s.value += options[option];
              }
            });
          });
      });

      return new DivIcon({
        html: ReactDOMServer.renderToStaticMarkup(<PieChart data={clusterData} />),
        className: 'marker-cluster-custom',
        iconSize: new Point(40, 40),
      });
    };

    const map = (
      <Map
        className="markercluster-map"
        center={[51.0, 19.0]}
        maxZoom={18}
        minZoom={2}
        zoom={4}
        animate
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

        <MarkerClusterGroup
          iconCreateFunction={clusterIconCreateFunction}
          spiderfyOnMaxZoom={false}
          singleMarkerMode
        >
          {testData?.tiles?.map(({ key, ...props }) => {
            const split = key.split('/');
            const latLng = [split[2], split[1]];

            return <Marker key={uuid()} position={latLng} options={props} />;
          })}
        </MarkerClusterGroup>
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
*/
