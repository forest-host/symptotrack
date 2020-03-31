import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid';

// Utils
import { get } from '../../api/callers';

// Components
import MarkerIcon from './MarkerIcon';

// Styling
import SMap from './styles';

const SymptoMap = () => {
  // Leaflet
  const L = require('leaflet');
  const { Map, Marker, TileLayer } = require('react-leaflet');

  const mapRef = useRef(null);
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
    getData({
      zoom: 8,
      top: 54.4,
      left: -1.22,
      bottom: 51,
      right: 14.6,
    });
  }, []);

  const onViewportChanged = ({ zoom = 8 }) => {
    const { _southWest, _northEast } = mapRef?.current?.leafletElement.getBounds();

    getData({
      zoom,
      top: _northEast?.lat,
      right: _northEast?.lng,
      bottom: _southWest?.lat,
      left: _southWest?.lng,
    });
  };

  const createIcon = (details) =>
    L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<MarkerIcon {...details} />),
    });

  return (
    <SMap width={1}>
      <Map
        center={[52.2, 5.8]}
        maxZoom={18}
        minZoom={2}
        zoom={8}
        ref={mapRef}
        onViewportChanged={(e) => onViewportChanged(e)}
      >
        <TileLayer url="https://api.mapbox.com/styles/v1/gohike/ck8ewra7t0pmm1ippdeojwhs9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ29oaWtlIiwiYSI6ImNrOGV3bWhvbDAxMTczbW15c2w0c3BoZTMifQ.oNy4IXkFUIEvHtLxM8dV-w" />

        {data?.spots?.map(({ location, ...spot }) => (
          <Marker key={uuid()} position={[location.lat, location.lon]} icon={createIcon(spot)} />
        ))}
      </Map>
    </SMap>
  );
};

export default SymptoMap;
